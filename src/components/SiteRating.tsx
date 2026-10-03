'use client';

import React, { useState } from 'react';
import FlipCard from './FlipCard';
import PeekRating from './PeekRating';
import { StarIcon, SparklesIcon, CheckmarkCircle02Icon, ArrowReloadHorizontalIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export const SiteRating: React.FC = () => {
  const [rating, setRating] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('site_portfolio_rating');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [flipped, setFlipped] = useState<boolean>(false);
  const labels = ['Poor', 'Fair', 'Good', 'Great', 'Superb'];

  const handleRatingChange = (value: number) => {
    setRating(value);
    try {
      if (value > 0) {
        localStorage.setItem('site_portfolio_rating', String(value));
      } else {
        localStorage.removeItem('site_portfolio_rating');
      }
    } catch {}

    if (value > 0) {
      // Allow user to see the pop animation on the selected star, then flip!
      setTimeout(() => {
        setFlipped(true);
      }, 420);
    }
  };

  const handleFlipBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped(false);
  };

  return (
    <section id="rating" className="py-20 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="text-center max-w-xl mb-10 z-10">
        <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase text-charcoal/60 dark:text-alabaster/60 mb-3">
          <HugeiconsIcon icon={SparklesIcon} size={14} className="text-amber-400" />
          <span>Feedback & Review</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-3">
          Could you please rate my site?
        </h2>
        <p className="text-sm sm:text-base text-charcoal/70 dark:text-alabaster/70">
          Your feedback helps sharpen the experience and strengthens my work.
        </p>
      </div>

      <div className="flex justify-center items-center w-full z-10">
        <FlipCard
          flipped={flipped}
          onFlipChange={setFlipped}
          front={
            <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 text-center select-none bg-gradient-to-b from-[#2d2d34] to-[#1e1e24] border border-white/10 rounded-[22px]">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-amber-400 shadow-inner">
                  <HugeiconsIcon icon={StarIcon} size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white tracking-tight mb-1">
                  How was your experience?
                </h3>
                <p className="text-xs text-white/60">
                  Select a star rating below
                </p>
              </div>

              <div
                className="my-auto py-4 flex flex-col items-center justify-center"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
              >
                <PeekRating
                  defaultValue={rating > 0 ? rating : 3}
                  value={rating > 0 ? rating : undefined}
                  count={5}
                  shape="star"
                  labels={labels}
                  activeColor="#f5b400"
                  idleColor="#52525b"
                  tipColor="#27272a"
                  tipTextColor="#f5f5f5"
                  size={32}
                  lift={7}
                  magnify={1.15}
                  riseDuration={320}
                  popScale={1.3}
                  showTip
                  allowClear
                  onChange={handleRatingChange}
                />
                <span className="text-[11px] font-mono text-white/40 mt-3">
                  Hover to preview · Click to submit
                </span>
              </div>

              <div className="text-[11px] font-mono text-white/40 border-t border-white/10 pt-3 flex justify-between items-center">
                <span>Interactive 3D Card</span>
                <span>Flip on rate</span>
              </div>
            </div>
          }
          back={
            <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 text-center select-none bg-gradient-to-b from-[#24242c] to-[#18181f] border border-white/10 rounded-[22px]">
              <div className="flex flex-col items-center mt-2">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3 text-emerald-400">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={30} />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                  Thank You!
                </h3>
                <p className="text-xs sm:text-sm text-white/70 max-w-xs leading-relaxed">
                  Your rating has been received. Thank you so much for your feedback!
                </p>
              </div>

              {rating > 0 && (
                <div className="my-auto py-3 px-4 bg-white/5 border border-white/10 rounded-xl inline-flex flex-col items-center self-center">
                  <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                    {Array.from({ length: rating }).map((_, i) => (
                      <HugeiconsIcon key={i} icon={StarIcon} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-white/80">
                    {rating} / 5 · {labels[rating - 1] ?? 'Rated'}
                  </span>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={handleFlipBack}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={14} />
                  <span>Rate Again / Flip Back</span>
                </button>
              </div>
            </div>
          }
          axis="y"
          flipOnClick={false}
          draggable
          dragDistance={0}
          tilt
          tiltMax={12}
          glare
          glareOpacity={0.22}
          hoverScale={1.03}
          perspective={1100}
          stiffness={170}
          damping={20}
          width={320}
          height={410}
          radius={22}
          background="#27272a"
          color="#f5f5f5"
          shadow
          shadowColor="#000000"
          shadowOpacity={0.45}
        />
      </div>
    </section>
  );
};

export default SiteRating;
