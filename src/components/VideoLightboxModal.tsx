import React, { useEffect } from 'react';
import { X, ArrowUpRight, Film, Sliders, Sparkles, Clock } from 'lucide-react';
import { SpecFilmItem, HERO_SHOWREEL } from '../data/studioData';
import { DurationTierId } from '../utils/pricing';

interface VideoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilm: SpecFilmItem | null;
  isHeroShowreel?: boolean;
  onSelectTierForBrief: (tierId: DurationTierId, referenceTitle: string) => void;
}

export const VideoLightboxModal: React.FC<VideoLightboxModalProps> = ({
  isOpen,
  onClose,
  activeFilm,
  isHeroShowreel = false,
  onSelectTierForBrief,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const videoUrl = isHeroShowreel
    ? HERO_SHOWREEL.videoUrl
    : activeFilm?.videoUrl || HERO_SHOWREEL.videoUrl;
  const posterUrl = isHeroShowreel
    ? HERO_SHOWREEL.posterUrl
    : activeFilm?.posterUrl || HERO_SHOWREEL.posterUrl;
  const title = isHeroShowreel
    ? HERO_SHOWREEL.title
    : activeFilm?.title || HERO_SHOWREEL.title;
  const subtitle = isHeroShowreel
    ? 'A curated sequence of AI-generated commercial spec films, product worlds, and narrative cuts directed from first concept to final sound.'
    : activeFilm?.subtitle || '';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-[#0b0b0b] border border-white/15 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Viewfinder Corner Brackets */}
        <span className="pointer-events-none absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#ff4d00] z-20" />
        <span className="pointer-events-none absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#ff4d00] z-20" />
        <span className="pointer-events-none absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#ff4d00] z-20" />
        <span className="pointer-events-none absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#ff4d00] z-20" />

        {/* Top Bar inside Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080808]">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-2 h-2 bg-[#ff4d00] shrink-0" />
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00] whitespace-nowrap">
              {isHeroShowreel ? 'MASTER SHOWREEL' : activeFilm?.category}
            </span>
            <span className="text-white/25">·</span>
            <span className="font-mono-code text-xs text-white/70 truncate">
              {isHeroShowreel ? HERO_SHOWREEL.resolution : `${activeFilm?.durationTag} / ${activeFilm?.aspectRatio}`}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video player"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono-code uppercase tracking-wider text-white/80 hover:text-white border border-white/15 hover:border-[#ff4d00] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>ESC</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 16:9 Cinema Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <video
            key={videoUrl}
            src={videoUrl}
            poster={posterUrl}
            controls
            autoPlay
            playsInline
            loop
            className="w-full h-full object-cover"
          />
        </div>

        {/* Lower Details & Director Breakdown */}
        <div className="p-6 md:p-8 bg-[#0b0b0b]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                {title}
              </h3>
              <p className="text-white/70 text-sm md:text-base mt-1 max-w-3xl">
                {subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const tier = activeFilm?.tierMatch || '30s';
                onSelectTierForBrief(tier, title);
                onClose();
              }}
              className="inline-flex items-center justify-center gap-2.5 bg-[#ff4d00] hover:bg-[#ff621f] text-black font-semibold px-6 py-3.5 text-sm tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Commission Similar Scale ({activeFilm?.durationTag || '30 SEC'})</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Director's Production Breakdown */}
          {activeFilm && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              <div className="border-l border-white/15 pl-4">
                <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-[#ff4d00] mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>01. Concept Intent</span>
                </div>
                <p className="text-xs md:text-sm text-white/75 leading-relaxed">
                  {activeFilm.directorNotes.conceptBrief}
                </p>
              </div>

              <div className="border-l border-white/15 pl-4">
                <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-[#ff4d00] mb-1.5">
                  <Film className="w-3.5 h-3.5" />
                  <span>02. Visual Direction</span>
                </div>
                <p className="text-xs md:text-sm text-white/75 leading-relaxed">
                  {activeFilm.directorNotes.visualDirection}
                </p>
              </div>

              <div className="border-l border-white/15 pl-4">
                <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-[#ff4d00] mb-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>03. Pacing & Edit</span>
                </div>
                <p className="text-xs md:text-sm text-white/75 leading-relaxed">
                  {activeFilm.directorNotes.editingAndPacing}
                </p>
              </div>

              <div className="border-l border-white/15 pl-4">
                <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-[#ff4d00] mb-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>04. Production Freedom</span>
                </div>
                <p className="text-xs md:text-sm text-white/75 leading-relaxed">
                  {activeFilm.directorNotes.eliminatedConstraint}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
