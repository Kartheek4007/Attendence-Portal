export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  schoolId?: string;
  classId?: string;
  photo?: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  email: string;
  phone: string;
  photo?: string;
  schoolId: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'leave';
  remarks?: string;
  markedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Class {
  id: string;
  name: string;
  section: string;
  schoolId: string;
  teacherId: string;
}

export interface AttendanceStats {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  halfDayToday: number;
  leaveToday: number;
  attendancePercentage: number;
}

export interface LeaveApplication {
  id: string;
  studentId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  createdAt: string;
}

export interface ReportData {
  studentName: string;
  rollNumber: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  halfDays: number;
  leaveDays: number;
  attendancePercentage: number;
}
