import { Outlet, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, loginWithGoogle, logout } from '../../lib/firebase';

export const AdminLayout = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-alabaster dark:bg-charcoal text-charcoal dark:text-alabaster">Loading...</div>;
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-alabaster dark:bg-charcoal text-charcoal dark:text-alabaster">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-8">Admin Access</h1>
                    <button 
                        onClick={loginWithGoogle}
                        className="bg-clay text-white px-8 py-4 rounded-sm text-sm"
                    >
                        Login with Google
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-alabaster dark:bg-charcoal text-charcoal dark:text-alabaster">
            <aside className="w-64 border-r border-charcoal/10 dark:border-alabaster/10 p-8 flex flex-col">
                <h1 className="text-xl font-bold mb-12">FUNDA. ADMIN</h1>
                <nav className="flex flex-col gap-4 text-sm font-medium flex-1">
                    <NavLink to="/admin" end className={({isActive}) => isActive ? "text-clay" : "hover:text-clay"}>Dashboard</NavLink>
                    <NavLink to="/admin/projects" className={({isActive}) => isActive ? "text-clay" : "hover:text-clay"}>Projects</NavLink>
                    <NavLink to="/admin/about" className={({isActive}) => isActive ? "text-clay" : "hover:text-clay"}>About</NavLink>
                    <NavLink to="/admin/experience" className={({isActive}) => isActive ? "text-clay" : "hover:text-clay"}>Experience</NavLink>
                    <NavLink to="/admin/messages" className={({isActive}) => isActive ? "text-clay" : "hover:text-clay"}>Messages</NavLink>
                    <NavLink to="/admin/config" className={({isActive}) => isActive ? "text-clay" : "hover:text-clay"}>Config</NavLink>
                </nav>
                <div className="mt-8 pt-8 border-t border-charcoal/10 dark:border-alabaster/10">
                    <p className="text-xs text-charcoal/60 dark:text-alabaster/60 mb-4 truncate">{user.email}</p>
                    <button onClick={logout} className="text-sm font-medium hover:text-clay text-left w-full">Logout</button>
                </div>
            </aside>
            <main className="flex-1 p-12 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};
