import React from 'react'
import { useEffect } from 'react';
import { ColorModeContext, useMode } from './theme.js';
import { CssBaseline, ThemeProvider, Divider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './sences/global/TopBar.jsx';
import Home from './sences/home'
import PostsPage from './sences/posts'
import AdminPanel from './sences/admin/index.jsx';
const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <main className='content'>
            <Topbar />
            <Divider flexItem />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/topics/:topicId/posts" element={<PostsPage />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App