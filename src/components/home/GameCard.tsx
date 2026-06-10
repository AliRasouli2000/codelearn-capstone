'use client';

import './HomePage.css';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import ProgressContext from '@/contexts/ProgressContext';

type GameCardProps = {
  path: string;
  title: string;
  description: string;
};

const GameCard = ({ path, title, description }: GameCardProps) => {

  const { userData } = useContext(ProgressContext);
  const { loggedIn } = userData;
  const router = useRouter();

  const handleClick = () => {
    router.push(loggedIn ? `/minigames/${path}` : '/login');
  };

  return (
    <div className="game-card">
      <h4>{title}</h4>
      <p>{description}</p>
      <button onClick={handleClick}>Play Now</button>
    </div>
  );
};

export default GameCard;
