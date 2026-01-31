import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


// I will use react-icons
import { FiLogOut, FiCheckSquare, FiPlus, FiUser } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-brand-600 tracking-tight hover:text-brand-700 transition">
                        <FiCheckSquare className="w-8 h-8" />
                        <span>TaskFlow</span>
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="hidden sm:block text-gray-600 font-medium">
                                Hi, {user.name}
                            </span>
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/add-task"
                                    className="flex items-center gap-1 bg-gradient-to-r from-brand-600 to-brand-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-brand-700 hover:to-brand-600 transition shadow-lg shadow-brand-500/30"
                                >
                                    <FiPlus /> New Task
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                    title="Logout"
                                >
                                    <FiLogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-gray-600 font-medium hover:text-brand-600 transition">Login</Link>
                            <Link to="/register" className="bg-gradient-to-r from-brand-600 to-brand-500 text-white px-5 py-2 rounded-xl text-sm font-medium hover:from-brand-700 hover:to-brand-600 transition shadow-lg shadow-brand-500/30">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
