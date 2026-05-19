import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { PORTFOLIO_CONTENT } from "../data/content";

interface ExperienceData {
  id: string;
  role: string;
  organization: string;
  description: string;
  order: number;
}

export const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'experience'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ExperienceData));
        setExperiences(data);
      } else {
        // Fallback or empty empty
        setExperiences([]);
      }
      setLoading(false);
    }, (error) => {
        // In case of insufficient permissions or no connection, we can just fail silently on the frontend or log it.
        console.error("Failed to load experiences", error);
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const displayData = (() => {
      if (experiences.length === 0) return PORTFOLIO_CONTENT.experience;
      
      const firestoreRoles = experiences.map(e => e.role);
      const missingDefaults = PORTFOLIO_CONTENT.experience
          .filter(e => !firestoreRoles.includes(e.role))
          .map((e, i) => ({ ...e, id: `exp_default_${i}`, order: i }));
          
      return [...experiences, ...missingDefaults]
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  })();

  return (
    <section className="py-24 px-12 bg-pumice/30">
      <h2 className="text-4xl font-medium tracking-tight mb-16">Experience & Leadership</h2>
      <div className="space-y-12">
        {displayData.map((exp, i) => (
          <div key={i} className="flex gap-8 border-b border-charcoal/20 pb-8">
            <div className="w-1/3 flex flex-col">
              <span className="font-semibold text-charcoal">{exp.role}</span>
              <span className="text-sm font-mono text-clay">{exp.organization}</span>
            </div>
            <p className="w-2/3 text-charcoal/80 leading-relaxed max-w-xl">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
