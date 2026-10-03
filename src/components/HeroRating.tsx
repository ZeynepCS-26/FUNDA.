'use client';

import React, { useState } from 'react';
import FlipCard from './FlipCard';
import PeekRating from './PeekRating';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';

export const HeroRating: React.FC = () => {
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
    <div className="inline-flex items-center align-middle" onPointerDown={e => e.stopPropagation()}>
      <FlipCard
        flipped={flipped}
        onFlipChange={setFlipped}
        front={
          <div className="w-full h-full flex flex-col justify-center items-center px-3 py-1.5 text-center select-none bg-[#27272a] border border-white/15 rounded-[18px] shadow-xl">
            <div
              className="flex items-center justify-center"
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
                idleColor="#71717a"
                tipColor="#18181b"
                tipTextColor="#f5f5f5"
                size={24}
                lift={5}
                magnify={1.15}
                riseDuration={320}
                popScale={1.3}
                showTip
                allowClear
                onChange={handleRatingChange}
              />
            </div>
            <span className="text-[10px] font-mono tracking-tight text-white/50 mt-0.5">
              Rate architecture
            </span>
          </div>
        }
        back={
          <div className="w-full h-full flex items-center justify-between px-3.5 py-1.5 select-none bg-[#27272a] border border-emerald-500/25 rounded-[18px] shadow-xl">
            <div className="flex items-center gap-2 text-left">
              <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-tight">Teşekkürler!</span>
                <span className="text-[10px] font-mono text-white/70">
                  {rating > 0 ? `${rating}/5 · ${labels[rating - 1]}` : 'Kaydedildi'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleFlipBack}
              className="text-[10px] font-mono text-white/60 hover:text-white underline px-1.5 py-0.5 rounded cursor-pointer shrink-0 ml-2"
            >
              Değiştir
            </button>
          </div>
        }
        axis="y"
        flipOnClick={false}
        draggable={false}
        dragDistance={0}
        tilt
        tiltMax={10}
        glare
        glareOpacity={0.2}
        hoverScale={1.02}
        perspective={1100}
        stiffness={170}
        damping={20}
        width={250}
        height={76}
        radius={18}
        background="#27272a"
        color="#f5f5f5"
        shadow
        shadowColor="#000000"
        shadowOpacity={0.35}
      />
    </div>
  );
};

export default HeroRating;
