import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CategorySelector from '../components/CategorySelector';
import Leaderboard from '../components/Leaderboard';
import { useQuiz } from '../context/QuizContext';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { startQuiz, user } = useQuiz();

  const handleSelectCategory = async (topic) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setLoading(true);
    try {
      // In a real app, URL should be in env
      const { data } = await axios.post('http://localhost:5000/api/quiz/generate', { topic });
      startQuiz(data);
      navigate('/quiz');
    } catch (error) {
      console.error('Failed to generate quiz', error);
      const errorMsg = error.response?.data?.details || error.response?.data?.error || error.message;
      alert(`Failed to load quiz: ${errorMsg}\n\nPlease check your backend configuration.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in">
      <div style={{ textAlign: 'center', margin: '3rem 0' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Test Your Knowledge with <span className="text-gradient">AI</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Select a topic below and let our AI generate a custom 10-question quiz just for you. Compete on the leaderboard!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Select a Topic</h2>
          {loading ? (
            <div className="glass-panel" style={{ padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Loader2 size={48} className="animate-pulse text-accent" style={{ animation: 'spin 1s linear infinite' }} />
              <h3>Generating Quiz with AI...</h3>
            </div>
          ) : (
            <CategorySelector onSelect={handleSelectCategory} />
          )}
        </div>
        
        <div>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Home;