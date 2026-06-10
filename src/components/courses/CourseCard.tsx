'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import ProgressContext from '@/contexts/ProgressContext';

type CourseCardProps = {
  path: string;
  title: string;
  description: string;
  className?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
};

const CourseCard = ({
  path,
  title,
  description,
  className,
  descriptionClassName,
  buttonClassName,
}: CourseCardProps) => {
  const { userData } = useContext(ProgressContext);
  const { loggedIn } = userData;
  const router = useRouter();

  const handleClick = () => {
    router.push(loggedIn ? `/courses/${path}` : '/login');
  };

  return (
    <div className={className}>
      <h3>{title}</h3>
      <p className={descriptionClassName}>{description}</p>
      <button className={buttonClassName} onClick={handleClick}>Start Course</button>
    </div>
  );
};

export default CourseCard;
