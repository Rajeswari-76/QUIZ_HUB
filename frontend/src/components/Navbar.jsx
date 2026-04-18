import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, LogOut, User } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

const Navbar = () => {
  const { user, logout } = useQuiz();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="navbar glass-panel" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}>
      <Link to="/" className="navbar-brand">
        <BrainCircuit size={32} className="text-gradient" />
        <span>AI Quiz Hub</span>
      </Link>
      
      <div className="navbar-links">
        {user ? (
          <>
            <span className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} /> {user.name}
            </span>
            <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <Link to="/auth" className="btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;