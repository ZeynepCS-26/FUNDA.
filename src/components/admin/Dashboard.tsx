import { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { PORTFOLIO_CONTENT } from '../../data/content';

export const Dashboard = () => {
    const [migrating, setMigrating] = useState(false);

    const handleMigrate = async () => {
        if (!confirm("This will overwrite your existing Firestore data with the default content.ts data. Are you sure?")) return;
        setMigrating(true);
        try {
            // Migrate About
            await setDoc(doc(db, 'about', 'whoami'), {
                content: "I am a Full-Stack System Architect and aspiring Machine Learning Engineer focused on the intersection of deep algorithmic logic and minimalist interactive design. Currently in my 4th year of Computer Science at Dokuz Eylül University and serving as President of the CS-AI Community, I design scalable digital ecosystems. From architecting production-ready data schemas to engineering machine learning solutions, I build stable environments where complex systems operate seamlessly behind effortless interfaces."
            });

            // Migrate Projects
            for (let i = 0; i < PORTFOLIO_CONTENT.projects.length; i++) {
                const project = PORTFOLIO_CONTENT.projects[i];
                await setDoc(doc(db, 'projects', `proj${i}`), {
                    title: project.title,
                    description: project.description,
                    role: project.role,
                    imageUrl: null,
                    isActive: true,
                    order: i
                });
            }

            // Migrate Experience
            for (let i = 0; i < PORTFOLIO_CONTENT.experience.length; i++) {
                const exp = PORTFOLIO_CONTENT.experience[i];
                await setDoc(doc(db, 'experience', `exp${i}`), {
                    role: exp.role,
                    organization: exp.organization,
                    description: exp.description,
                    order: i
                });
            }

            // Migrate Config
            await setDoc(doc(db, 'config', 'global'), {
                resumeUrl: "https://drive.google.com/file/d/1218xc2x2GOhihEKooGNznU3u8UsKerQy/view?usp=sharing"
            });

            alert("Migration complete! Content is now loaded up in the Firestore Database.");
        } catch (error) {
            console.error("Migration failed", error);
            handleFirestoreError(error, OperationType.WRITE, 'migration');
        } finally {
            setMigrating(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-medium tracking-tight mb-8">Dashboard</h2>
            <p className="mb-8 max-w-xl">Welcome to the admin panel. Currently your Firestore database is connected. If you notice your sections are empty, use the button below to migrate the local static content over to the live cloud database.</p>

            <div className="bg-white dark:bg-charcoal-light border border-charcoal/10 dark:border-alabaster/10 p-6 rounded-sm max-w-xl">
                <h3 className="text-xl font-medium mb-4">Initialize Data</h3>
                <p className="text-sm opacity-80 mb-6">If your database is empty, you can initialize it with the default content from your code.</p>
                <button 
                    onClick={handleMigrate} 
                    disabled={migrating}
                    className="bg-clay text-white px-4 py-2 text-sm rounded-sm disabled:opacity-50"
                >
                    {migrating ? 'Loading Data...' : 'Load Content to Firestore'}
                </button>
            </div>
        </div>
    );
};
