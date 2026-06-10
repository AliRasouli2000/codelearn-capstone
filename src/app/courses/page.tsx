"use client";

import { useEffect, useState } from 'react';
import CourseCard from '@/components/courses/CourseCard';
import styles from './page.module.css';
import axios from 'axios';

type Course = {
  courseId: string;
  title: string;
  description: string;
  coursePageName: string;
};

const getCourses = async (): Promise<Course[]> => {
  try {
    const response = await axios.get('/api/courses');
    return Array.isArray(response.data?.courses) ? response.data.courses : [];
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error(message);
    return [];
  }
};

export default function CoursesPage() {
  const [courseList, setCourseList] = useState<Course[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getCourses();
        setCourseList(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCourses();
  }, []);


  return (
    <div className={styles['courses-page']}>
      <section className={styles['courses-hero']}>
        <div className={styles['courses-hero-content']}>
          <h1>Our Courses</h1>
          <p>
            Learn HTML, CSS, and JavaScript step-by-step with short lessons,
            mini projects, and games to keep you motivated.
          </p>
        </div>
      </section>

      <section className={styles['courses-section']}>
        <div className={styles['courses-section-header']}>
          <h2>Choose Your Learning Path</h2>
          <p>
            Start from the basics and move toward building interactive,
            professional-looking web pages.
          </p>
        </div>

        <div className={styles['courses-grid']}>
          {courseList.map((course) => (
            <CourseCard
              key={course.courseId}
              path={course.coursePageName}
              title={course.title}
              description={course.description}
              className={styles['course-card']}
              descriptionClassName={styles['course-description']}
              buttonClassName={styles['course-btn']}
            />
          ))}
        </div>
      </section>

      <footer className={styles['page-footer']}>
        <p>© 2025 CodeLearn. All rights reserved.</p>
      </footer>
    </div>
  );
}
