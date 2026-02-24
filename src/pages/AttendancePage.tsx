import { useEffect, useState } from 'react';
import { studentService, attendanceService } from '../services/api';
import type { Student } from '../types';
import { CheckCircle, XCircle, Clock, Save, AlertCircle } from 'lucide-react';

export const AttendancePage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<
    Record<string, 'present' | 'absent' | 'late' | 'half-day' | 'leave'>
  >({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const response = await studentService.getAll();
      setStudents(response.data);
      // Initialize attendance object
      const initialAttendance: any = {};
      response.data.forEach((student: Student) => {
        initialAttendance[student.id] = 'present';
      });
      setAttendance(initialAttendance);
    } catch (error) {
      console.error('Failed to load students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (studentId: string, status: any) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Submit attendance records
      for (const [studentId, status] of Object.entries(attendance)) {
        await attendanceService.markAttendance({
          studentId,
          date: selectedDate,
          status,
        });
      }
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Failed to submit attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: 'present', label: 'Present', icon: CheckCircle, color: 'text-green-600' },
    { value: 'absent', label: 'Absent', icon: XCircle, color: 'text-red-600' },
    { value: 'late', label: 'Late', icon: Clock, color: 'text-yellow-600' },
    { value: 'half-day', label: 'Half Day', icon: Clock, color: 'text-blue-600' },
    { value: 'leave', label: 'Leave', icon: AlertCircle, color: 'text-purple-600' },
  ];

  const presentCount = Object.values(attendance).filter((s) => s === 'present').length;
  const absentCount = Object.values(attendance).filter((s) => s === 'absent').length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mark Attendance</h1>
          <p className="text-gray-600 text-sm mt-1">Date: {new Date(selectedDate).toLocaleDateString()}</p>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded-lg p-2"
        />
      </div>

      {submitted && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          ✓ Attendance submitted successfully!
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Students</p>
          <p className="text-2xl font-bold text-gray-900">{students.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow border border-green-200">
          <p className="text-gray-600 text-sm">Present</p>
          <p className="text-2xl font-bold text-green-600">{presentCount}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow border border-red-200">
          <p className="text-gray-600 text-sm">Absent</p>
          <p className="text-2xl font-bold text-red-600">{absentCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-600">Loading students...</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Roll No.</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Class</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.rollNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.class}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          {statusOptions.map(({ value, label, icon: Icon, color }) => (
                            <button
                              key={value}
                              onClick={() => handleAttendanceChange(student.id, value)}
                              className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                                attendance[student.id] === value
                                  ? 'bg-gray-200'
                                  : 'bg-gray-100 hover:bg-gray-150'
                              }`}
                              title={label}
                            >
                              <Icon size={16} className={color} />
                              <span className="text-xs hidden sm:inline">{label}</span>
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 flex justify-end gap-4">
              <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Clear
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:bg-gray-400"
              >
                <Save size={20} />
                Submit Attendance
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
