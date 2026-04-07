import { NextRequest } from "next/server";
import heicConvert from "heic-convert";

const DRIVE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
const DRIVE_BASE_URL = "https://www.googleapis.com/drive/v3/files";

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/["\\]/g, "_");
}

async function fetchFileMetadata(fileId: string) {
  const response = await fetch(
    `${DRIVE_BASE_URL}/${fileId}?key=${DRIVE_API_KEY}&fields=id,name,mimeType`
  );

  if (!response.ok) {
    throw new Error(`Drive metadata request failed: ${response.status}`);
  }

  return response.json() as Promise<{
    id: string;
    name: string;
    mimeType: string;
  }>;
}

async function fetchFileBytes(fileId: string) {
  const response = await fetch(
    `${DRIVE_BASE_URL}/${fileId}?alt=media&key=${DRIVE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Drive media request failed: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();

  return {
    buffer: Buffer.from(arrayBuffer),
    contentType: response.headers.get("content-type") || "application/octet-stream",
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get("id");
    const download = searchParams.get("download") === "1";

    if (!fileId) {
      return Response.json({ error: "Missing file id" }, { status: 400 });
    }

    if (!DRIVE_API_KEY) {
      return Response.json({ error: "Missing Drive API key" }, { status: 500 });
    }

    const metadata = await fetchFileMetadata(fileId);
    const { buffer, contentType } = await fetchFileBytes(fileId);
    const safeName = sanitizeFileName(metadata.name || fileId);
    const isHeic =
      metadata.mimeType.includes("heic") ||
      metadata.mimeType.includes("heif") ||
      /\.(heic|heif)$/i.test(metadata.name || "");

    if (download) {
      return new Response(buffer, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${safeName}"`,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (isHeic) {
      const jpegBuffer = await heicConvert({
        buffer,
        format: "JPEG",
        quality: 0.85,
      });

      return new Response(Buffer.from(jpegBuffer), {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("drive-image route error:", error);
    return Response.json(
      { error: "Failed to load image" },
      { status: 500 }
    );
  }
}