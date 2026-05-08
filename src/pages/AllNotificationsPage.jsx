import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import { fetchNotifications } from '../api/notificationService';

const AllNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 5;

  const loadNotifications = async (currentPage) => {
    try {
      setLoading(true);
      const data = await fetchNotifications({ page: currentPage, limit: LIMIT });
      if (data.length < LIMIT) {
        setHasMore(false);
      }
      if (currentPage === 1) {
        setNotifications(data);
      } else {
        setNotifications((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadNotifications(nextPage);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        All Notifications
      </Typography>
      
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
      
      {!loading && hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <Button variant="outlined" color="primary" onClick={loadMore}>
            Load More
          </Button>
        </Box>
      )}
      
      {!loading && !hasMore && notifications.length > 0 && (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ my: 3 }}>
          No more notifications to load.
        </Typography>
      )}
    </Container>
  );
};

export default AllNotificationsPage;
