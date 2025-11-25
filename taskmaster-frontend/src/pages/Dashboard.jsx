import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import ConfirmModal from '../components/ConfirmModal';
import api from '../utils/api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: 'all', priority: 'all' });
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, task: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, filters]);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = [...tasks];

    if (filters.search) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    if (filters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    setFilteredTasks(filtered);
  };

  const handleCreateTask = async (formData) => {
    try {
      const { data } = await api.post('/tasks', formData);
      setTasks([data, ...tasks]);
      setShowForm(false);
    } catch (err) {
      console.error('Error creating task:', err);
      alert('Failed to create task');
    }
  };

  const handleUpdateTask = async (formData) => {
    try {
      const { data } = await api.put(`/tasks/${editingTask._id}`, formData);
      setTasks(tasks.map(task => task._id === data._id ? data : task));
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async () => {
    try {
      await api.delete(`/tasks/${deleteModal.task._id}`);
      setTasks(tasks.filter(task => task._id !== deleteModal.task._id));
      setDeleteModal({ isOpen: false, task: null });
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task');
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'todo' : 'completed';
      const { data } = await api.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks(tasks.map(t => t._id === data._id ? data : t));
    } catch (err) {
      console.error('Error toggling status:', err);
      alert('Failed to update task status');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const openDeleteModal = (task) => {
    setDeleteModal({ isOpen: true, task });
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'todo').length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status === 'todo').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-slideIn">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">My Tasks</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Manage and organize your tasks efficiently
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-2 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Task
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all animate-slideIn">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-blue-600">{totalTasks}</span>
            </div>
            <p className="text-gray-600 font-semibold">Total Tasks</p>
            <p className="text-sm text-gray-500 mt-1">All your tasks</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all animate-slideIn" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-green-600">{completedTasks}</span>
            </div>
            <p className="text-gray-600 font-semibold">Completed</p>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all" style={{width: `${completionRate}%`}}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{completionRate}% completion rate</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all animate-slideIn" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-orange-600">{pendingTasks}</span>
            </div>
            <p className="text-gray-600 font-semibold">Pending</p>
            <p className="text-sm text-gray-500 mt-1">Tasks in progress</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all animate-slideIn" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-red-600">{highPriorityTasks}</span>
            </div>
            <p className="text-gray-600 font-semibold">High Priority</p>
            <p className="text-sm text-gray-500 mt-1">Urgent tasks</p>
          </div>
        </div>

        {showForm && (
          <TaskForm
            task={editingTask}
            onSave={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={handleCancelForm}
          />
        )}

        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Tasks Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
          <div className="flex-1 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full opacity-20"></div>
          <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3">
              <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600 text-lg font-medium">Loading tasks...</p>
            </div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-12 text-center animate-fadeIn">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6 animate-pulse-slow">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {tasks.length === 0 ? 'No tasks yet!' : 'No tasks match your filters'}
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              {tasks.length === 0 ? 'Create your first task to get started on your journey' : 'Try adjusting your search or filters to find what you\'re looking for'}
            </p>
            {tasks.length === 0 && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 font-semibold mx-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Task
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={openDeleteModal}
                onToggle={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onConfirm={handleDeleteTask}
        onCancel={() => setDeleteModal({ isOpen: false, task: null })}
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
}
