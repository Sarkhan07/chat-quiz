import React from 'react';
import './App.css';
import MainLayout from './pages/MainLayout.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthorizationPage from './pages/AuthorizationPage';
import QuizComponent from './pages/QuizComponent';
import ChatComponent from './pages/ChatComponent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthorizationPage />} />
        <Route
          path="*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/chat" element={<ChatComponent />} />
                <Route path="/quiz" element={<QuizComponent />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
