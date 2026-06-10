'use client';

import { flashcards } from '@/data/flashcardsSeed';
import FlashCardCard from '@/components/flashcards/FlashcardCard';
import './FlashCards.css';

export const FlashCards = ({
  courseData,
}: {
  courseData: { flashcards: { startIndex: number; endIndex: number } };
}) => (
  <div className="flashcards-container">
    <div className="flashcards-grid">
      {flashcards
        .slice(courseData.flashcards.startIndex, courseData.flashcards.endIndex + 1)
        .map((card) => (
          <FlashCardCard key={card.front} front={card.front} back={card.back} />
        ))}
    </div>
  </div>
);
