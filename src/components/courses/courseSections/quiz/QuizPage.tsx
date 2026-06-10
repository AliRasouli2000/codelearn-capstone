"use client";

import { Question } from './Question'
import { useContext, useState } from 'react'
import './QuizPage.css'
import ProgressContext from '@/contexts/ProgressContext'
import axios from 'axios'

type QuizQuestion = {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correct: string;
};

type CourseData = {
  id: string;
  quiz: {
    questions: QuizQuestion[];
  };
};

export const QuizPage = ({ courseData }: { courseData: CourseData }) => {
  const [questionNum, setQuestionNum] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const {userData, setUserData} = useContext(ProgressContext)

  const saveQuizScore = async () => {
    let field: 'html' | 'css' | 'js' | null = null;

    if (courseData.id === "html") {
      field = 'html';
      setUserData((prev) => ({ ...prev, htmlQuizScore: `${correctAnswers}` }))
    }
    
    if (courseData.id === "css") {
      field = 'css';
      setUserData((prev) => ({ ...prev, cssQuizScore: `${correctAnswers}` }))
    }

    if (courseData.id === "javascript") {
      field = 'js';
      setUserData((prev) => ({ ...prev, JSQuizScore: `${correctAnswers}` }))
    }

    if (!field) return;

    try {
      await axios.post('/api/users/quizscore', {
        field,
        score: correctAnswers,
      }, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const questions = courseData.quiz.questions

  const increaseCorrects = () => {
    setCorrectAnswers(num => num + 1)
  }

  const decreaseCorrects = () => {
    setCorrectAnswers(num => num - 1)
  }

  const handleNextClick = async () => {
    if (questionNum < questions.length - 1) {
      setQuestionNum( num => num + 1)
    }
    else if (questionNum === questions.length - 1) {
      setSubmitted(true)
      setIsDisabled(true)
      await saveQuizScore()
    }
    if (submitted && questionNum === questions.length - 2) {
      setIsDisabled(true)
    }
  }

  const handlePrevClick = () => {
    if (questionNum > 0) {
    setQuestionNum(num => num - 1)
    }
    if (questionNum < questions.length) {
      setIsDisabled(false)
    }
  }

  return (
    <div className="quiz-page-container">
      <div className="quiz-content">
        <div className="quiz-instructions">
          <p>Answer the following questions to test your knowledge. You can move to the next question once you have answered the current question. Good luck!</p>
        </div>
        <Question 
          question={questions[questionNum].question} 
          optionA={questions[questionNum].optionA}
          optionB={questions[questionNum].optionB}
          optionC={questions[questionNum].optionC}
          optionD={questions[questionNum].optionD}
          correct={questions[questionNum].correct}
          increaseCorrects={increaseCorrects}
          decreaseCorrects={decreaseCorrects}
          questionNum={questionNum}
        />
        <div className="quiz-navigation">
          <button 
            className="quiz-button quiz-button-prev"
            onClick={handlePrevClick}
            disabled={questionNum === 0}
          >
            Previous Question
          </button>
          <div className="quiz-progress">
            Question {questionNum + 1} of {questions.length}
          </div>
          <button 
            className="quiz-button quiz-button-next"
            onClick={handleNextClick}
            disabled={isDisabled}
          >
            {(!submitted && questionNum) === questions.length - 1 ? "Submit" : "Next Question"}
          </button>
        </div>
        {submitted && (
          <div className="quiz-congratulations">
            <p>Congratulations! You answered {correctAnswers} out of {questions.length} questions correctly!</p>
          </div>
        )}
      </div>
    </div>
  )
}
