import { PORTFOLIO_CONTENT } from "../data/content";

export const TechMarquee = () => {
  return (
    <div className="py-6 border-y border-charcoal/20 dark:border-alabaster/20 overflow-hidden font-mono text-xs text-charcoal/60 dark:text-alabaster/60">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...PORTFOLIO_CONTENT.techStack, ...PORTFOLIO_CONTENT.techStack].map((tech, i) => (
          <span key={i} className="mx-8">· {tech}</span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};
