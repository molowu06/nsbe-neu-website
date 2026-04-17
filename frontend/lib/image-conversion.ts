import heic2any from "heic2any";

/**
 * Converts a HEIC image blob to a JPG blob URL.
 * If conversion fails, this will throw.
 */
export async function convertHeicToJpgUrl(fileUrl: string): Promise<string> {
  // Fetch raw file
  const res = await fetch(fileUrl);
  const blob = await res.blob();

  // Use heic2any to convert
  const convertedBlob = await heic2any({
    blob,
    toType: "image/jpeg",
    quality: 0.85,
  });

  return URL.createObjectURL(convertedBlob as Blob);
}