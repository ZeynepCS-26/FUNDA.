import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export const WhoAmI = () => {
  const [content, setContent] = useState(
    "I am a Defensive Cybersecurity Specialist and Systems Engineer specializing in Linux, Windows, and macOS enterprise environments. Utilizing technologies such as Microsoft Defender for Cloud and Azure security suites, I engineer hardened system architectures, implement proactive DoS mitigation protocols, and execute robust system administration to safeguard mission-critical infrastructures against evolving cyber threats."
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
