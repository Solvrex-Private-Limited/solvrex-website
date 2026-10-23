import styles from "./BubbleBackground.module.css";

const BUBBLE_COUNT = 16;

export default function BubbleBackground() {
  return (
    <div className={styles.container} aria-hidden="true">
      {Array.from({ length: BUBBLE_COUNT }, (_, i) => (
        <div key={i} className={styles.bubble} />
      ))}
    </div>
  );
}
