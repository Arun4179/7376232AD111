import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import { format } from 'date-fns';

const NotificationCard = ({ notification }) => {
  const isNew = !notification.read;

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
    <Card sx={{ 
      mb: 2, 
      borderLeft: isNew ? '4px solid #3f51b5' : '4px solid transparent',
      bgcolor: isNew ? '#f8f9fe' : 'background.paper'
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip 
              icon={getTypeIcon(notification.type)} 
              label={notification.type} 
              color={getTypeColor(notification.type)}
              size="small"
              variant={isNew ? "filled" : "outlined"}
            />
            {isNew && (
              <Chip label="New" color="error" size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
            )}
          </Box>
          <Typography variant="caption" color="text.secondary">
            {format(new Date(notification.timestamp), 'MMM dd, yyyy h:mm a')}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: isNew ? 600 : 400, mt: 1 }}>
          {notification.message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
