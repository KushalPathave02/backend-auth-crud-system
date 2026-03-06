import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { LogOut, CheckCircle, Clock, ListChecks, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user, logout } = useAuth();

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
          <ListChecks className="text-blue-600 w-8 h-8" />
          <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{user?.role}</p>
          </div>
          <button 
            onClick={logout}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">My Assigned Tasks</h2>
          <p className="text-gray-500">You have {tasks.length} tasks to complete</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center space-x-2 border border-red-100">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300">
              <ListChecks className="mx-auto w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No tasks assigned to you yet.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    task.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                    task.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{task.title}</h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">{task.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-xs text-gray-400">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    {task.status === 'PENDING' && (
                      <button 
                        onClick={() => handleStatusUpdate(task._id, 'IN_PROGRESS')}
                        className="flex items-center space-x-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-md hover:bg-yellow-100 transition-colors text-xs font-bold"
                      >
                        <Clock className="w-4 h-4" />
                        <span>Start</span>
                      </button>
                    )}
                    {task.status !== 'COMPLETED' && (
                      <button 
                        onClick={() => handleStatusUpdate(task._id, 'COMPLETED')}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors text-xs font-bold"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Complete</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
