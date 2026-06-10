"use client";

import styles from './page.module.css';
import MiniGamesCard from '@/components/miniGames/MiniGamesCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Game = {
  id: string;
  title: string;
  description: string;
};

const getGames = async (): Promise<Game[]> => {
  try {
    const response = await axios.get('/api/games');
    return response.data.games;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error(message);
    return [];
  }
};

const MiniGamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const isGameRoute = false;

  useEffect(() => {
    const loadGames = async () => {
      const data = await getGames();
      setGames(data);
    };

    loadGames();
  }, []);
  
  return (
    <div className={styles['minigames-page']}>
      <div className={styles['minigames-container']}>
        {!isGameRoute && (
          <>
            <div className={styles['minigames-header']}>
              <h1>Mini Games</h1>
              <p>Challenge yourself with fun and educational coding games. Improve your skills while having fun!</p>
            </div>
            <div className={styles['minigames-grid']}>
              {games.map((game) => (
                <MiniGamesCard
                  key={game.id}
                  id={game.id}
                  title={game.title}
                  description={game.description}
                  route={`/minigames/${game.id}`}
                  cardClassName={styles['minigames-card']}
                  buttonClassName={styles['minigames-play-button']}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <footer className={styles['page-footer']}>
        <p>© 2026 CodeLearn. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default MiniGamesPage
