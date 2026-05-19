import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface EclipseCaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EclipseCaseStudy: React.FC<EclipseCaseStudyProps> = ({ isOpen, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-alabaster dark:bg-charcoal text-charcoal dark:text-alabaster rounded-lg shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 md:p-8 border-b border-charcoal/10 dark:border-alabaster/10">
              <div>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-2 uppercase">TEST ME DREAM</h2>
                <p className="text-lg md:text-xl text-sage font-light uppercase">UX/UI & GAME DESIGN CASE STUDY: GAMIFYING COMPUTER SCIENCE CONCEPTS</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-charcoal/5 dark:bg-alabaster/5 rounded-full hover:bg-charcoal/10 dark:hover:bg-alabaster/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-12 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 p-6 bg-charcoal/5 dark:bg-alabaster/5 rounded-lg text-sm">
                <div>
                  <span className="block text-xs uppercase tracking-widest text-charcoal/50 dark:text-alabaster/50 mb-1">Project Type</span>
                  <span className="font-medium">2D Point-and-Click Educational Puzzle Adventure</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-charcoal/50 dark:text-alabaster/50 mb-1">Platform & Tech</span>
                  <span className="font-medium">Ren'Py Engine, Krita, VS Code</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-charcoal/50 dark:text-alabaster/50 mb-1">My Role</span>
                  <span className="font-medium">Game Designer, Systems Architect & Lead Developer</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-charcoal/50 dark:text-alabaster/50 mb-1">Project Team</span>
                  <span className="font-medium">Eda Köse, Funda Zeynep Şarkışla, Nurefşan Yıldırım</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-charcoal/50 dark:text-alabaster/50 mb-1">Timeline</span>
                  <span className="font-medium">Academic Capstone Project (May 2026)</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-charcoal/50 dark:text-alabaster/50 mb-1">Advisor</span>
                  <span className="font-medium">Dr. Öğr. Üyesi Zeynep Nihan Berberler</span>
                </div>
              </div>

              <div className="space-y-12">
                <section>
                  <h3 className="text-2xl font-medium mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-sage"></span>
                    1. EXECUTIVE SUMMARY & CONCEPT
                  </h3>
                  <div className="space-y-4 text-lg font-light leading-relaxed text-charcoal/80 dark:text-alabaster/80">
                    <p>
                      "Test Me Dream" is an innovative, narrative-driven 2D pixel-art escape room game designed to bridge the gap between abstract computer science theory and interactive entertainment. Built primarily for students facing complex algorithmic logic, the game seamlessly embeds <strong>Dijkstra's Shortest Path Algorithm</strong> into a compelling "nested dream" psychological framework.
                    </p>
                    <p>
                      Players navigate an atmospheric sequence of shifting dreamscapes, interacting with unique companions and solving logical environmental puzzles to acquire inventory items. The game culminates in a high-stakes algorithmic exam puzzle that must be solved to trigger a "real-world awakening," effectively acting as a gamified stealth-learning tool.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-medium mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-sage"></span>
                    2. THE PROBLEM & DESIGN CHALLENGE
                  </h3>
                  <div className="space-y-4 text-lg font-light leading-relaxed text-charcoal/80 dark:text-alabaster/80">
                    <p>
                      Theoretical concepts in computer science, particularly Graph Theory and routing algorithms, are frequently perceived by undergraduate students as dry, abstract, and challenging to visualize. Traditional methods of learning rely heavily on static textbook illustrations and manual calculation grids.
                    </p>
                    <div className="bg-sage/10 p-6 rounded border-l-4 border-sage my-6">
                      <span className="font-medium uppercase text-sm tracking-widest text-sage mb-2 block">Design Objective</span>
                      <p className="font-light italic">How can we transform a technical mathematical process—specifically graph traversal and edge weight optimization—into an intuitive, anxiety-reducing, and immersive gameplay mechanic within a Point-and-Click framework?</p>
                    </div>
                    <p>
                      The project required building a structural gameplay loop where understanding the algorithm wasn't just a byproduct of playing, but the exact key required to unlock progression.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-medium mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-sage"></span>
                    3. NARRATIVE & LEVEL ARCHITECTURE
                  </h3>
                  <p className="text-lg font-light mb-6 text-charcoal/80 dark:text-alabaster/80">
                    The game leverages a "nested dream within a dream" structure to represent shifting psychological layers of exam anxiety and intellectual breakthrough. The progression flows through five distinct thematic phases:
                  </p>
                  
                  <div className="ml-4 md:ml-8 space-y-8">
                    <div>
                      <h4 className="text-xl font-medium mb-2 text-sage">Phase 1: Real World Foundations (The Trigger)</h4>
                      <p className="font-light text-charcoal/80 dark:text-alabaster/80">
                        The game opens in the real world (<code>bg real_desk</code>). The protagonist is overwhelmed at their desk, attempting to cram Graph Theory. Exhausted, they fall asleep, establishing the psychological stakes and triggering the dream sequence.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-2 text-sage">Phase 2: Dream 1 (The Nostalgic Room & Companion Introduction)</h4>
                      <p className="font-light text-charcoal/80 dark:text-alabaster/80">
                        The user awakens in a retro childhood bedroom (<code>bg dream1_room</code>). Exploration leads them to the living room to harvest specific food items (Carrot and Cucumber). Returning to the room reveals <strong>Kumpir</strong>, a vibrant yellow budgie. Feeding Kumpir rewards the player with a silver key, unlocking a desk drawer containing sheet music. Playing the violin shatters the environment, pulling the player deeper.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-2 text-sage">Phase 3: False Awakening (The High-Stakes Exam Desk)</h4>
                      <p className="font-light text-charcoal/80 dark:text-alabaster/80">
                        The core puzzle stage (<code>bg exam_desk</code>). Rendered from a first-person POV, the player faces a bare school desk containing only a pencil and an exam sheet. Kumpir reappears, guiding the user via an automated, timer-driven dialogue box that safely contextualizes the Dijkstra chart displayed on the paper without punishing the player for initial ignorance.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-2 text-sage">Phase 4: Dream 2 (The Domestic Escape & TV Puzzle)</h4>
                      <p className="font-light text-charcoal/80 dark:text-alabaster/80">
                        Succeeding in the exam triggers a celebratory audio cue and an overexposed white teleportation fade (<code>bg white_fade</code>), launching the player into an alternative modern living room. Players find a TV remote, tune into a specific childhood broadcast, and enter a final bedroom layout where interacting with their childhood cat, <strong>Portakal</strong>, yields the key to the ultimate exit door.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-2 text-sage">Phase 5: Real Awakening (The Climax)</h4>
                      <p className="font-light text-charcoal/80 dark:text-alabaster/80">
                        The player snaps awake in the real world, rushing to their university exam hall. Facing an identical Dijkstra pathing problem on paper, the protagonist realizes they already know the answer from their dream journey, concluding the narrative loop with empowerment.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-medium mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-sage"></span>
                    4. SYSTEMS DESIGN & ENGINE PIVOT
                  </h3>
                  <div className="space-y-4 text-lg font-light leading-relaxed text-charcoal/80 dark:text-alabaster/80">
                    <p>
                        The project underwent a significant architectural evolution during development. Initially conceptualized within a Single-Scene game manager architecture in Unity using C# event broadcasting, the team pivoted to the <strong>Ren'Py Engine</strong> to optimize production efficiency and UX responsiveness.
                    </p>
                    <ul className="list-disc ml-6 space-y-4 mt-6 marker:text-sage">
                      <li>
                        <span className="font-medium text-charcoal dark:text-alabaster">State Machine Management:</span> Re-engineered Unity's C# structural states into Ren'Py label blocks, vastly reducing memory overhead and eliminating Canvas-scaling and element overlap visual bugs commonly seen in cross-platform UI rendering.
                      </li>
                      <li>
                        <span className="font-medium text-charcoal dark:text-alabaster">Inventory Logic:</span> Implemented a lightweight Python system tracking boolean state flags (e.g., <code>has_carrot</code>, <code>has_remote</code>) to handle progression locks natively.
                      </li>
                      <li>
                        <span className="font-medium text-charcoal dark:text-alabaster">Stealth Tutorial Coroutine:</span> Programmed timed dialogue sequences using non-clickable interval pauses to safely convey algorithmic rules to the user before displaying interactive multiple-choice nodes (A, B, C, D maps) to avoid user interface fatigue.
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-medium mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-sage"></span>
                    5. ART DIRECTION & UI DESIGN
                  </h3>
                  <div className="space-y-4 text-lg font-light leading-relaxed text-charcoal/80 dark:text-alabaster/80">
                    <p>
                      To induce nostalgia and evoke comfort against the anxiety-inducing backdrop of academic testing, the game utilizes an entirely bespoke <strong>lo-fi pixel-art aesthetic</strong> built within Krita.
                    </p>
                    <p>
                      The user interface avoids traditional complex UI panels, favoring immersive interactive overlays. Text prompts follow standard retro RPG boundaries, maintaining a strict grid alignment. High-contrast indicators and smart anchoring ensure that key actionable zones (like the Dijkstra edge nodes) remain fully accessible across variable viewport dimensions.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-medium mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-sage"></span>
                    6. RESULTS, IMPACT & FUTURE ROADMAP
                  </h3>
                  <div className="space-y-4 text-lg font-light leading-relaxed text-charcoal/80 dark:text-alabaster/80">
                    <p>
                        The successful delivery of the "Test Me Dream" prototype demonstrated the immense educational value of interactive narrative structures. By treating algorithm paths as literal physical maps and puzzles, the game effectively removed abstract cognitive blocks.
                    </p>
                    <p>
                        Future iterations of the framework aim to expand the game's scope by integrating additional core computer science algorithms, such as Breadth-First Search (BFS) and Depth-First Search (DFS), mapping them onto unique new dream environments to form a comprehensive gamified learning suite.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
                    <span className="w-8 h-1 bg-sage"></span>
                    TECHNOLOGIES USED
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["Ren'Py Engine", "Python", "Krita", "VS Code", "Pixel Art", "UI/UX Design", "Game Narrative", "Graph Theory Concepts"].map((tech, i) => (
                      <span key={i} className="px-4 py-2 bg-charcoal/5 dark:bg-alabaster/10 text-charcoal/90 dark:text-alabaster border border-charcoal/10 dark:border-alabaster/20 rounded-md font-mono text-sm tracking-tight">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
