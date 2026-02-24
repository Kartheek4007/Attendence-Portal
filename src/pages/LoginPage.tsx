import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuthStore } from '../store/authStore';

export const LoginPage = () => {
  const [email, setEmail] = useState('admin@school.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      console.log('Login response:', response);
      setAuth(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '40px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', margin: '0 0 8px 0' }}>
            Attendance Manager
          </h1>
          <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
            School & College Portal
          </p>
        </div>

        {error && (
          <div style={{
            marginBottom: '20px',
            padding: '12px',
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '6px',
            color: '#c33',
            fontSize: '14px'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '6px'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
              placeholder="admin@school.com"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '6px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#667eea'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#ddd'}
              placeholder="password123"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '11px',
              background: loading ? '#999' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#5568d3')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.background = '#667eea')}
          >
            {loading ? '⏳ Signing in...' : '→ Sign In'}
          </button>
        </form>

        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid #eee',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '12px', color: '#666', margin: '0 0 10px 0', fontWeight: '600' }}>
            📌 Demo Credentials:
          </p>
          <p style={{ fontSize: '11px', color: '#777', margin: 0, lineHeight: '1.6' }}>
            Admin: <strong>admin@school.com</strong> / password123<br />
            Teacher: <strong>teacher@school.com</strong> / password123<br />
            Student: <strong>student@school.com</strong> / password123
          </p>
        </div>
      </div>
    </div>
  );
};
