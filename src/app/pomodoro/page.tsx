import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import PomodoroTimer from '@/components/PomodoroTimer';

const Pomodoro = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <PomodoroTimer />
    </div>
  );
};

export default Pomodoro;
