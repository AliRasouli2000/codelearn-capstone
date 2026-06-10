'use client';

import { useState } from 'react';
import { bugs as bugsList } from '@/data/bugsSeed';
import './BugFix.css';

const BugFix = () => {
  const [turn, setTurn] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(true);
  const [input, setInput] = useState('');
  const currentBug = bugsList[turn];
  
  return (
    <div className="bugfix-page">
      <div className="bugfix-container">
        <div className="bugfix-header">
          <h1>Welcome to our Bug Fix Challenge</h1>
          <p>Identify and fix the bugs in the code snippets provided to improve your debugging skills.</p>
          <p>in our input box simply type the character that&apos;s missing in the code snippet above</p>
        </div>
        {currentBug && (
            <div className="bugfix-card">
              <div className="bugfix-code-section">
                <p>{currentBug.code}</p>
              </div>
              <div className="bugfix-input-section">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
              </div>
              <div className="bugfix-button-section">
                <button 
                onClick = {
                  input === currentBug.missing ? () => {
                    setTurn((currentTurn) => currentTurn + 1);
                    setInput('');
                    setAnsweredCorrectly(true);
                  }
                    : 
                    () => setAnsweredCorrectly(false)
                }
                >Next Bug</button>
              </div>
              {!answeredCorrectly && <p className="bugfix-feedback">Try again</p>}
            </div>
        )}
      </div>
    </div>
    
  );
};

export default BugFix;
