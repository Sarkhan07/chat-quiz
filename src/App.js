import React from 'react';
import './App.css';
import MainLayout from './pages/MainLayout.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AuthorizationPage from './pages/AuthorizationPage';
import { Provider } from 'react-redux';
import store from './store.js'

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
