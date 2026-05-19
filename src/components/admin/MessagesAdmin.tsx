import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';

export const MessagesAdmin = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      setLoading(false);
    }, (error) => {
      console.error(error);
      handleFirestoreError(error, OperationType.LIST, 'messages');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleToggleRead = async (id: string, currentReadStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'messages', id), {
        read: !currentReadStatus
      });
    } catch (error) {
      console.error(error);
      handleFirestoreError(error, OperationType.UPDATE, `messages/${id}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'messages', id));
      } catch (error) {
        console.error(error);
        handleFirestoreError(error, OperationType.DELETE, `messages/${id}`);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-3xl font-medium tracking-tight mb-8">Messages</h2>
      
      {messages.length === 0 ? (
        <p className="text-charcoal/60 dark:text-alabaster/60">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`p-6 border rounded-sm flex flex-col md:flex-row gap-6 ${
                msg.read 
                  ? 'border-charcoal/10 dark:border-alabaster/10 opacity-70' 
                  : 'border-clay dark:border-sage bg-clay/5 dark:bg-sage/5'
              }`}
            >
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{msg.email}</h3>
                    <p className="text-sm font-mono text-charcoal/60 dark:text-alabaster/60">
                      {msg.createdAt?.toDate ? new Date(msg.createdAt.toDate()).toLocaleString() : 'Just now'}
                    </p>
                  </div>
                  {!msg.read && (
                    <span className="bg-clay text-white text-xs px-2 py-1 rounded-sm uppercase tracking-wider">New</span>
                  )}
                </div>
                <p className="whitespace-pre-wrap">{msg.topic}</p>
              </div>
              
              <div className="flex md:flex-col gap-2 justify-start md:justify-center">
                <button
                  onClick={() => handleToggleRead(msg.id, msg.read)}
                  className="px-4 py-2 border border-charcoal/20 dark:border-alabaster/20 rounded-sm text-sm hover:bg-neutral-100 dark:hover:bg-charcoal/50 whitespace-nowrap"
                >
                  {msg.read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="px-4 py-2 text-red-500 border border-red-500/20 rounded-sm text-sm hover:bg-red-50 dark:hover:bg-red-500/10 whitespace-nowrap"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
