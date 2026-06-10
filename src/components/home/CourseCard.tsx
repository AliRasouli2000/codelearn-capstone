 'use client';

import './HomePage.css';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import ProgressContext from '@/contexts/ProgressContext';

type CourseCardProps = {
  path: string;
  title: string;
  description: string;
};

const CourseCard = ({ path, title, description }: CourseCardProps) => {

  const { userData } = useContext(ProgressContext);
  const { loggedIn } = userData;
  const router = useRouter();

  const handleClick = () => {
    router.push(loggedIn ? `/courses/${path}` : '/login');
  };

  return (
    <div className="course-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={handleClick}>Start Course</button>
    </div>
  );
};

export default CourseCard;
