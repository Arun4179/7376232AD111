import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Toolbar>
        <NotificationsActiveIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Campus Connect
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            sx={{ 
              mr: 1, 
              borderBottom: location.pathname === '/' ? '2px solid white' : 'none',
              borderRadius: 0
            }}
          >
            All Notifications
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/priority"
            sx={{ 
              borderBottom: location.pathname === '/priority' ? '2px solid white' : 'none',
              borderRadius: 0
            }}
          >
            Priority Inbox
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
