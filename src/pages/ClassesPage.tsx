import { useEffect, useState } from 'react';
import { classService } from '../services/api';
import type { Class } from '../types';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const ClassesPage = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    section: '',
    teacherId: '',
  });

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    setLoading(true);
    try {
      const response = await classService.getAll();
      setClasses(response.data);
    } catch (error) {
      console.error('Failed to load classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await classService.create(formData);
      setFormData({ name: '', section: '', teacherId: '' });
      setShowAddForm(false);
      loadClasses();
    } catch (error) {
      console.error('Failed to add class:', error);
    }
  };

  const handleDeleteClass = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await classService.delete(id);
        loadClasses();
      } catch (error) {
        console.error('Failed to delete class:', error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Classes</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Class
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddClass} className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Class</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Class Name (e.g., 10A)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border rounded-lg p-2"
              required
            />
            <input
              type="text"
              placeholder="Section (e.g., A, B)"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              className="border rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Teacher ID"
              value={formData.teacherId}
              onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
              className="border rounded-lg p-2"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Save Class
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-600">Loading classes...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Class Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Section</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Teacher ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((classItem) => (
                  <tr key={classItem.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{classItem.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{classItem.section}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{classItem.teacherId}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-700 p-1">
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClass(classItem.id)}
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
