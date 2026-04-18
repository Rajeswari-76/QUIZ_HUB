import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { ref, push, set } from 'firebase/database';
import { db } from '../firebase/firebase';
import { Trophy, Home } from 'lucide-react';
import axios from 'axios';
import Leaderboard from '../components/Leaderboard';

const Results = () => {
  const { activeQuiz, currentScore, user, endQuiz } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeQuiz) {
      navigate('/');
      return;
    }

    const saveScore = async () => {
      // Save to Firebase Realtime DB
      try {
        const leaderboardRef = ref(db, 'leaderboard');
        const newScoreRef = push(leaderboardRef);
        await set(newScoreRef, {
          username: user?.name || 'Anonymous',
          topic: activeQuiz.topic,
          score: currentScore,
          timestamp: Date.now()
        });
      } catch (err) {
        console.error("Failed to save to firebase", err);
      }

      // Save to MongoDB
      try {
        await axios.post('http://localhost:5000/api/score', {
          score: currentScore,
          topic: activeQuiz.topic,
          totalQuestions: activeQuiz.questions.length
        }, {
          headers: { Authorization: user?.token }
        });
      } catch (err) {
        console.error("Failed to save to MongoDB", err);
      }
    };

    saveScore();
  }, [activeQuiz, currentScore, user, navigate]);

  if (!activeQuiz) return null;

  const totalPossible = activeQuiz.questions.length * 10;
  const percentage = Math.round((currentScore / totalPossible) * 100);

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', maxWidth: '600px', width: '100%' }}>
        <Trophy size={64} className="text-gradient" style={{ margin: '0 auto 2rem auto' }} />
        
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Quiz Completed!</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          You completed the {activeQuiz.topic} quiz.
        </p>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', marginBottom: '3rem' }}>
          <div style={{ fontSize: '4rem', fontWeight: 700, color: 'var(--accent-color)' }}>
            {currentScore} <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>/ {totalPossible} pts</span>
          </div>
          <div style={{ marginTop: '1rem', fontSize: '1.25rem' }}>
            Accuracy: {percentage}%
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <button className="btn btn-secondary" onClick={() => { endQuiz(); navigate('/'); }}>
            <Home size={20} /> Home
          </button>
        </div>

        <Leaderboard topic={activeQuiz.topic} />
      </div>
    </div>
  );
};

export default Results;
