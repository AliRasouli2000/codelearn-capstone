"use client";

import { useState } from 'react';
import styles from './FlashcardCard.module.css';

const FlashCardCard = ({ front, back }: { front: string; back: string }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`${styles.flashcardCard} ${flipped ? styles.isFlipped : ''}`}
      onClick={() => setFlipped((prev) => !prev)}
      data-testid="flashcards-card"
    >
      <div className={styles.flashcardInner}>
        <div className={`${styles.flashcardFace} ${styles.flashcardFront}`}>
          {front}
        </div>
        <div className={`${styles.flashcardFace} ${styles.flashcardBack}`}>
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlashCardCard;
