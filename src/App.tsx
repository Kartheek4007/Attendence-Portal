import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { StudentsPage } from './pages/StudentsPage';
import { AttendancePage } from './pages/AttendancePage';
import { ReportsPage } from './pages/ReportsPage';
import { LeavesPage } from './pages/LeavesPage';
import { ClassesPage } from './pages/ClassesPage';

function App() {
  const loadFromStorage = useAuthStore((state) => state.loadFromStorage);

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute requiredRole={['admin', 'teacher']}>
              <StudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute requiredRole={['teacher', 'admin']}>
              <AttendancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute requiredRole={['admin', 'teacher']}>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaves"
          element={
            <ProtectedRoute>
              <LeavesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute requiredRole={['admin']}>
              <ClassesPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/unauthorized"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
                <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
                <a href="/dashboard" className="text-blue-600 hover:text-blue-700">
                  Go back to Dashboard
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
