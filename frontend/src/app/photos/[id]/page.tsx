"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import styles from "../../../../styles/archive.module.css";
import {
  fetchMediaRecursive,
  getDriveImageUrl,
  getDriveDownloadUrl,
} from "@/lib/drive";

interface MediaItem {
  id: string;
  name: string;
  mimeType?: string;
}

export default function AlbumPage() {
  const params = useParams<{ id: string }>();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPhotos() {
      if (!params?.id) return;

      const data = await fetchMediaRecursive(params.id);
      setMedia(data);
      setLoading(false);
    }

    loadPhotos();
  }, [params?.id]);

  if (loading) {
    return <p className={styles.loadingWrapper}>Loading photos...</p>;
  }

  return (
    <main className={styles.albumPage}>
      <div className={styles.albumHeader}>
        <Link href="/archive" className={styles.backButton}>
          <FiArrowLeft /> Back to Archive
        </Link>
      </div>

      <div className={styles.albumGrid}>
        {media.map((item) => (
          <div key={item.id}>
            {(item.mimeType || "").startsWith("video/") ? (
              <video
                src={getDriveImageUrl(item.id)}
                className={styles.albumCardImage}
                controls
                preload="metadata"
              />
            ) : (
              <img
                src={getDriveImageUrl(item.id)}
                alt={item.name}
                className={styles.albumCardImage}
                loading="lazy"
                decoding="async"
              />
            )}
            <a
              className={styles.downloadLink}
              href={getDriveDownloadUrl(item.id)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}