/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Circle } from 'lucide-react';

const QuestionCard = ({ question, currentOption, onSelectOption, isRevealed }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="question-card glass-panel"
    >
      <h2 className="question-text">{question.question}</h2>
      
      <div className="options-grid">
        {question.options.map((option, idx) => {
          const isSelected = currentOption === option;
          const isCorrect = isRevealed && option === question.answer;
          const isWrong = isRevealed && isSelected && option !== question.answer;

          let className = 'option-btn';
          if (isSelected) className += ' selected';
          if (isCorrect) className += ' correct';
          if (isWrong) className += ' wrong';

          return (
            <button
              key={idx}
              className={className}
              onClick={() => !isRevealed && onSelectOption(option)}
              disabled={isRevealed}
            >
              <span>{option}</span>
              {isCorrect && <CheckCircle2 className="text-success" />}
              {isWrong && <XCircle className="text-error" />}
              {!isCorrect && !isWrong && isSelected && <Circle className="text-accent" fill="currentColor" />}
              {!isCorrect && !isWrong && !isSelected && <Circle className="text-secondary" />}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuestionCard;