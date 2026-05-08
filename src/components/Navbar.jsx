import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token') || '');
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    localStorage.setItem('token', token);
    setOpen(false);
    window.location.reload(); // Reload to fetch with new token
  };

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={2}>
        <Toolbar>
          <NotificationsActiveIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Campus Connect
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                mr: 2,
                borderBottom: location.pathname === '/priority' ? '2px solid white' : 'none',
                borderRadius: 0
              }}
            >
              Priority Inbox
            </Button>
            <IconButton color="inherit" onClick={handleOpen} title="Set API Token">
              <VpnKeyIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>API Token Settings</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            To fetch real data from the Campus Notifications API, please enter your valid authentication token. If left blank or invalid, the application will gracefully fall back to mock data.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Authorization Token"
            type="text"
            fullWidth
            variant="outlined"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your token here..."
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save & Reload</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
