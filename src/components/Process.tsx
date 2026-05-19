import { PORTFOLIO_CONTENT } from "../data/content";

export const Process = () => (
  <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12" id="process">
    <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-8 md:mb-16">Engineering Approach</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      {PORTFOLIO_CONTENT.process.map((step, i) => (
        <div key={i} className="border-l border-charcoal/20 pl-6 dark:border-alabaster/20">
          <h3 className="text-xl font-medium mb-4">{step.title}</h3>
          <p className="text-charcoal/80 dark:text-alabaster/80 leading-relaxed font-mono text-sm">{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
);
