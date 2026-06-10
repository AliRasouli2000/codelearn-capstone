import FlashCardCard from './FlashcardCard';
import styles from './FlashcardSection.module.css';

export type Flashcard = {
  front: string;
  back: string;
};

const FlashCardSection = ({ flashcards }: { flashcards: Flashcard[] }) => {
  return (
    <div className={styles.flashcardsGrid}>
      {flashcards.map((card: Flashcard) => (
        <FlashCardCard key={card.front} front={card.front} back={card.back} />
      ))}
    </div>
  );
};

export default FlashCardSection;
