"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import styles from "../../../../styles/archive.module.css";
import {
  fetchPhotos,
  getDriveImageUrl,
  getDriveDownloadUrl,
} from "@/lib/drive";

interface Photo {
  id: string;
  name: string;
}

export default function AlbumPage() {
  const params = useParams<{ id: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPhotos() {
      if (!params?.id) return;

      const data = await fetchPhotos(params.id);
      setPhotos(data);
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
        {photos.map((photo) => (
          <div key={photo.id}>
            <img
              src={getDriveImageUrl(photo.id)}
              alt={photo.name}
              className={styles.albumCardImage}
              loading="lazy"
              decoding="async"
            />
            <a
              className={styles.downloadLink}
              href={getDriveDownloadUrl(photo.id)}
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