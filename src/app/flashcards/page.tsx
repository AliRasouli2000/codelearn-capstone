"use client";

import FlashCardSection, { type Flashcard } from '@/components/flashcards/FlashcardSection';
import styles from './page.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const getFlashcards = async (): Promise<Flashcard[]> => {
  try {
    const response = await axios.get('/api/flashcards');
    return Array.isArray(response.data?.flashcards) ? response.data.flashcards : [];
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error(message);
    return [];
  }
};

const FlashCardsPage = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        const data = await getFlashcards();
        setFlashcards(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadFlashcards();
  }, []);

  return (
    <div className={styles['flashcards-section']}>
      <FlashCardSection flashcards={flashcards}/>
      <footer className={styles['page-footer']}>
        <p>© 2026 CodeLearn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FlashCardsPage;
