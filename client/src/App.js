import React from 'react'
import { useEffect, useState } from 'react';
import { ColorModeContext, useMode } from './theme.js';
import { CssBaseline, ThemeProvider, Divider } from '@mui/material';
import { Routes, Route, redirect } from 'react-router-dom';
import Topbar from './sences/global/TopBar.jsx';
import Home from './sences/home'
import PostsPage from './sences/posts'
import AdminPanel from './sences/admin/index.jsx';
import LoginPage from './sences/global/LoginPage.jsx';
import SignUpPage from './sences/global/SignUpPage.jsx';
import ErrorPage from './sences/global/ErrorPage.jsx';
import ResetPassword from './sences/reset_password/index.jsx';
import { Navigate } from 'react-router-dom';

const App = () => {
  const [theme, colorMode] = useMode();
  const [loggedIn, setLoggedIn] = useState(false);
  var isAdmin = false;
  if (sessionStorage.getItem('user')) {
    isAdmin = JSON.parse(sessionStorage.getItem('user')).is_admin;
  }
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <main className='content'>
            <Routes>
              {sessionStorage.getItem('user') !== null && (
                <>
                <Route path="/" element={<Home />} />
                </>
              )}
              {sessionStorage.getItem('user') === null && (
                <Route path="/" element={<Navigate to='/signin' />} />
              )}
              <Route path="/topics/:topicId/posts" element={<PostsPage />} />
              {isAdmin === true && (
                <Route path="/admin" element={<AdminPanel />} />
              )
              }
              <Route path="/signin" element={<LoginPage setLoggedIn={setLoggedIn} />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/reset_password/:token" element={<ResetPassword />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App