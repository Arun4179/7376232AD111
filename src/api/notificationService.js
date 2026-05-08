import axios from 'axios';

const API_URL = 'http://4.224.186.213/evaluation-service/notifications';

// Dummy data for fallback
const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'Event', message: 'Annual Fest', timestamp: '2026-05-01T10:00:00Z', read: false },
  { id: 2, type: 'Placement', message: 'Google Drive', timestamp: '2026-05-02T10:00:00Z', read: false },
  { id: 3, type: 'Result', message: 'Semester 6 Results', timestamp: '2026-05-03T10:00:00Z', read: false },
  { id: 4, type: 'Event', message: 'Tech Talk', timestamp: '2026-05-04T10:00:00Z', read: false },
  { id: 5, type: 'Placement', message: 'Microsoft Hiring', timestamp: '2026-05-04T12:00:00Z', read: false },
  { id: 6, type: 'Result', message: 'Midterm Marks', timestamp: '2026-05-05T10:00:00Z', read: false },
  { id: 7, type: 'Placement', message: 'Amazon Off-Campus', timestamp: '2026-05-06T10:00:00Z', read: true },
  { id: 8, type: 'Event', message: 'Alumni Meet', timestamp: '2026-05-07T10:00:00Z', read: true },
  { id: 9, type: 'Placement', message: 'Startup Fair', timestamp: '2026-05-01T08:00:00Z', read: true },
  { id: 10, type: 'Result', message: 'Re-evaluation Result', timestamp: '2026-05-02T08:00:00Z', read: true },
];

/**
 * Fetch notifications from the API with optional query parameters.
 * If the API is unreachable or returns 401/403 (due to missing token), fallback to mock data.
 */
export const fetchNotifications = async (params = {}) => {
  try {
    const FALLBACK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhcnVuLmFkMjNAYml0c2F0aHkuYWMuaW4iLCJleHAiOjE3NzgyNDAwMDgsImlhdCI6MTc3ODIzOTEwOCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImIwYWM2ZmM5LTc2N2ItNGJkOS05OWIzLTViMTM0NzA0M2E3NyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFydW4gbiIsInN1YiI6ImJhNmI5MTViLTA0YTUtNDQwMy05YTYyLWQ1OWZkNjhhZjMyYiJ9LCJlbWFpbCI6ImFydW4uYWQyM0BiaXRzYXRoeS5hYy5pbiIsIm5hbWUiOiJhcnVuIG4iLCJyb2xsTm8iOiI3Mzc2MjMyYWQxMTEiLCJhY2Nlc3NDb2RlIjoidUthSmZtIiwiY2xpZW50SUQiOiJiYTZiOTE1Yi0wNGE1LTQ0MDMtOWE2Mi1kNTlmZDY4YWYzMmIiLCJjbGllbnRTZWNyZXQiOiJCRW5tZFdQeGFxdnpQYnhZIn0.QCHqeW2NcDJ4Az3toFo1cY5_9Jlad6dGZKwBSQkyTI8";
    const token = localStorage.getItem('token') || FALLBACK_TOKEN;
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: params.limit,
        page: params.page,
        notification_type: params.notification_type,
      },
    });
    
    const notificationsArray = response.data.notifications || [];
    return notificationsArray.map(n => ({
      id: n.ID || n.id,
      type: n.Type || n.type,
      message: n.Message || n.message,
      timestamp: n.Timestamp || n.timestamp,
      read: n.Read !== undefined ? n.Read : (n.read || false)
    }));
  } catch (error) {
    console.warn("⚠️ API error or missing token. Falling back to mock data.");
    
    // Simulate API filtering and pagination on mock data
    let data = [...MOCK_NOTIFICATIONS];
    if (params.notification_type) {
      data = data.filter(n => n.type === params.notification_type);
    }
    
    const limit = parseInt(params.limit) || 10;
    const page = parseInt(params.page) || 1;
    
    const startIndex = (page - 1) * limit;
    const paginatedData = data.slice(startIndex, startIndex + limit);
    
    return paginatedData;
  }
};
