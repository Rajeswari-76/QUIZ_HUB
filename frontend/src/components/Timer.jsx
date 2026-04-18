/* eslint-disable react-hooks/exhaustive-deps, react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ initialSeconds, onTimeUp, resetTrigger }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    // eslint-disable-next-line
    setSeconds(initialSeconds);
  }, [resetTrigger, initialSeconds]);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeUp]);

  const isWarning = seconds <= 5;

  return (
    <div className={`timer ${isWarning ? 'warning animate-pulse' : ''}`}>
      <Clock size={24} />
      <span>00:{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
};

export default Timer;