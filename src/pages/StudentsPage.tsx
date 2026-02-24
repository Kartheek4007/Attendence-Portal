import { useEffect, useState } from 'react';
import { studentService } from '../services/api';
import type { Student } from '../types';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

export const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    class: '',
    section: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const response = await studentService.getAll();
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to load students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await studentService.create(formData);
      setFormData({
        name: '',
        rollNumber: '',
        class: '',
        section: '',
        email: '',
        phone: '',
      });
      setShowAddForm(false);
      loadStudents();
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.delete(id);
        loadStudents();
      } catch (error) {
        console.error('Failed to delete student:', error);
      }
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Students</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Student
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddStudent} className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border rounded-lg p-2"
              required
            />
            <input
              type="text"
              placeholder="Roll Number"
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
              className="border rounded-lg p-2"
              required
            />
            <input
              type="text"
              placeholder="Class"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              className="border rounded-lg p-2"
              required
            />
            <input
              type="text"
              placeholder="Section"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              className="border rounded-lg p-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border rounded-lg p-2"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border rounded-lg p-2"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Save Student
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-none outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-4 text-center text-gray-600">Loading students...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Roll Number</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Class</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{student.name}</td>
                    <td className="px-6 py-4 text-sm">{student.rollNumber}</td>
                    <td className="px-6 py-4 text-sm">{student.class}-{student.section}</td>
                    <td className="px-6 py-4 text-sm">{student.email}</td>
                    <td className="px-6 py-4 text-sm">{student.phone}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-700 p-1">
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
