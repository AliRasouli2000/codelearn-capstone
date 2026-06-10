'use client';

import './EachCoursePage.css';
import { useState } from 'react';
import { Video } from './courseSections/Video';
import { QuizPage } from './courseSections/quiz/QuizPage';
import { FlashCards } from './courseSections/Flashcards';

const pageList = ['video', 'flashcards', 'quizes'];

export const EachCoursePage = ({ courseData }) => {
  const [pageNum, setPageNum] = useState(0);
  const currentPage = pageList[pageNum] ?? pageList[0];

  const goToPage = (nextPageNum) => {
    if (nextPageNum >= 0 && nextPageNum < pageList.length) {
      setPageNum(nextPageNum);
    }
  };

  return (
    <div className="course-page">
      <section className="course-hero">
        <div className="course-hero-content">
          <h1>{courseData.hero.title}</h1>
          <p>{courseData.hero.subtitle}</p>
        </div>
      </section>

      <section className="course-content-section">
        <div className="intro-text">
          <p>{courseData.intro}</p>
        </div>

        <div className="page-navigation">
          <button
            className="nav-button prev-button"
            onClick={() => goToPage(pageNum - 1)}
            disabled={pageNum <= 0}
          >
            ← Previous Page
          </button>
          <div className="page-indicator">
            Page {pageNum + 1} of {pageList.length}
          </div>
          <button
            className="nav-button next-button"
            onClick={() => goToPage(pageNum + 1)}
            disabled={pageNum >= pageList.length - 1}
          >
            {pageNum >= pageList.length - 1 ? 'Last Page' : 'Next Page →'}
          </button>
        </div>

        <div className="course-content">
          {currentPage === 'video' && <Video courseData={courseData} />}
          {currentPage === 'quizes' && <QuizPage courseData={courseData} />}
          {currentPage === 'flashcards' && <FlashCards courseData={courseData} />}
        </div>
      </section>
    </div>
  );
};
