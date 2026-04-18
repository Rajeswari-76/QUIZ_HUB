import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuiz } from '../context/QuizContext';
import { BrainCircuit } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  
  const { login } = useQuiz();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const { data } = await axios.post(`http://localhost:5000${endpoint}`, formData);
      
      if (isLogin) {
        login({ ...data.user, token: data.token });
        localStorage.setItem("token", data.token);
        navigate('/');
      } else {
        setIsLogin(true);
        setFormData({ name: '', email: '', password: '' });
        alert("Registration successful! Please login.");
      }
    } catch (err) {
      setError(err.response?.data || "An error occurred");
    }
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <BrainCircuit size={48} className="text-accent" style={{ margin: '0 auto 1rem auto' }} />
          <h2 style={{ fontSize: '2rem' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        </div>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Name" 
              className="input-field"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            className="input-field"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="input-field"
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            required
          />

          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: 'var(--accent-color)', cursor: 'pointer', fontWeight: 600 }}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
