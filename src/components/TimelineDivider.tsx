import React from 'react';

interface TimelineDividerProps {
  trackCode: string;
  sectionLabel: string;
  timecode: string;
  playheadPercent?: number;
}

export const TimelineDivider: React.FC<TimelineDividerProps> = ({
  trackCode,
  sectionLabel,
  timecode,
  playheadPercent = 28,
}) => {
  return (
    <div className="relative w-full border-y border-white/10 bg-[#080808] select-none overflow-hidden">
      <div className="max-w-[1440px] mx-auto border-x border-white/10 px-6 md:px-12 py-3 flex items-center justify-between gap-6 relative">
        {/* Left Track Identifier */}
        <div className="flex items-center gap-3 shrink-0 z-10 bg-[#080808] pr-4">
          <span className="w-2 h-2 bg-[#ff4d00] inline-block shrink-0" />
          <span className="font-mono-code text-xs tracking-widest uppercase text-white/80 whitespace-nowrap">
            {trackCode}
          </span>
          <span className="text-white/25">·</span>
          <span className="font-mono-code text-xs tracking-wider uppercase text-[#ff4d00] whitespace-nowrap">
            {sectionLabel}
          </span>
        </div>

        {/* Center Ruler Ticks & Orange Playhead */}
        <div className="hidden md:block flex-1 h-5 timeline-ruler-ticks relative opacity-75">
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#ff4d00]"
            style={{ left: `${playheadPercent}%` }}
          >
            <div className="w-2.5 h-2.5 bg-[#ff4d00] -ml-[4px] -mt-0.5 rotate-45" />
          </div>
        </div>

        {/* Right Timecode Readout */}
        <div className="flex items-center gap-3 shrink-0 z-10 bg-[#080808] pl-4">
          <span className="font-mono-code text-xs text-white/40 uppercase hidden sm:inline whitespace-nowrap">
            REC.709 / 24FPS
          </span>
          <span className="text-white/20 hidden sm:inline">/</span>
          <span className="font-mono-code text-xs text-white/80 tracking-widest whitespace-nowrap">
            {timecode}
          </span>
        </div>
      </div>
    </div>
  );
};
