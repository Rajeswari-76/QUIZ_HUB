import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';

const QuizSession = () => {
  const { activeQuiz, setCurrentScore } = useQuiz();
  const navigate = useNavigate();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [localScore, setLocalScore] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);

  if (!activeQuiz) {
    navigate('/');
    return null;
  }

  const question = activeQuiz.questions[currentIndex];

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsRevealed(true);
    
    if (option === question.answer) {
      setLocalScore(prev => prev + 10);
    }
  };

  const handleTimeUp = () => {
    if (!isRevealed) {
      setIsRevealed(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < activeQuiz.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsRevealed(false);
      setResetTimer(prev => prev + 1);
    } else {
      setCurrentScore(localScore);
      navigate('/results');
    }
  };

  return (
    <div className="container quiz-container animate-fade-in">
      <div className="quiz-header">
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{activeQuiz.topic} Quiz</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Question {currentIndex + 1} of {activeQuiz.questions.length}
          </p>
        </div>
        
        {!isRevealed && (
          <Timer initialSeconds={15} onTimeUp={handleTimeUp} resetTrigger={resetTimer} />
        )}
      </div>

      <div style={{ background: 'var(--glass-bg)', height: '4px', borderRadius: '2px', marginBottom: '2rem', overflow: 'hidden' }}>
        <div style={{ 
          height: '100%', 
          background: 'var(--accent-color)', 
          width: `${((currentIndex + 1) / activeQuiz.questions.length) * 100}%`,
          transition: 'width 0.3s ease'
        }} />
      </div>

      <QuestionCard 
        question={question} 
        currentOption={selectedOption} 
        onSelectOption={handleSelectOption} 
        isRevealed={isRevealed} 
      />

      {isRevealed && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button className="btn animate-fade-in" onClick={handleNext}>
            {currentIndex < activeQuiz.questions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizSession;
