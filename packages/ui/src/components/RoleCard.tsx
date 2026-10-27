"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./OpenRoles.module.css";

export interface RoleCardProps {
  /** Card heading – e.g. "Entry Level" */
  title: string;
  /** One-sentence description shown below the title */
  description: string;
  /** Number of open positions */
  count: number;
  /** Photo path relative to /public – e.g. "/images/roles/photos/entry-level.png" */
  imageSrc: string;
  /** Alt text for the photo */
  imageAlt: string;
  /** Where the card links to */
  href: string;
}

export function RoleCard({
  title,
  description,
  count,
  imageSrc,
  imageAlt,
  href,
}: RoleCardProps) {
  return (
    <Link href={href} className={styles.card} aria-label={`${title} – ${count} open ${count === 1 ? "role" : "roles"}`}>
      {/* Photo with tilt effect */}
      <div className={styles.imageWrap} aria-hidden="true">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={640}
          height={360}
          className={styles.photo}
          priority
        />
      </div>

      {/* Text body */}
      <div className={styles.body}>
        <span className={styles.badge}>
          {/* dot */}
          <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
            <circle cx="3" cy="3" r="3" fill="currentColor" />
          </svg>
          {count} open {count === 1 ? "role" : "roles"}
        </span>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>

        <span className={styles.btn}>
          View roles
          <svg
            className={styles.arrow}
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 6.5h9M8 3.5l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
