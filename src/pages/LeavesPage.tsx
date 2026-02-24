import { useEffect, useState } from 'react';
import { leaveService } from '../services/api';
import type { LeaveApplication } from '../types';
import { CheckCircle, XCircle, Clock, Plus } from 'lucide-react';

export const LeavesPage = () => {
  const [leaves, setLeaves] = useState<LeaveApplication[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  useEffect(() => {
    loadLeaves();
  }, [filter]);

  const loadLeaves = async () => {
    setLoading(true);
    try {
      const response = await leaveService.getApplications(
        filter === 'all' ? undefined : filter
      );
      setLeaves(response.data);
    } catch (error) {
      console.error('Failed to load leave applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await leaveService.apply(formData);
      setFormData({ startDate: '', endDate: '', reason: '' });
      setShowAddForm(false);
      loadLeaves();
    } catch (error) {
      console.error('Failed to apply leave:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 border-green-200';
      case 'rejected':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Leave Applications</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Apply Leave
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleApplyLeave} className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">Reason</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full border rounded-lg p-2"
                rows={4}
                placeholder="Enter reason for leave"
                required
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Submit Application
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

      <div className="flex gap-4 mb-6">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
            Loading leave applications...
          </div>
        ) : leaves.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
            No leave applications found
          </div>
        ) : (
          leaves.map((leave) => (
            <div
              key={leave.id}
              className={`bg-white p-6 rounded-lg shadow border-l-4 ${getStatusColor(leave.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(leave.status)}
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {new Date(leave.startDate).toLocaleDateString()} to{' '}
                      {new Date(leave.endDate).toLocaleDateString()}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Reason:</span> {leave.reason}
                  </p>
                  <div className="mt-2 text-sm text-gray-500">
                    Applied on: {new Date(leave.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${
                      leave.status === 'approved'
                        ? 'bg-green-600'
                        : leave.status === 'rejected'
                        ? 'bg-red-600'
                        : 'bg-yellow-600'
                    }`}
                  >
                    {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
