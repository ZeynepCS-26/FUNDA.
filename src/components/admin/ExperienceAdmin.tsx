import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, setDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { PORTFOLIO_CONTENT } from '../../data/content';

interface Experience {
  id: string;
  role: string;
  organization: string;
  description: string;
  order: number;
}

export const ExperienceAdmin = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [restoring, setRestoring] = useState(false);
    
    const [formData, setFormData] = useState({
      role: '',
      organization: '',
      description: '',
      order: 0
    });

    useEffect(() => {
        let isMounted = true;
        const q = query(collection(db, 'experience'), orderBy('order', 'asc'));
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            if (!isMounted) return;
            
            let data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Experience));
            
            if (data.length === 0) {
                try {
                    const { PORTFOLIO_CONTENT } = await import('../../data/content');
                    data = PORTFOLIO_CONTENT.experience.map((exp, i) => ({
                        id: `exp_default_${i}`,
                        role: exp.role,
                        organization: exp.organization,
                        description: exp.description,
                        order: i
                    }));
                } catch (e) {
                    console.error(e);
                }
            }

            setExperiences(data);
            setLoading(false);
        }, (error) => handleFirestoreError(error, OperationType.LIST, 'experience'));
        return () => {
            isMounted = false;
            unsubscribe();
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = editingId || Date.now().toString();
        try {
            await setDoc(doc(db, 'experience', id), {
                role: formData.role,
                organization: formData.organization,
                description: formData.description,
                order: Number(formData.order)
            }, { merge: true });
            setEditingId(null);
            setFormData({ role: '', organization: '', description: '', order: 0 });
            alert("Experience saved successfully!");
        } catch (error) {
            console.error("Failed to save experience:", error);
            alert("Failed to save. Make sure you have the right permissions.");
        }
    };

    const handleEdit = (exp: Experience) => {
        setEditingId(exp.id);
        setFormData({
            role: exp.role,
            organization: exp.organization,
            description: exp.description,
            order: exp.order ?? 0
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if(confirm('Are you sure?')) {
            try {
                await deleteDoc(doc(db, 'experience', id));
            } catch (error) {
                handleFirestoreError(error, OperationType.DELETE, `experience/${id}`);
            }
        }
    };

    const handleRestoreDefaults = async () => {
        if(!confirm('This will load the original experiences back into the list. Continue?')) return;
        setRestoring(true);
        try {
            for (let i = 0; i < PORTFOLIO_CONTENT.experience.length; i++) {
                const exp = PORTFOLIO_CONTENT.experience[i];
                await setDoc(doc(db, 'experience', `exp_default_${i}`), {
                    role: exp.role,
                    organization: exp.organization,
                    description: exp.description,
                    order: i
                });
            }
            alert('Restored defaults successfully!');
        } catch (error) {
            handleFirestoreError(error, OperationType.WRITE, `experience/restore`);
        } finally {
            setRestoring(false);
        }
    };

    if (loading) return <div>Loading experiences...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-medium tracking-tight">Experience Management</h2>
                <button 
                    onClick={handleRestoreDefaults}
                    disabled={restoring}
                    className="border border-charcoal/20 px-4 py-2 text-sm rounded-sm hover:bg-black/5"
                >
                    {restoring ? 'Restoring...' : 'Restore Default Experiences'}
                </button>
            </div>
            
            <form onSubmit={handleSubmit} className="mb-12 bg-white dark:bg-charcoal-light p-6 border border-charcoal/10 dark:border-alabaster/10 rounded-sm space-y-4">
                <h3 className="text-xl font-medium mb-4">{editingId ? 'Edit Experience' : 'Add New Experience'}</h3>
                <div className="grid grid-cols-2 gap-4">
                    <input className="border p-2 bg-transparent text-sm" placeholder="Role" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required />
                    <input className="border p-2 bg-transparent text-sm" placeholder="Organization" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} required />
                </div>
                <textarea className="border p-2 bg-transparent text-sm w-full" rows={3} placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
                <div className="w-1/2">
                    <input className="border p-2 bg-transparent text-sm w-full" type="number" placeholder="Order" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} required />
                </div>
                <div className="flex gap-2">
                    <button type="submit" className="bg-clay text-white px-4 py-2 text-sm">Save Experience</button>
                    {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({role: '', organization: '', description: '', order: 0})}} className="border px-4 py-2 text-sm">Cancel</button>}
                </div>
            </form>

            <div className="space-y-4">
                {experiences.map(exp => (
                    <div key={exp.id} className="border p-4 flex justify-between items-center rounded-sm">
                        <div>
                            <h4 className="font-medium text-lg">{exp.role}</h4>
                            <p className="text-sm opacity-70 mb-2">{exp.organization}</p>
                            <p className="text-sm font-mono opacity-80">{exp.description}</p>
                        </div>
                        <div className="flex gap-2 shrink-0 ml-4">
                            <button onClick={() => handleEdit(exp)} className="text-sm hover:underline">Edit</button>
                            <button onClick={() => handleDelete(exp.id)} className="text-sm text-red-500 hover:underline">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

