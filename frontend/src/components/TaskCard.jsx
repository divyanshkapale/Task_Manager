import { FiCalendar, FiEdit2, FiTrash2, FiClock, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const TaskCard = ({ task, onDelete }) => {
    const navigate = useNavigate();

    const statusColors = {
        'Pending': 'bg-gray-100 text-gray-700',
        'In Progress': 'bg-blue-100 text-blue-700',
        'Completed': 'bg-green-100 text-green-700',
    };

    const priorityColors = {
        'Low': 'bg-slate-100 text-slate-700',
        'Medium': 'bg-orange-100 text-orange-700',
        'High': 'bg-red-100 text-red-700',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow group relative">
            <div className="flex justify-between items-start mb-3">
                <span className={clsx('px-2.5 py-0.5 rounded-full text-xs font-medium', priorityColors[task.priority])}>
                    {task.priority}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => navigate(`/edit-task/${task._id}`)}
                        className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition"
                    >
                        <FiEdit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                        <FiTrash2 size={16} />
                    </button>
                </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1 leading-snug">{task.title}</h3>

            <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[2.5em]">
                {task.description || "No description provided."}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FiCalendar size={14} />
                    <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}</span>
                </div>

                <span className={clsx('flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium', statusColors[task.status])}>
                    {task.status === 'Completed' ? <FiAlertCircle className="rotate-180" size={12} /> : <FiClock size={12} />}
                    {task.status}
                </span>
            </div>
        </div>
    );
};

export default TaskCard;
