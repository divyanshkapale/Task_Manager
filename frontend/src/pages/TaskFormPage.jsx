import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-hot-toast';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const TaskFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        dueDate: ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            const fetchTask = async () => {
                try {
                    const { data } = await API.get(`/tasks`);
                    const task = data.find(t => t._id === id); // Simpler than fetching single if we don't have getSingle endpoint active or populated
                    // Wait, I did implement GET /api/tasks (list) and PUT /api/tasks/:id. 
                    // I didn't explicitly check if I implemented GET /api/tasks/:id?
                    // Checking taskController.js... 
                    // I implemented `getTasks` (list) and `updateTask` (PUT) and `deleteTask` (DELETE).
                    // I did NOT implement `getTaskById`! 
                    // So I should fetch all list then find it, or impl that endpoint.
                    // Fetching all is fine for now as it's cached/fast for small scale.
                    // Actually, let's just use the list from the dashboard in a real app (context), but here separate fetch is safe.
                    if (task) {
                        setFormData({
                            title: task.title,
                            description: task.description,
                            status: task.status,
                            priority: task.priority,
                            dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
                        });
                    }
                } catch (error) {
                    toast.error('Could not fetch task details');
                    navigate('/');
                }
            };
            fetchTask();
        }
    }, [id, isEdit, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdit) {
                await API.put(`/tasks/${id}`, formData);
                toast.success('Task updated successfully!');
            } else {
                await API.post('/tasks', formData);
                toast.success('Task created successfully!');
            }
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition"
            >
                <FiArrowLeft className="mr-2" /> Back to Dashboard
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <p className="text-gray-500 mt-1">
                        {isEdit ? 'Update your task details below' : 'Fill in the information to create a new task'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
                            placeholder="e.g., Complete Project Report"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
                            placeholder="Add details about the task..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                name="status"
                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition bg-white"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                            <select
                                name="priority"
                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition bg-white"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                            <input
                                type="date"
                                name="dueDate"
                                className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white px-8 py-3 rounded-xl font-medium hover:from-brand-700 hover:to-brand-600 transition shadow-lg shadow-brand-500/30 disabled:opacity-70"
                        >
                            <FiSave />
                            {loading ? 'Saving...' : 'Save Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskFormPage;
