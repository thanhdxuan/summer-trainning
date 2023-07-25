import React from 'react'
import { ColorModeContext, useMode } from './theme.js';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './sences/global/TopBar.jsx';
import Home from './sences/home'
const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={ colorMode }>
      <ThemeProvider theme={ theme }>
        <CssBaseline/>
        <div className='app'>
          <main className='content'>
            <Topbar/>
            <Home/>
            {/* <Routes>
              <Route path="/" element= { <Home /> } />
              <Route path="/" element= { <Home /> } />
            </Routes> */}
          </main>
        </div> 
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App