'use client';

import React, { useState, useEffect } from 'react';
import { IconPlayerPlay, IconPlayerPause, IconRefresh } from '@tabler/icons-react';

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (interval) clearInterval(interval);
          setIsActive(false);
          alert('ポモドーロセッション終了！');
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl font-bold mb-8">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {isActive ? <IconPlayerPause size={24} /> : <IconPlayerPlay size={24} />}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          <IconRefresh size={24} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;