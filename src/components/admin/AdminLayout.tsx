import { Outlet, NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, loginWithGoogle, logout, ADMIN_EMAIL, isAuthorizedAdmin } from '../../lib/firebase';
import { ShieldAlert, ShieldCheck, Lock, LogOut, ArrowLeft, AlertTriangle } from 'lucide-react';

export const AdminLayout = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            // Strict check against system owner email
            if (isAuthorizedAdmin(currentUser.email)) {
                setIsAdmin(true);
                setLoading(false);
                return;
            }

            // Check if UID is listed in admins collection
            try {
                const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
                if (adminDoc.exists()) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (err) {
                console.warn('Admin authorization verification failed:', err);
                setIsAdmin(false);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        setLoginLoading(true);
        setErrorMsg(null);
        try {
            await loginWithGoogle();
        } catch (err: any) {
            setErrorMsg(err?.message || 'Login failed. Please try again.');
        } finally {
            setLoginLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-alabaster dark:bg-charcoal text-charcoal dark:text-alabaster font-mono text-sm">
                <div className="w-8 h-8 border-2 border-clay border-t-transparent rounded-full animate-spin mb-4" />
                <span>Verifying administrator credentials...</span>
            </div>
        );
    }

    // State 1: Unauthenticated
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-alabaster dark:bg-charcoal text-charcoal dark:text-alabaster px-4">
                <div className="w-full max-w-md p-8 border border-charcoal/10 dark:border-alabaster/10 rounded-2xl bg-white/50 dark:bg-black/40 backdrop-blur-md shadow-2xl text-center">
                    <div className="w-14 h-14 rounded-2xl bg-clay/10 border border-clay/20 text-clay flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight mb-2">Restricted Admin Access</h1>
                    <p className="text-xs sm:text-sm text-charcoal/70 dark:text-alabaster/70 mb-6 leading-relaxed">
                        This administrative console is restricted solely to the system administrator (<span className="font-mono text-clay font-medium">{ADMIN_EMAIL}</span>).
                    </p>

                    {errorMsg && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-lg flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    <button 
                        onClick={handleLogin}
                        disabled={loginLoading}
                        className="w-full bg-clay hover:bg-clay/90 text-white font-medium py-3 px-6 rounded-xl text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer mb-4"
                    >
                        {loginLoading ? 'Authenticating...' : 'Sign in with Google'}
                    </button>

                    <Link 
                        to="/"
                        className="inline-flex items-center gap-2 text-xs font-mono text-charcoal/60 dark:text-alabaster/60 hover:text-charcoal dark:hover:text-alabaster transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Return to Portfolio</span>
                    </Link>
                </div>
            </div>
        );
    }

    // State 2: Authenticated but NOT authorized (Unauthorized Account)
    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-alabaster dark:bg-charcoal text-charcoal dark:text-alabaster px-4">
                <div className="w-full max-w-lg p-8 border border-red-500/30 rounded-2xl bg-red-500/5 dark:bg-red-950/20 backdrop-blur-md shadow-2xl text-center">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="w-8 h-8" />
                    </div>
                    
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20 mb-3">
                        403 · Access Denied
                    </span>

                    <h1 className="text-2xl font-bold tracking-tight mb-2">Yetkisiz Erişim / Unauthorized</h1>
                    
                    <p className="text-xs sm:text-sm text-charcoal/80 dark:text-alabaster/80 mb-4 leading-relaxed">
                        Bu yönetim paneline sadece sistem sahibi (<span className="font-mono text-clay font-medium">{ADMIN_EMAIL}</span>) erişebilir.
                    </p>
                    
                    <div className="p-3 bg-black/10 dark:bg-white/5 border border-charcoal/10 dark:border-alabaster/10 rounded-lg text-xs font-mono text-charcoal/70 dark:text-alabaster/70 mb-6 truncate">
                        Oturum açılan hesap: <strong className="text-red-500">{user.email || 'Bilinmiyor'}</strong>
                    </div>

                    <p className="text-xs text-charcoal/60 dark:text-alabaster/60 mb-6">
                        Güvenlik sebebiyle yönetim araçlarına ve veritabanı işlemlerine erişiminiz engellenmiştir.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button 
                            onClick={logout}
                            className="inline-flex items-center justify-center gap-2 bg-charcoal dark:bg-alabaster text-alabaster dark:text-charcoal px-5 py-2.5 rounded-xl text-xs font-mono font-medium hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Farklı Hesapla Giriş Yap</span>
                        </button>
                        <Link 
                            to="/"
                            className="inline-flex items-center justify-center gap-2 border border-charcoal/20 dark:border-alabaster/20 px-5 py-2.5 rounded-xl text-xs font-mono hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Ana Sayfaya Dön</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // State 3: Authenticated AND Verified Administrator
    return (
        <div className="flex min-h-screen bg-alabaster dark:bg-charcoal text-charcoal dark:text-alabaster">
            <aside className="w-64 border-r border-charcoal/10 dark:border-alabaster/10 p-8 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-xl font-bold tracking-tight">FUNDA. ADMIN</h1>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-mono mb-8">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified Admin</span>
                    </div>

                    <nav className="flex flex-col gap-3 text-sm font-medium">
                        <NavLink to="/admin" end className={({isActive}) => isActive ? "text-clay font-semibold" : "hover:text-clay text-charcoal/70 dark:text-alabaster/70 transition-colors"}>Dashboard</NavLink>
                        <NavLink to="/admin/projects" className={({isActive}) => isActive ? "text-clay font-semibold" : "hover:text-clay text-charcoal/70 dark:text-alabaster/70 transition-colors"}>Projects</NavLink>
                        <NavLink to="/admin/about" className={({isActive}) => isActive ? "text-clay font-semibold" : "hover:text-clay text-charcoal/70 dark:text-alabaster/70 transition-colors"}>About</NavLink>
                        <NavLink to="/admin/experience" className={({isActive}) => isActive ? "text-clay font-semibold" : "hover:text-clay text-charcoal/70 dark:text-alabaster/70 transition-colors"}>Experience</NavLink>
                        <NavLink to="/admin/messages" className={({isActive}) => isActive ? "text-clay font-semibold" : "hover:text-clay text-charcoal/70 dark:text-alabaster/70 transition-colors"}>Messages</NavLink>
                        <NavLink to="/admin/config" className={({isActive}) => isActive ? "text-clay font-semibold" : "hover:text-clay text-charcoal/70 dark:text-alabaster/70 transition-colors"}>Config</NavLink>
                    </nav>
                </div>

                <div className="pt-6 border-t border-charcoal/10 dark:border-alabaster/10">
                    <div className="mb-4">
                        <span className="text-[10px] font-mono text-charcoal/50 dark:text-alabaster/50 uppercase tracking-wider block mb-0.5">Admin Account</span>
                        <p className="text-xs text-charcoal/80 dark:text-alabaster/80 font-mono truncate">{user.email}</p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <Link 
                            to="/" 
                            className="inline-flex items-center gap-2 text-xs font-mono text-charcoal/60 dark:text-alabaster/60 hover:text-charcoal dark:hover:text-alabaster transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>View Live Site</span>
                        </Link>
                        <button 
                            onClick={logout} 
                            className="inline-flex items-center gap-2 text-xs font-mono text-red-500 hover:text-red-600 transition-colors text-left cursor-pointer"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>
            <main className="flex-1 p-10 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

