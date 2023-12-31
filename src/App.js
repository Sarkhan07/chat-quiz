import React from 'react';
import './App.css';
import MainLayout from './pages/MainLayout.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthorizationPage from './pages/AuthorizationPage';
import { Provider } from 'react-redux';
import store from './store.js'
import QuizPage from './pages/QuizPage.jsx';
import ResultsPage from './pages/ResultsPage.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthorizationPage />} />
          <Route
            path="*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/main" element={<MainPage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                  <Route path="/results" element={<ResultsPage />} />
                </Routes>
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
