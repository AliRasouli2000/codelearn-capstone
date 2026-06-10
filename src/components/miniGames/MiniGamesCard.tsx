import Link from 'next/link';

type MiniGamesCardProps = {
  id: string | number;
  title: string;
  description: string;
  route: string;
  cardClassName?: string;
  buttonClassName?: string;
};

const MiniGamesCard = ({
  id,
  title,
  description,
  route,
  cardClassName = 'minigames-card',
  buttonClassName = 'minigames-play-button',
}: MiniGamesCardProps) => {
  return (
    <div className={cardClassName} data-game-id={id}>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link href={route} className={buttonClassName}>
        Play
      </Link>
    </div>
  );
};

export default MiniGamesCard;