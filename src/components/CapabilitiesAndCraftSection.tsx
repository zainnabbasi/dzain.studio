import React, { useState } from 'react';
import {
  FLEXIBLE_BY_DESIGN_PRESETS,
  REMOVED_PRODUCTION_LIMITS,
} from '../data/studioData';
import { Eye, Layers, Compass, CheckCircle2 } from 'lucide-react';

export const CapabilitiesAndCraftSection: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const activePreset =
    FLEXIBLE_BY_DESIGN_PRESETS[selectedPresetIndex] ||
    FLEXIBLE_BY_DESIGN_PRESETS[0];

  return (
    <section id="why-ai-video" className="relative w-full bg-[#050505]">
      <div className="max-w-[1440px] mx-auto border-x border-white/10">
        {/* Part 1: "More Than Just Generation" — Director's Craft Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10">
          <div className="lg:col-span-5 p-8 md:p-14 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-[#080808]">
            <div>
              <div className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00] mb-4">
                DIRECTOR-LED PHILOSOPHY · CRAFT OVER CLIPS
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.08]">
                More than just generation.
              </h2>
              <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed">
                We handle every step with intention, from first idea to final
                frame. Strategic creativity meets advanced tools and expert
                craft—iterating, refining, and shaping a cohesive film that
                feels seamless from start to finish.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="font-display text-xl md:text-2xl font-semibold text-white leading-snug">
                “AI creates possibilities.{' '}
                <span className="text-[#ff4d00]">
                  Creative direction turns those possibilities into a video.
                </span>
                ”
              </p>
            </div>
          </div>

          {/* Right Column: The 5 Editorial Decisions */}
          <div className="lg:col-span-7 p-8 md:p-14 flex flex-col justify-center">
            <div className="text-xs font-mono-code uppercase tracking-widest text-white/50 mb-6">
              IT’S NOT ABOUT HOW MANY CLIPS AI CAN MAKE — IT’S ABOUT:
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {[
                {
                  num: '01',
                  statement: 'Knowing which shot works.',
                  sub: 'Selecting framing, lens focal length, and lighting that serve the brand message.',
                },
                {
                  num: '02',
                  statement: 'Knowing which one does not.',
                  sub: 'Ruthlessly cutting visual noise, uncanny artifacts, or unmotivated camera movement.',
                },
                {
                  num: '03',
                  statement: 'Knowing what should come next.',
                  sub: 'Sequencing cause-and-effect visual storytelling so the viewer stays locked in.',
                },
                {
                  num: '04',
                  statement: 'Knowing how long a moment should stay.',
                  sub: 'Controlling frame-accurate pacing—when to let a shot breathe and when to cut on action.',
                },
                {
                  num: '05',
                  statement: 'Knowing what makes the whole film feel connected.',
                  sub: 'Unifying color palette, visual grain, sound design, and emotional tone from first frame to last.',
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono-code text-xs text-[#ff4d00] font-semibold">
                      {item.num}.
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-[#ff4d00] transition-colors">
                      {item.statement}
                    </h3>
                  </div>
                  <p className="text-sm text-white/60 sm:max-w-sm sm:text-right pl-7 sm:pl-0">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Part 2: "Flexible By Design" — Interactive Scene & Environment Switcher */}
        <div className="p-8 md:p-14 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00] mb-3">
                FLEXIBLE BY DESIGN · INTERACTIVE SCENE SHIFTER
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
                Reimagine scenes. Shift locations in seconds.
              </h2>
            </div>
            <p className="text-white/70 text-base max-w-xl">
              Evolve visual styles effortlessly and place products in any
              environment. Switch environments below to see how we explore,
              refine, and land on what is right without physical reshoot costs.
            </p>
          </div>

          {/* Environment Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {FLEXIBLE_BY_DESIGN_PRESETS.map((preset, idx) => {
              const isSelected = idx === selectedPresetIndex;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedPresetIndex(idx)}
                  className={`text-left p-4 border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#141414] border-[#ff4d00] text-white'
                      : 'bg-[#090909] border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono-code text-xs uppercase tracking-wider text-[#ff4d00] whitespace-nowrap">
                      {preset.label}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 bg-[#ff4d00] shrink-0" />
                    )}
                  </div>
                  <div className="font-display font-semibold text-sm md:text-base truncate">
                    {preset.locationTag}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Environment Preview Viewport */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/15 bg-[#090909] relative">
            {/* Corner Viewfinder Brackets */}
            <span className="pointer-events-none absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ff4d00] z-20" />
            <span className="pointer-events-none absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ff4d00] z-20" />
            <span className="pointer-events-none absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ff4d00] z-20" />
            <span className="pointer-events-none absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff4d00] z-20" />

            <div className="lg:col-span-8 relative aspect-video bg-black border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
              <video
                key={activePreset.videoUrl}
                src={activePreset.videoUrl}
                poster={activePreset.posterUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-white/15 px-3 py-1.5 font-mono-code text-xs text-white/90 uppercase tracking-wider">
                {activePreset.locationTag} · {activePreset.cameraSetup}
              </div>
            </div>

            <div className="lg:col-span-4 p-6 md:p-8 flex flex-col justify-between bg-[#0b0b0b]">
              <div>
                <div className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00] mb-2">
                  ACTIVE LOOK DEVELOPMENT
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">
                  {activePreset.locationTag}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed mb-6">
                  {activePreset.description}
                </p>

                <div className="space-y-4 border-t border-white/10 pt-5">
                  <div>
                    <div className="flex items-center gap-2 font-mono-code text-xs text-white/50 uppercase mb-1">
                      <Eye className="w-3.5 h-3.5 text-[#ff4d00]" />
                      <span>Lighting Architecture</span>
                    </div>
                    <div className="text-sm text-white font-medium">
                      {activePreset.lightingStyle}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-mono-code text-xs text-white/50 uppercase mb-1">
                      <Compass className="w-3.5 h-3.5 text-[#ff4d00]" />
                      <span>Optical / Camera Profile</span>
                    </div>
                    <div className="text-sm text-white font-medium">
                      {activePreset.cameraSetup}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-mono-code text-xs text-white/50 uppercase mb-1">
                      <Layers className="w-3.5 h-3.5 text-[#ff4d00]" />
                      <span>Production Advantage</span>
                    </div>
                    <div className="text-sm text-[#ff4d00] font-medium">
                      {activePreset.traditionalCostEliminated}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 font-mono-code text-xs text-white/50">
                4 OF 4 VISUAL WORLDS READY TO PREVIEW
              </div>
            </div>
          </div>
        </div>

        {/* Part 3: "Why AI Video — More Freedom to Create Without the Usual Limits" */}
        <div className="p-8 md:p-14 bg-[#070707]">
          <div className="max-w-3xl mb-10">
            <div className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00] mb-3">
              WHY AI VIDEO · ZERO LOGISTICAL FRICTION
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              More freedom to create without the usual limits.
            </h2>
            <p className="text-white/70 text-base mt-3">
              AI video unlocks creative possibilities with a process that stays
              flexible and efficient—bypassing the five heaviest bottlenecks of
              traditional live-action shoots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {REMOVED_PRODUCTION_LIMITS.map((item, idx) => (
              <div
                key={item.limit}
                className="p-6 border border-white/10 bg-[#0c0c0c] flex flex-col justify-between hover:border-[#ff4d00]/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between font-mono-code text-xs text-white/45 mb-4">
                    <span>0{idx + 1}. LIMIT REMOVED</span>
                    <span className="text-[#ff4d00] line-through">BOTTLENECK</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {item.limit}
                  </h3>
                  <p className="text-xs text-white/55 leading-relaxed mb-4 pb-4 border-b border-white/10">
                    {item.traditionalPain}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff4d00] shrink-0 mt-0.5" />
                  <p className="text-xs text-white/90 font-medium leading-relaxed">
                    {item.aiAdvantage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
