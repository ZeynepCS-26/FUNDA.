import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';

export const ConfigAdmin = () => {
    const [resumeUrl, setResumeUrl] = useState('https://drive.google.com/file/d/1218xc2x2GOhihEKooGNznU3u8UsKerQy/view?usp=sharing');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'config', 'global'), (docSnap) => {
            if (docSnap.exists()) {
                setResumeUrl(docSnap.data().resumeUrl);
            }
            setLoading(false);
        }, (error) => handleFirestoreError(error, OperationType.GET, 'config/global'));
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, 'config', 'global'), { resumeUrl }, { merge: true });
            alert("Saved successfully!");
        } catch (error) {
            console.error("Failed to save:", error);
            alert("Failed to save. Make sure you are logged in as admin!");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2 className="text-3xl font-medium tracking-tight mb-8">Global Configuration</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                    <label className="block text-sm font-medium mb-2">Resume PDF URL</label>
                    <input 
                        type="url"
                        className="w-full border p-3 bg-transparent text-sm" 
                        value={resumeUrl} 
                        onChange={(e) => setResumeUrl(e.target.value)}
                        placeholder="https://example.com/resume.pdf"
                        required
                    />
                </div>
                <button type="submit" className="bg-clay text-white px-6 py-3 text-sm rounded-sm">Save Changes</button>
            </form>
        </div>
    );
};
