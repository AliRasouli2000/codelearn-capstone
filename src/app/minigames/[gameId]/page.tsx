import { notFound } from 'next/navigation';
import BugFix from '@/components/miniGames/BugFix';
import TypingSpeed from '@/components/miniGames/TypingSpeed';

type MiniGamePageProps = {
  params: Promise<{
    gameId: string;
  }>;
};

export default async function MiniGamePage({ params }: MiniGamePageProps) {
  const { gameId } = await params;
  const normalizedId = gameId.toLowerCase();

  if (normalizedId === 'bugfix') {
    return <BugFix />;
  }

  if (normalizedId === 'typingspeed') {
    return <TypingSpeed />;
  }

  notFound();
}
