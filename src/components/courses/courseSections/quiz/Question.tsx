"use client";

import { useEffect, useRef, useState } from "react";

type QuestionProps = {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correct: string;
  increaseCorrects: () => void;
  decreaseCorrects: () => void;
  questionNum: number;
};

export const Question = ({question, optionA, optionB, optionC, optionD, correct, increaseCorrects, decreaseCorrects, questionNum}: QuestionProps) => {
    const [selected, setSelected] = useState("")
  const previousSelectedRef = useRef<string>("")

    // Reset selected state when question changes
    useEffect(() => {
        setSelected("")
        previousSelectedRef.current = ""
    }, [questionNum])

    // Update correct count when user selects or changes an answer
    useEffect(() => {
        const previousSelected = previousSelectedRef.current
        const previousWasCorrect = previousSelected && previousSelected === correct
        const currentIsCorrect = selected && selected === correct

        // If user had a previous selection
        if (previousSelected) {
            // If previous was correct, decrement
            if (previousWasCorrect) {
                decreaseCorrects()
            }
        }

        // If current selection is correct, increment
        if (currentIsCorrect) {
            increaseCorrects()
        }

        // Update the previous selected value
        previousSelectedRef.current = selected
    }, [selected, correct, increaseCorrects, decreaseCorrects])

  return (
    <div className="question-container">
        <form className="question-form">
            <h3>{question}</h3>
            <div className="question-options">
              <div className="option-item">
                <input 
                type="radio" 
                name="answer" 
                value="A" 
                id="optionA" 
                onChange={e => setSelected(e.target.value)}
                checked={selected === "A"}/>
                <label htmlFor="optionA">{optionA}</label>
              </div>
              <div className="option-item">
                <input 
                type="radio" 
                name="answer" 
                value="B" 
                id="optionB" 
                onChange={e=> setSelected(e.target.value)}
                checked={selected === "B"}/>
                <label htmlFor="optionB">{optionB}</label>
              </div>
              <div className="option-item">
                <input 
                type="radio" 
                name="answer" 
                value="C" 
                id="optionC" 
                onChange={e => setSelected(e.target.value)}
                checked={selected === "C"}/>
                <label htmlFor="optionC">{optionC}</label>
              </div>
              <div className="option-item">
                <input 
                type="radio" 
                name="answer" 
                value="D" 
                id="optionD" 
                onChange={e => setSelected(e.target.value)}
                checked={selected === "D"}/>
                <label htmlFor="optionD">{optionD}</label>
              </div>
            </div>
        </form>
    </div>
  )
}