import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export const WhoAmI = () => {
  const [content, setContent] = useState(
    "I am a Full-Stack System Architect and aspiring Machine Learning Engineer focused on the intersection of deep algorithmic logic and minimalist interactive design. Currently in my 4th year of Computer Science at Dokuz Eylül University and serving as President of the CS-AI Community, I design scalable digital ecosystems. From architecting production-ready data schemas to engineering machine learning solutions, I build stable environments where complex systems operate seamlessly behind effortless interfaces."
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'about', 'whoami'), (docSnap) => {
      if (docSnap.exists()) {
        setContent(docSnap.data().content);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12" id="about">
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 md:mb-8">Who Am I</h2>
      <p className="text-base sm:text-lg md:text-xl text-charcoal/80 dark:text-alabaster/80 leading-relaxed max-w-2xl">
        {content}
      </p>
    </section>
  );
};
