import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { PORTFOLIO_CONTENT } from "../data/content";
import { EclipseCaseStudy } from "./EclipseCaseStudy";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  role: string;
  imageUrl?: string;
  isActive: boolean;
  order: number;
}

export const ProjectCaseStudy = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEclipseModalOpen, setIsEclipseModalOpen] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ProjectData));
                setProjects(data);
            } else {
                setProjects([]);
            }
            setLoading(false);
        }, (error) => {
            console.error("Failed to load projects", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const displayData = (() => {
        if (projects.length === 0) return PORTFOLIO_CONTENT.projects;
        
        // Combine Firestore projects with default projects if they are missing
        const firestoreTitles = projects.map(p => p.title);
        const missingDefaults = PORTFOLIO_CONTENT.projects
            .filter(p => !firestoreTitles.includes(p.title))
            .map((p, i) => ({ ...p, id: `default-${i}`, isActive: true, order: i }));
            
        return [...projects, ...missingDefaults]
            .filter(p => p.isActive)
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    })();

    const handleViewCaseStudy = (title: string) => {
        if (title.toLowerCase().includes("escape game") || title.toLowerCase().includes("eclipse") || title.toLowerCase().includes("test me dream")) {
            setIsEclipseModalOpen(true);
        } else {
            alert("Case study not available yet for this project.");
        }
    };

    return (
        <div className="space-y-4 md:space-y-12">
            {displayData.map((project, index) => (
                <section key={index} className="py-12 md:py-24 px-4 sm:px-6 md:px-12 bg-charcoal text-alabaster min-h-screen flex items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                        <div>
                            <span className="text-sage font-mono text-xs md:text-sm mb-2 md:mb-4 block">0{index + 1} / Featured Case Study</span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight mb-4 md:mb-8">{project.title}</h2>
                            <h3 className="text-lg sm:text-xl md:text-3xl font-light text-alabaster/70 mb-6 md:mb-12">{project.description.split('.')[0]}</h3>
                            <p className="text-sm sm:text-base md:text-lg text-alabaster/60 leading-relaxed max-w-lg mb-6 md:mb-8">{project.description}</p>
                            <button 
                                onClick={() => handleViewCaseStudy(project.title)}
                                className={
                                    (project.title.toLowerCase().includes("escape game") || project.title.toLowerCase().includes("eclipse") || project.title.toLowerCase().includes("test me dream")) 
                                    ? "bg-sage text-white px-8 py-4 rounded-sm text-sm hover:opacity-90 transition-colors inline-block" 
                                    : "border border-alabaster/20 text-alabaster/60 px-8 py-4 rounded-sm text-sm cursor-not-allowed inline-block"
                                }
                            >
                                {(project.title.toLowerCase().includes("escape game") || project.title.toLowerCase().includes("eclipse") || project.title.toLowerCase().includes("test me dream")) ? "View Case Study" : "Coming Soon"}
                            </button>
                        </div>
                        <div className="bg-charcoal/50 border border-alabaster/10 h-48 sm:h-64 md:h-96 flex items-center justify-center rounded-sm overflow-hidden mt-6 md:mt-0">
                            <img 
                                src={
                                    (project.title.toLowerCase().includes("teamlink")) ? "https://lh3.googleusercontent.com/d/1v1fKt7Jm3dcOkZeNeqGYeLamHNjYA6N_" :
                                    (project.title.toLowerCase().includes("escape game") || project.title.toLowerCase().includes("eclipse") || project.title.toLowerCase().includes("test me dream")) ? "https://lh3.googleusercontent.com/d/1y9tni_b6oiM9FGJo7qXoDs5wo5jCvjvx" : 
                                    (project.title.toLowerCase().includes("ml book rec")) ? "https://lh3.googleusercontent.com/d/1n2ab7BpV6zvjfV_-wfxUkVxBAo7FeRiH" :
                                    ('imageUrl' in project && project.imageUrl) ? project.imageUrl : `/teamlink_preview_${index + 1}.png`
                                } 
                                alt={project.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
                                    (e.target as HTMLElement).parentElement!.innerHTML = '<span class="text-alabaster/30 font-mono">Image Preview Not Found</span>';
                                }}
                            />
                        </div>
                    </div>
                </section>
            ))}
            <EclipseCaseStudy isOpen={isEclipseModalOpen} onClose={() => setIsEclipseModalOpen(false)} />
        </div>
    );
};
