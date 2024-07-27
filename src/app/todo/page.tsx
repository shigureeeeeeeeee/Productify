import React from 'react';
import TodoList from '@/components/TodoList';
import AddTodoForm from '@/components/AddTodoForm';
import DashboardHeader from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

const TodoPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <DashboardHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Todoリスト</h1>
          <AddTodoForm />
          <TodoList />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default TodoPage;