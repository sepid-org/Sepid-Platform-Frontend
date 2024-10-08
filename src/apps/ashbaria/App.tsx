import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DarkSecondary } from '../ashbaria/constants/colors';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from '../ashbaria/styles/Theme';
import PrivateRoute from 'commons/routes/PrivateRoute';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import GameMenu from './pages/Menu';

const App = () => {

  return (
    <div style={{
      backgroundColor: DarkSecondary,
      minHeight: '100vh',  // This ensures the color covers the full height of the viewport
    }}>
      <ThemeProvider theme={customTheme}>
        <Routes>

          <Route path="/" element={<PrivateRoute loginUrl='/program/ashbaria/login/' />}>
            <Route path="/" element={<GameMenu />} />
          </Route>

          <Route path="/" element={<AnonymousRoute base='/program/filmbazi/' />}>
          </Route>

        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;