import { useEffect, useState } from 'react';
import API from '../services/api';
import TaskCard from '../components/TaskCard';
import { FiPlus, FiFilter, FiCheckCircle, FiClock, FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const { data } = await API.get('/tasks');
            setTasks(data);
        } catch (error) {
            toast.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await API.delete(`/tasks/${id}`);
                setTasks(tasks.filter(t => t._id !== id));
                toast.success('Task deleted');
            } catch (error) {
                toast.error('Failed to delete task');
            }
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        return task.status === filter;
    });

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'Completed').length,
        pending: tasks.filter(t => t.status === 'Pending').length,
        inProgress: tasks.filter(t => t.status === 'In Progress').length
    };

    if (loading) return (
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your tasks.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard title="Total Tasks" value={stats.total} icon={<FiCheckCircle />} color="bg-blue-50 text-blue-600" />
                <StatCard title="Completed" value={stats.completed} icon={<FiCheckCircle />} color="bg-green-50 text-green-600" />
                <StatCard title="In Progress" value={stats.inProgress} icon={<FiClock />} color="bg-yellow-50 text-yellow-600" />
                <StatCard title="Pending" value={stats.pending} icon={<FiAlertTriangle />} color="bg-gray-50 text-gray-600" />
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                    {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap",
                                filter === status
                                    ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            {status}
                        </button>
                    ))}
                </div>
                <Link to="/add-task" className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-brand-700 hover:to-brand-600 transition shadow-md shadow-brand-500/20 whitespace-nowrap">
                    <FiPlus /> New Task
                </Link>
            </div>

            {/* Task Grid */}
            {filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.map(task => (
                        <TaskCard key={task._id} task={task} onDelete={handleDelete} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                    <div className="mx-auto h-12 w-12 text-gray-300 mb-3">
                        <FiCheckCircle size={48} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
                    <p className="text-gray-500">Get started by creating a new task.</p>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={clsx("p-3 rounded-lg", color)}>
            {icon}
        </div>
    </div>
);

export default Dashboard;
