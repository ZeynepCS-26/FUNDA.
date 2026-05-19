import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';

export const AboutAdmin = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'about', 'whoami'), (docSnap) => {
            if (docSnap.exists()) {
                setContent(docSnap.data().content);
            }
            setLoading(false);
        }, (error) => handleFirestoreError(error, OperationType.GET, 'about/whoami'));
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, 'about', 'whoami'), { content }, { merge: true });
            alert("Saved successfully!");
        } catch (error) {
            console.error("Failed to save about:", error);
            alert("Failed to save. Make sure you have the right permissions.");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2 className="text-3xl font-medium tracking-tight mb-8">About (Who Am I) Management</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Who Am I Content</label>
                    <textarea 
                        className="w-full border p-4 bg-transparent text-sm h-64" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-clay text-white px-6 py-3 text-sm rounded-sm">Save Changes</button>
            </form>
        </div>
    );
};
