"use client";

import { useContext } from "react";
import ProgressContext from "../../contexts/ProgressContext";
import styles from "./page.module.css";

const ProgressPage = () => {
  const { userData } = useContext(ProgressContext)
  const { username } = userData
  
  const QUIZ_TOTAL = 10;
  
  const getScoreDisplay = (score: string) => {
    if (!score || score === "") {
      return "Not completed";
    }
    return `${score}/${QUIZ_TOTAL}`;
  };

  return (
    <div className={styles["progress-page-container"]}>
      <div className={styles["progress-content"]}>
        <h1 className={styles["progress-title"]}>Welcome {username}! Your Quiz Score are here</h1>
        
        <div className={styles["scores-grid"]}>
          <div className={styles["score-card"]}>
            <div className={styles["score-course"]}>HTML</div>
            <div className={`${styles["score-value"]} ${!userData.htmlQuizScore || userData.htmlQuizScore === "" ? styles["not-completed"] : ""}`.trim()}>
              {getScoreDisplay(userData.htmlQuizScore)}
            </div>
          </div>
          
          <div className={styles["score-card"]}>
            <div className={styles["score-course"]}>CSS</div>
            <div className={`${styles["score-value"]} ${!userData.cssQuizScore || userData.cssQuizScore === "" ? styles["not-completed"] : ""}`.trim()}>
              {getScoreDisplay(userData.cssQuizScore)}
            </div>
          </div>
          
          <div className={styles["score-card"]}>
            <div className={styles["score-course"]}>JavaScript</div>
            <div className={`${styles["score-value"]} ${!userData.JSQuizScore || userData.JSQuizScore === "" ? styles["not-completed"] : ""}`.trim()}>
              {getScoreDisplay(userData.JSQuizScore)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressPage;
