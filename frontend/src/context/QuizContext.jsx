/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { token, name, email }
  const [activeQuiz, setActiveQuiz] = useState(null); // { topic, questions }
  const [currentScore, setCurrentScore] = useState(0);

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const startQuiz = (quizData) => {
    setActiveQuiz(quizData);
    setCurrentScore(0);
  };

  const endQuiz = () => {
    setActiveQuiz(null);
  };

  return (
    <QuizContext.Provider value={{
      user, login, logout,
      activeQuiz, startQuiz, endQuiz,
      currentScore, setCurrentScore
    }}>
      {children}
    </QuizContext.Provider>
  );
};