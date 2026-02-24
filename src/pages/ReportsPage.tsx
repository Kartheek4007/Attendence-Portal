import { useState } from 'react';

export const ReportsPage = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    alert(`📥 Report exported as ${format.toUpperCase()}!`);
  };

  const sampleData = [
    { name: 'John Doe', rollNumber: '001', present: 18, absent: 2, attendance: '90%' },
    { name: 'Jane Smith', rollNumber: '002', present: 19, absent: 1, attendance: '95%' },
    { name: 'Bob Johnson', rollNumber: '003', present: 17, absent: 3, attendance: '85%' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header style={{ background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '20px 30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 5px 0' }}>📈 Reports</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Generate and export attendance reports</p>
      </header>

      <main style={{ padding: '30px' }}>
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '25px', marginBottom: '25px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>Report Filters</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '5px' }}>Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="student">Student Wise</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '5px' }}>From Date</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '5px' }}>To Date</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleExport('pdf')}
              style={{
                background: '#dc2626',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#b91c1c'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#dc2626'}
            >
              📄 Export PDF
            </button>
            <button
              onClick={() => handleExport('excel')}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#10b981'}
            >
              📊 Export Excel
            </button>
            <button
              onClick={() => handleExport('csv')}
              style={{
                background: '#0891b2',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#0e7490'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#0891b2'}
            >
              📋 Export CSV
            </button>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '25px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>Attendance Report</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Roll</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Present</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Absent</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#1f2937' }}>{row.name}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#6b7280' }}>{row.rollNumber}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#10b981', fontWeight: '600' }}>{row.present}</td>
                    <td style={{ padding: '12px', fontSize: '14px', color: '#dc2626', fontWeight: '600' }}>{row.absent}</td>
                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: row.attendance === '90%' ? '#f59e0b' : row.attendance === '95%' ? '#10b981' : '#dc2626' }}>{row.attendance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
