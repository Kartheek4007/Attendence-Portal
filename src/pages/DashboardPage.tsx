import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface DashboardStats {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
}

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();
  const [stats] = useState<DashboardStats>({
    totalStudents: 150,
    presentToday: 142,
    absentToday: 5,
    lateToday: 3,
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const navigateTo = (path: string) => navigate(path);

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f3f4f6', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '250px' : '80px',
        background: '#1f2937',
        color: 'white',
        padding: '20px',
        overflowY: 'auto',
        transition: 'width 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
          {sidebarOpen && <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>AttendanceMS</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '20px' }}
          >
            ☰
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { label: 'Dashboard', path: '/dashboard', icon: '📊' },
            { label: 'Students', path: '/students', icon: '👨‍🎓' },
            { label: 'Mark Attendance', path: '/attendance', icon: '✓' },
            { label: 'Reports', path: '/reports', icon: '📈' },
            user?.role === 'admin' && { label: 'Manage Classes', path: '/classes', icon: '🏫' },
            user?.role === 'admin' && { label: 'Manage Leaves', path: '/leaves', icon: '📋' },
          ].filter(Boolean).map((item: any) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'background 0.2s',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#374151'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            width: sidebarOpen ? 'calc(100% - 40px)' : '40px',
            padding: '10px',
            background: '#dc2626',
            border: 'none',
            color: 'white',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#b91c1c'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#dc2626'}
        >
          {sidebarOpen ? '← Logout' : '←'}
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {/* Header */}
        <header style={{
          background: 'white',
          padding: '20px 30px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 5px 0', color: '#1f2937' }}>Dashboard</h1>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              Welcome back, {user?.name}! ({user?.role})
            </p>
          </div>
          <div style={{ textAlign: 'right', color: '#6b7280', fontSize: '14px' }}>
            <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </header>

        {/* Stats Cards */}
        <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          {[
            { title: 'Total Students', value: stats.totalStudents, icon: '👥', color: '#3b82f6' },
            { title: 'Present Today', value: stats.presentToday, icon: '✅', color: '#10b981' },
            { title: 'Absent Today', value: stats.absentToday, icon: '❌', color: '#ef4444' },
            { title: 'Late Today', value: stats.lateToday, icon: '⏰', color: '#f59e0b' },
          ].map((stat) => (
            <div key={stat.title} style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
            }}>
              <div style={{
                fontSize: '32px',
                background: stat.color,
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 5px 0' }}>{stat.title}</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div style={{ padding: '0 30px 30px 30px' }}>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center',
            color: '#6b7280',
          }}>
            <p style={{ fontSize: '16px', margin: 0 }}>📊 Charts and detailed analytics will be available once you navigate to specific sections</p>
            <p style={{ fontSize: '14px', color: '#9ca3af', margin: '10px 0 0 0' }}>Use the sidebar to explore Students, Attendance, Reports, and more features</p>
          </div>
        </div>
      </main>
    </div>
  );
};
