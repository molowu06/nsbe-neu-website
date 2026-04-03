const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
const BASE_URL = "https://www.googleapis.com/drive/v3/files";

export interface DriveFolder {
  id: string;
  name: string;
}

export interface DriveFile {
  id: string;
  name: string;
}

// Fetch subfolders of a parent Drive folder
export async function fetchFolders(parentId: string): Promise<DriveFolder[]> {
  try {
    const res = await fetch(
      `${BASE_URL}?q='${parentId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}&fields=files(id,name)&orderBy=name`
    );

    if (!res.ok) {
      console.error(`fetchFolders error: ${res.status} ${res.statusText}`, await res.text());
      return [];
    }

    const data = await res.json();
    return data.files || [];
  } catch (error) {
    console.error("fetchFolders error:", error);
    return [];
  }
}

// Fetch photos (images) from a Drive folder
export async function fetchPhotos(
  folderId: string,
  limit?: number
): Promise<DriveFile[]> {
  try {
    const pageSize = limit ? `&pageSize=${limit}` : "";

    const res = await fetch(
      `${BASE_URL}?q='${folderId}'+in+parents+and+mimeType contains 'image/'&key=${API_KEY}&fields=files(id,name)&orderBy=createdTime desc${pageSize}`
    );

    if (!res.ok) {
      console.error(`fetchPhotos error: ${res.status} ${res.statusText}`, await res.text());
      return [];
    }

    const data = await res.json();
    return data.files || [];
  } catch (error) {
    console.error("fetchPhotos error:", error);
    return [];
  }
}

export function getDriveImageUrl(fileId: string): string {
  return `/api/drive-image?id=${encodeURIComponent(fileId)}`;
}

export function getDriveDownloadUrl(fileId: string): string {
  return `/api/drive-image?id=${encodeURIComponent(fileId)}&download=1`;
}
