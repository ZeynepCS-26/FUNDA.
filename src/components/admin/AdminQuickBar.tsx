import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, isAuthorizedAdmin } from '../../lib/firebase';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const AdminQuickBar: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isAuthorizedAdmin(user.email)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!isAdmin) return null;

  return (
    <aside 
      aria-label="Admin quick access"
      className="fixed bottom-8 left-6 md:left-12 z-40 animate-fade-in"
    >
      <Link
        to="/admin"
        className="group flex items-center gap-2.5 bg-charcoal text-alabaster dark:bg-alabaster dark:text-charcoal px-4 py-2.5 rounded-full text-xs font-mono font-medium shadow-2xl hover:scale-105 border border-charcoal/20 dark:border-alabaster/20 transition-all backdrop-blur-md"
        title="Return to Admin Panel"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Admin Panel</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </aside>
  );
};

export default AdminQuickBar;
