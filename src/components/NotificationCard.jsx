import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, CardActionArea, Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import { format } from 'date-fns';
import { markNotificationAsRead } from '../api/notificationService';

const NotificationCard = ({ notification, onReadUpdate }) => {
  const [open, setOpen] = useState(false);
  const [isRead, setIsRead] = useState(notification.read);

  const handleOpen = () => {
    setOpen(true);
    if (!isRead) {
      markNotificationAsRead(notification.id);
      setIsRead(true);
      if (onReadUpdate) onReadUpdate(notification.id);
    }
  };

  const handleClose = () => setOpen(false);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Event': return <EventIcon fontSize="small" />;
      case 'Placement': return <BusinessCenterIcon fontSize="small" />;
      case 'Result': return <SchoolIcon fontSize="small" />;
      default: return <EventIcon fontSize="small" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Event': return 'info';
      case 'Placement': return 'success';
      case 'Result': return 'warning';
      default: return 'default';
    }
  };

  return (
    <>
      <Card sx={{ 
        mb: 2, 
        borderLeft: !isRead ? '4px solid #3f51b5' : '4px solid #e0e0e0',
        bgcolor: !isRead ? '#f8f9fe' : 'background.paper',
        transition: 'all 0.3s ease'
      }}>
        <CardActionArea onClick={handleOpen}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip 
                  icon={getTypeIcon(notification.type)} 
                  label={notification.type} 
                  color={getTypeColor(notification.type)}
                  size="small"
                  variant={!isRead ? "filled" : "outlined"}
                />
                {!isRead && (
                  <Chip label="New" color="error" size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                )}
              </Box>
              <Typography variant="caption" color="text.secondary">
                {format(new Date(notification.timestamp), 'MMM dd, yyyy h:mm a')}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: !isRead ? 600 : 400, mt: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {notification.message}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {getTypeIcon(notification.type)}
          <Typography variant="h6">{notification.type} Update</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
            {notification.message}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 4 }}>
            Received on: {format(new Date(notification.timestamp), 'EEEE, MMMM do, yyyy @ h:mm a')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NotificationCard;
