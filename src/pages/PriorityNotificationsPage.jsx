import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import { fetchNotifications } from '../api/notificationService';

const TYPE_WEIGHTS = {
  'Placement': 3,
  'Result': 2,
  'Event': 1
};

const PriorityNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const loadPriorityNotifications = async () => {
      try {
        setLoading(true);
        // Fetch a larger batch to sort priority from
        const data = await fetchNotifications({ limit: 50, page: 1 });
        
        let filteredData = data.filter(n => !n.read); // Priority inbox is only for UNREAD notifications

        if (filterType !== 'All') {
          filteredData = filteredData.filter(n => n.type === filterType);
        }

        // Sort by Weight, then Recency
        filteredData.sort((a, b) => {
          const weightA = TYPE_WEIGHTS[a.type] || 0;
          const weightB = TYPE_WEIGHTS[b.type] || 0;
          
          if (weightA !== weightB) {
            return weightB - weightA;
          }
          const timeA = new Date(a.timestamp).getTime();
          const timeB = new Date(b.timestamp).getTime();
          return timeB - timeA;
        });

        setNotifications(filteredData.slice(0, limit));
      } catch (error) {
        console.error("Error loading priority notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPriorityNotifications();
  }, [limit, filterType]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Priority Inbox
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Filter Type</InputLabel>
            <Select
              value={filterType}
              label="Filter Type"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="All">All Types</MenuItem>
              <MenuItem value="Placement">Placement</MenuItem>
              <MenuItem value="Result">Result</MenuItem>
              <MenuItem value="Event">Event</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Show Top</InputLabel>
            <Select
              value={limit}
              label="Show Top"
              onChange={(e) => setLimit(e.target.value)}
            >
              <MenuItem value={5}>Top 5</MenuItem>
              <MenuItem value={10}>Top 10</MenuItem>
              <MenuItem value={15}>Top 15</MenuItem>
              <MenuItem value={20}>Top 20</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {notifications.length === 0 && !loading && (
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f9fafb' }}>
          <Typography variant="h6" color="text.secondary">
            No priority notifications found. You're all caught up!
          </Typography>
        </Paper>
      )}
      
      <Box sx={{ mt: 3 }}>
        {notifications.map((notif) => (
          <NotificationCard key={notif.id} notification={notif} />
        ))}
      </Box>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default PriorityNotificationsPage;
