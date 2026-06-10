'use client';

import { useEffect, useState } from 'react';
import './TypingSpeed.css';
import axios from 'axios';

type CodeSnippet = {
  title: string;
  code: string;
};

const getCodeSnippets = async (): Promise<CodeSnippet[]> => {
  try {
    const response = await axios.get('/api/codesnippets');
    return response.data.codeSnippets;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error(message);
    return [];
  }
};


const TypingSpeed = () => {
  const [input, setInput] = useState('');
  const [snippet, setSnippet] = useState('');
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);

  const getRandomSnippet = (codeSnippets: CodeSnippet[]) => {
    if (codeSnippets.length === 0) return '';
    return codeSnippets[Math.floor(Math.random() * codeSnippets.length)].code;
  };

  useEffect(() => {
    const loadSnippets = async () => {
      try {
        const codes = await getCodeSnippets();
        setCodeSnippets(codes);
        setSnippet(getRandomSnippet(codes));
      } catch (error) {
        console.error(error);
      }
    };

    loadSnippets();
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      if (startTime) {
        const elapsed = (Date.now() - startTime) / 1000;
        setTime(elapsed);
      }
    }, 100); // Update every 100ms for smooth decimal display

    return () => clearInterval(id);
  }, [isRunning, startTime]);


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    let currentStartTime = startTime;
  
    if (!isRunning && !isFinished) {
      currentStartTime = Date.now();
      setIsRunning(true);
      setStartTime(currentStartTime);
    }
  
    // USE value here, not input
    if (value === snippet && !isFinished) {
      const finalTime = currentStartTime ? (Date.now() - currentStartTime) / 1000 : time;
      setTime(finalTime);
      setIsFinished(true);
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setInput('');
    setSnippet(getRandomSnippet(codeSnippets));
    setTime(0);
    setStartTime(null);
    setIsRunning(false);
    setIsFinished(false);
  }

  return (
    <div className="typing-page">
      <div className="typing-container">
        <div className="typing-header">
          <h1>Typing Speed Challenge</h1>
          <p>Test your typing speed and accuracy. Practice coding-related text to enhance your programming efficiency.</p>
          <p>Rewrite the code snippet in the input box below. Let&apos;s see how long it takes you to get it right!</p>
        </div>

        <div className="typing-card">
          <div className="typing-code-section">
            <p className="typing-code-display">{snippet}</p>
          </div>
          
          <div className="typing-input-section">
            <textarea
              value={input} 
              onChange={handleChange} 
              disabled={isFinished || !snippet}
              placeholder="Start typing the code above..."
            />
          </div>

          {!isFinished && (
            <p className="typing-time">Time: {time.toFixed(2)} seconds</p>
          )}
          
          {isFinished && (
            <p className="typing-success">Well done! You finished in {time.toFixed(2)} seconds!</p>
          )}

          <div className="typing-button-section">
            <button onClick={handleReset} className="typing-button">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingSpeed;
