import React from 'react';
import './App.css';
import MainLayout from './pages/MainLayout.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthorizationPage from './pages/AuthorizationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthorizationPage />} />
        <Route
          path="*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/main" element={<MainPage />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
