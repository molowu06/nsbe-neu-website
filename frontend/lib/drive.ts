const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
const BASE_URL = "https://www.googleapis.com/drive/v3/files";

export interface DriveFolder {
  id: string;
  name: string;
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
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
      `${BASE_URL}?q='${folderId}'+in+parents+and+mimeType contains 'image/'&key=${API_KEY}&fields=files(id,name,mimeType)&orderBy=createdTime desc${pageSize}`
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

// Fetch all media (images + videos) from a Drive folder
async function fetchMedia(
  folderId: string,
  limit?: number
): Promise<DriveFile[]> {
  try {
    const pageSize = limit ? `&pageSize=${limit}` : "";

    const res = await fetch(
      `${BASE_URL}?q='${folderId}'+in+parents+and+(mimeType contains 'image/' or mimeType contains 'video/')&key=${API_KEY}&fields=files(id,name,mimeType)&orderBy=createdTime desc${pageSize}`
    );

    if (!res.ok) {
      console.error(`fetchMedia error: ${res.status} ${res.statusText}`, await res.text());
      return [];
    }

    const data = await res.json();
    return data.files || [];
  } catch (error) {
    console.error("fetchMedia error:", error);
    return [];
  }
}

// Recursively fetch all media from a folder and its subfolders
export async function fetchMediaRecursive(
  folderId: string,
  limit?: number
): Promise<DriveFile[]> {
  const [media, subfolders] = await Promise.all([
    fetchMedia(folderId, limit),
    fetchFolders(folderId),
  ]);

  if (subfolders.length === 0) return media;

  const nestedMedia = await Promise.all(
    subfolders.map((folder) => fetchMediaRecursive(folder.id, limit))
  );

  const all = [...media, ...nestedMedia.flat()];
  return limit ? all.slice(0, limit) : all;
}

export function getDriveImageUrl(fileId: string): string {
  return `/api/drive-image?id=${encodeURIComponent(fileId)}`;
}

export function getDriveDownloadUrl(fileId: string): string {
  return `/api/drive-image?id=${encodeURIComponent(fileId)}&download=1`;
}