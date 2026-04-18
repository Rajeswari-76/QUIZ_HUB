import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trophy } from 'lucide-react';

const Leaderboard = ({ topic }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const url = topic 
          ? `http://localhost:5000/api/score?topic=${encodeURIComponent(topic)}`
          : 'http://localhost:5000/api/score';
        const { data } = await axios.get(url);
        setScores(data);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      }
    };

    fetchScores();
  }, [topic]);

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Trophy size={28} className="text-gradient" />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Top Scholars</h2>
      </div>
      
      {scores.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No scores recorded yet. Be the first!</p>
      ) : (
        <div className="leaderboard-list">
          {scores.map((entry, idx) => (
            <div key={idx} className="leaderboard-item">
              <span className={`rank rank-${idx + 1}`}>#{idx + 1}</span>
              <div className="player-info">
                <div className="player-name">{entry.user?.name || 'Anonymous'}</div>
                {!topic && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Topic: {entry.topic}
                  </div>
                )}
              </div>
              <div className="player-score">{entry.score} pts</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
