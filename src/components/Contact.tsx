import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export const Contact = () => {
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !topic) return;

    setStatus('loading');
    try {
      await addDoc(collection(db, 'messages'), {
        email,
        topic,
        createdAt: serverTimestamp(),
        read: false
      });
      setStatus('success');
      setEmail('');
      setTopic('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      try {
        handleFirestoreError(error, OperationType.CREATE, 'messages');
      } catch (err) {}
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12" id="contact">
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-8 md:mb-16">LET'S BUILD SOMETHING</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 md:space-y-8">
        <div>
          <label className="block text-sm font-mono mb-2">EMAIL</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border-b border-charcoal dark:border-alabaster py-2 focus:outline-none dark:placeholder-alabaster/60" 
            placeholder="your@email.com" 
            disabled={status === 'loading'}
          />
        </div>
        <div>
          <label className="block text-sm font-mono mb-2">TOPIC</label>
          <textarea 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="w-full bg-transparent border-b border-charcoal dark:border-alabaster py-2 focus:outline-none dark:placeholder-alabaster/60" 
            rows={4} 
            placeholder="What are we building?" 
            disabled={status === 'loading'}
          />
        </div>
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="bg-clay text-white px-8 py-4 rounded-sm disabled:opacity-50 transition-opacity"
        >
          {status === 'loading' ? 'SENDING...' : status === 'success' ? 'SENT!' : 'SEND MESSAGE'}
        </button>
        {status === 'error' && (
          <p className="text-red-500 text-sm mt-2">Failed to send message. Please try again.</p>
        )}
      </form>
    </section>
  );
};