import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, setDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';

interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  imageUrl?: string;
  isActive: boolean;
  order: number;
}

export const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    role: '',
    imageUrl: '',
    isActive: true,
    order: 0
  });

  useEffect(() => {
    let isMounted = true;
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (!isMounted) return;
      
      let data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Project));
      
      // If Firestore is completely empty, show the default projects for editing
      if (data.length === 0) {
        try {
          const { PORTFOLIO_CONTENT } = await import('../../data/content');
          data = PORTFOLIO_CONTENT.projects.map((p, index) => ({
            id: `default-${index}`,
            title: p.title,
            description: p.description,
            role: p.role,
            imageUrl: '',
            isActive: true,
            order: index
          }));
        } catch (e) {
          console.error(e);
        }
      }

      setProjects(data);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'projects'));
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleImportDefaults = async () => {
    try {
      const { PORTFOLIO_CONTENT } = await import('../../data/content');
      let importedCount = 0;
      for (let i = 0; i < PORTFOLIO_CONTENT.projects.length; i++) {
        const p = PORTFOLIO_CONTENT.projects[i];
        await setDoc(doc(db, 'projects', `default-${i}`), {
          title: p.title,
          description: p.description,
          role: p.role,
          isActive: true, // we don't set imageUrl to null so merge: true keeps it
          order: i
        }, { merge: true });
        importedCount++;
      }
      alert(`${importedCount} default projects restored!`);
    } catch (error: any) {
      console.error("Import failed", error);
      alert("Import failed: " + (error.message || 'Unknown error'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingId || Date.now().toString();
    try {
      await setDoc(doc(db, 'projects', id), {
        title: formData.title,
        description: formData.description,
        role: formData.role,
        imageUrl: formData.imageUrl || null,
        isActive: formData.isActive,
        order: Number(formData.order)
      }, { merge: true });
      setEditingId(null);
      setFormData({ title: '', description: '', role: '', imageUrl: '', isActive: true, order: 0 });
      alert("Project saved successfully!");
    } catch (error) {
      console.error("Failed to save project:", error);
      alert("Failed to save. Make sure you have the right permissions.");
    }
  };

  const handleEdit = (p: Project) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      description: p.description,
      role: p.role,
      imageUrl: p.imageUrl || '',
      isActive: p.isActive,
      order: p.order ?? 0
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-medium tracking-tight">Projects Management</h2>
        <button type="button" onClick={handleImportDefaults} className="border px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-charcoal/50">
            Restore Missing Defaults
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-12 bg-white dark:bg-charcoal-light p-6 border border-charcoal/10 dark:border-alabaster/10 rounded-sm space-y-4">
        <h3 className="text-xl font-medium mb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-2 bg-transparent text-sm" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          <input className="border p-2 bg-transparent text-sm" placeholder="Role" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required />
        </div>
        <textarea className="border p-2 bg-transparent text-sm w-full" rows={3} placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-2 bg-transparent text-sm" placeholder="Image URL (optional)" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
          <input className="border p-2 bg-transparent text-sm" type="number" placeholder="Order" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} required />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="isActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} />
          <label htmlFor="isActive" className="text-sm">Is Active?</label>
        </div>
        <div className="flex gap-2">
            <button type="submit" className="bg-clay text-white px-4 py-2 text-sm">Save Project</button>
            {editingId && <button type="button" onClick={() => {setEditingId(null); setFormData({title: '', description: '', role: '', imageUrl: '', isActive: true, order: 0})}} className="border px-4 py-2 text-sm">Cancel</button>}
        </div>
      </form>

      <div className="space-y-4">
        {projects.map(p => (
          <div key={p.id} className="border p-4 flex justify-between items-center rounded-sm">
            <div>
              <h4 className="font-medium flex items-center gap-2">
                  {p.title} 
                  {!p.isActive && <span className="text-xs text-clay border border-clay px-2 rounded-full">Upcoming</span>}
              </h4>
              <p className="text-sm opacity-70">{p.role}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="text-sm hover:underline">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="text-sm text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
