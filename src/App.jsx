import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import AllNotificationsPage from './pages/AllNotificationsPage';
import PriorityNotificationsPage from './pages/PriorityNotificationsPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllNotificationsPage />} />
          <Route path="/priority" element={<PriorityNotificationsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
