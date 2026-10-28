import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { RESOURCE_IMAGES } from "./resourceImages";
import styles from "./ResourceGrid.module.css";

// Gooey filter used by the "Read guide" button. Rendered once, outside the grid.
const GooFilter = () => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
    <defs>
      <filter id="blob-goo">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
          result="goo"
        />
        <feBlend in2="goo" in="SourceGraphic" result="mix" />
      </filter>
    </defs>
  </svg>
);

// Only the fields the grid needs, so any Article from your RESOURCES array fits.
type GridArticle = {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  summary: string;
  keyTakeaways?: string[];
};

// Columns each card spans on a 6-column grid: 3 per row, and the last row
// stretches to fill the full width (5 cards -> 3 + 2, 4 -> 2 + 2, 1 -> full).
function spanFor(i: number, n: number) {
  if (n === 1) return 6;
  const rem = n % 3;
  const tail = rem === 0 ? 0 : rem === 1 ? 4 : 2;
  return i >= n - tail ? 3 : 2;
}

const CtaButton = ({ hidden = false }: { hidden?: boolean }) => (
  <span className={styles.cta} aria-hidden={hidden || undefined}>
    Read guide <span aria-hidden="true">→</span>
    <span className={styles.blobInner} aria-hidden="true">
      <span className={styles.blobs}>
        <span className={styles.blob} />
        <span className={styles.blob} />
        <span className={styles.blob} />
        <span className={styles.blob} />
      </span>
    </span>
  </span>
);

export default function ResourceGrid({
  articles,
  basePath = "/resources",
}: {
  articles: GridArticle[];
  basePath?: string; // article URL = `${basePath}/${slug}`
}) {
  const n = articles.length;
  if (n === 0) return null;

  return (
    <>
      <GooFilter />
      <section className={styles.grid} aria-label="Career resources">
        {articles.map((a, i) => {
          const img = RESOURCE_IMAGES[a.slug];
          const label = `${a.category} · ${a.readingTime}`;
          return (
            <div
              key={a.slug}
              className={styles.slot}
              style={{ "--span": spanFor(i, n) } as CSSProperties}
            >
              <Link href={`${basePath}/${a.slug}`} className={styles.cube}>
                {/* front: photo, title, button */}
                <div className={`${styles.face} ${styles.front}`}>
                  <div className={styles.media}>
                    {img && (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 900px) 100vw, 40vw"
                        className={styles.photo}
                        style={{ objectPosition: img.position }}
                      />
                    )}
                    <span className={styles.tag}>{label}</span>
                  </div>
                  <h2 className={styles.title}>{a.title}</h2>
                  <CtaButton hidden />
                </div>

                {/* side: revealed when the cube turns on hover */}
                <div className={`${styles.face} ${styles.back}`}>
                  <p className={styles.meta}>{label}</p>
                  <p className={styles.desc}>{a.summary}</p>
                  {a.keyTakeaways && a.keyTakeaways.length > 0 && (
                    <>
                      <p className={styles.learnLabel}>What you&apos;ll learn</p>
                      <ul className={styles.learn}>
                        {a.keyTakeaways.slice(0, 4).map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <CtaButton />
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </>
  );
}
