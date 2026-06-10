import { EachCoursePage } from '@/components/courses/EachCoursePage';
import { courses } from '../../../data/coursesSeed';
import { notFound } from 'next/navigation';

type CoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;

  const selectedCourse = courses.find(
    (course) =>
      course.courseId === courseId ||
      course.coursePageName === courseId
  );

  if (!selectedCourse) {
    notFound();
  }

  const normalizedCourseData = {
    id: selectedCourse.courseId,
    hero: {
      title: selectedCourse.heroTitle,
      subtitle: selectedCourse.heroSubtitle,
    },
    intro: selectedCourse.intro,
    video: selectedCourse.video,
    flashcards: selectedCourse.flashcards,
    quiz: {
      questions: selectedCourse.quizQuestions,
    },
  };

  return <EachCoursePage courseData={normalizedCourseData} />;
}