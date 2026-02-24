import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock data for demo mode
const mockUsers: Record<string, { user: User; password: string }> = {
  'admin@school.com': {
    user: {
      id: '1',
      email: 'admin@school.com',
      name: 'Admin User',
      role: 'admin',
      schoolId: '1',
    },
    password: 'password123',
  },
  'teacher@school.com': {
    user: {
      id: '2',
      email: 'teacher@school.com',
      name: 'Teacher User',
      role: 'teacher',
      schoolId: '1',
    },
    password: 'password123',
  },
  'student@school.com': {
    user: {
      id: '3',
      email: 'student@school.com',
      name: 'Student User',
      role: 'student',
      schoolId: '1',
    },
    password: 'password123',
  },
};

export const authService = {
  login: async (email: string, password: string) => {
    // Check if backend is available
    try {
      return await api.post<{ token: string; user: User }>('/auth/login', { email, password });
    } catch (error) {
      // Fall back to mock data for demo mode
      const user = mockUsers[email];
      if (user && user.password === password) {
        const mockToken = 'mock-jwt-token-' + Date.now();
        return Promise.resolve({
          data: {
            token: mockToken,
            user: user.user,
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        });
      }
      return Promise.reject({ response: { data: { message: 'Invalid email or password' } } });
    }
  },
  register: (data: any) =>
    api.post<{ token: string; user: User }>('/auth/register', data),
  getCurrentUser: () =>
    api.get<User>('/auth/me'),
  logout: () => {
    localStorage.removeItem('token');
  },
};

export const studentService = {
  getAll: (classId?: string) =>
    api.get('/students', { params: { classId } }),
  getById: (id: string) =>
    api.get(`/students/${id}`),
  create: (data: any) =>
    api.post('/students', data),
  update: (id: string, data: any) =>
    api.put(`/students/${id}`, data),
  delete: (id: string) =>
    api.delete(`/students/${id}`),
};

export const attendanceService = {
  markAttendance: (data: any) =>
    api.post('/attendance', data),
  getAttendance: (studentId?: string, date?: string) =>
    api.get('/attendance', { params: { studentId, date } }),
  getStats: (classId: string, date?: string) =>
    api.get(`/attendance/stats/${classId}`, { params: { date } }),
  getStudentStats: (studentId: string) =>
    api.get(`/attendance/student/${studentId}`),
  updateAttendance: (id: string, data: any) =>
    api.put(`/attendance/${id}`, data),
  deleteAttendance: (id: string) =>
    api.delete(`/attendance/${id}`),
};

export const classService = {
  getAll: () =>
    api.get('/classes'),
  getById: (id: string) =>
    api.get(`/classes/${id}`),
  create: (data: any) =>
    api.post('/classes', data),
  update: (id: string, data: any) =>
    api.put(`/classes/${id}`, data),
  delete: (id: string) =>
    api.delete(`/classes/${id}`),
};

export const leaveService = {
  apply: (data: any) =>
    api.post('/leaves', data),
  getApplications: (status?: string) =>
    api.get('/leaves', { params: { status } }),
  approveLeave: (id: string) =>
    api.put(`/leaves/${id}/approve`),
  rejectLeave: (id: string) =>
    api.put(`/leaves/${id}/reject`),
};

export const reportService = {
  getDailyReport: (classId: string, date: string) =>
    api.get('/reports/daily', { params: { classId, date } }),
  getWeeklyReport: (classId: string, startDate: string) =>
    api.get('/reports/weekly', { params: { classId, startDate } }),
  getMonthlyReport: (classId: string, month: string) =>
    api.get('/reports/monthly', { params: { classId, month } }),
  getStudentReport: (studentId: string, month?: string) =>
    api.get(`/reports/student/${studentId}`, { params: { month } }),
};

export default api;
