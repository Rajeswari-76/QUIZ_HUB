import React from 'react';
import { Code, Globe, Zap, Database, Atom, Blocks, Terminal, Layout, Box } from 'lucide-react';

const defaultCategories = [
  { id: 'react', name: 'React.js', icon: <Atom size={24} /> },
  { id: 'javascript', name: 'JavaScript Core', icon: <Code size={24} /> },
  { id: 'nodejs', name: 'Node.js', icon: <Blocks size={24} /> },
  { id: 'mongodb', name: 'MongoDB', icon: <Database size={24} /> },
  { id: 'web', name: 'Web Fundamentals', icon: <Globe size={24} /> },
  { id: 'ai', name: 'Artificial Intelligence', icon: <Zap size={24} /> },
  { id: 'python', name: 'Python', icon: <Terminal size={24} /> },
  { id: 'css', name: 'CSS Styling', icon: <Layout size={24} /> },
  { id: 'docker', name: 'Docker', icon: <Box size={24} /> },
];

const CategorySelector = ({ onSelect }) => {
  return (
    <div className="grid-cards">
      {defaultCategories.map(cat => (
        <div key={cat.id} className="topic-card glass-panel" onClick={() => onSelect(cat.name)}>
          <div className="topic-icon">
            {cat.icon}
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{cat.name}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            10 Questions &bull; AI Generated
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
