import GameCard from './GameCard';
import './HomePage.css';

const Games = () => {
  return (
    <div>
      <section id="mini-games" className="games">
        <h2>Mini Games</h2>
        <p>Take a 2-minute break! Play short interactive games to refresh your mind.</p>
        <div className="game-grid">
          <GameCard
            path="bugfix"
            title="Bug Fix Challenge"
            description="Identify and fix bugs in code snippets by finding missing characters. Improve your debugging skills with this interactive challenge."
          />
          <GameCard
            path="typingspeed"
            title="Typing Speed Test"
            description="Test and improve your typing speed and accuracy. Practice coding-related text to enhance your programming efficiency."
          />
        </div>
      </section>
    </div>
  );
};

export default Games;
