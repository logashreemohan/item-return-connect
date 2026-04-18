import React, { useState, useEffect } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import { Dashboard } from './Dashboard';
import { AddItemForm } from '@/components/AddItemForm';
import { getSession, clearSession } from '@/lib/auth';

type User = { name: string; email: string } | null;
type View = 'login' | 'register' | 'dashboard' | 'add-item';

const Index = () => {
  const [user, setUser] = useState<User>(null);
  const [currentView, setCurrentView] = useState<View>('login');

  // Restore session on page load
  useEffect(() => {
    const session = getSession();
    if (session) {
      setUser({ name: session.name, email: session.email });
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleRegister = (userData: { name: string; email: string }) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
    setCurrentView('login');
  };

  const handleAddItem = () => {
    setCurrentView('add-item');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  switch (currentView) {
    case 'login':
      return (
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentView('register')}
        />
      );

    case 'register':
      return (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentView('login')}
        />
      );

    case 'dashboard':
      return user ? (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          onAddItem={handleAddItem}
        />
      ) : null;

    case 'add-item':
      return user ? (
        <AddItemForm
          user={user}
          onBack={handleBackToDashboard}
        />
      ) : null;

    default:
      return null;
  }
};

export default Index;
