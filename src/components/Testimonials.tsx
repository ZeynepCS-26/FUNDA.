import { PORTFOLIO_CONTENT } from "../data/content";

export const Testimonials = () => (
  <section className="py-24 px-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {PORTFOLIO_CONTENT.testimonials.map((t, i) => (
        <div key={i} className="bg-white dark:bg-white/5 p-8 rounded-sm dark:border dark:border-alabaster/10">
          <p className="text-xl font-serif italic mb-6 leading-tight">"{t.quote}"</p>
          <span className="text-xs font-bold text-clay font-mono tracking-widest uppercase">— {t.author}</span>
        </div>
      ))}
    </div>
  </section>
);
