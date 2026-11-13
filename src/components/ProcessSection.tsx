import React, { useState } from 'react';
import { PRODUCTION_PIPELINE, SIMPLE_CLIENT_FLOW } from '../data/studioData';
import { ArrowRight, Check } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  return (
    <section id="process" className="relative w-full bg-[#050505]">
      <div className="max-w-[1440px] mx-auto border-x border-white/10">
        {/* Header Block */}
        <div className="p-8 md:p-14 border-b border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00] mb-3">
              WHAT YOU GET · ONE PROCESS. ONE FINISHED VIDEO.
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
              Every video is created as a complete piece.
            </h2>
          </div>
          <p className="text-white/70 text-base max-w-xl">
            We do not hand you raw, unedited clips. Every project moves through
            our five-stage studio pipeline—from initial concept alignment to
            mastered sound and final cut.
          </p>
        </div>

        {/* Interactive 5-Step Pipeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10">
          {/* Left 5-Step Selector List */}
          <div className="lg:col-span-6 divide-y divide-white/10 border-b lg:border-b-0 lg:border-r border-white/10">
            {PRODUCTION_PIPELINE.map((step, index) => {
              const isActive = index === activeStepIndex;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStepIndex(index)}
                  className={`w-full text-left p-6 md:p-8 transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                    isActive
                      ? 'bg-[#121212] text-white'
                      : 'bg-[#070707] text-white/70 hover:bg-[#0d0d0d] hover:text-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-mono-code text-sm font-semibold mt-1 ${
                        isActive ? 'text-[#ff4d00]' : 'text-white/40'
                      }`}
                    >
                      {step.number}.
                    </span>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/65 mt-1">
                        {step.summary}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-mono-code text-xs uppercase tracking-widest mt-1.5 shrink-0 ${
                      isActive ? 'text-[#ff4d00]' : 'text-white/30'
                    }`}
                  >
                    {step.code}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Active Step Deep-Dive Panel */}
          <div className="lg:col-span-6 p-8 md:p-14 bg-[#0a0a0a] flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                <span className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00]">
                  STAGE {PRODUCTION_PIPELINE[activeStepIndex].number} OF 05 ·{' '}
                  {PRODUCTION_PIPELINE[activeStepIndex].code}
                </span>
                <span className="font-mono-code text-xs text-white/45">
                  INCLUDED IN ALL TIERS
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                {PRODUCTION_PIPELINE.map((step, idx) => (
                  <div
                    key={step.number}
                    className={`h-1.5 flex-1 transition-colors ${
                      idx <= activeStepIndex ? 'bg-[#ff4d00]' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              <div className="font-mono-code text-sm font-semibold text-[#ff4d00] uppercase tracking-widest mb-2">
                STEP {PRODUCTION_PIPELINE[activeStepIndex].number} SPECIFICATION
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                {PRODUCTION_PIPELINE[activeStepIndex].title}
              </h3>

              <p className="text-lg text-white/90 font-medium mb-4">
                {PRODUCTION_PIPELINE[activeStepIndex].summary}
              </p>

              <p className="text-base text-white/70 leading-relaxed mb-8">
                {PRODUCTION_PIPELINE[activeStepIndex].detail}
              </p>
            </div>

            <div className="p-6 border border-white/15 bg-[#0f0f0f]">
              <div className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00] mb-2">
                STAGE OUTPUT & DELIVERABLE
              </div>
              <div className="flex items-center gap-3 text-white font-display font-semibold text-lg">
                <Check className="w-5 h-5 text-[#ff4d00] shrink-0" />
                <span>{PRODUCTION_PIPELINE[activeStepIndex].deliverable}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: "The Simple Version" — Client Experience Strip (PDF Page 9) */}
        <div className="p-8 md:p-14 bg-[#080808]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00] mb-2">
                THE SIMPLE VERSION · FRICTIONLESS COLLABORATION
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                How your idea becomes a finished film in five clear steps.
              </h3>
            </div>
            <div className="font-mono-code text-xs text-white/50 uppercase">
              SINGLE POINT OF DIRECTION · START TO FINISH
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {SIMPLE_CLIENT_FLOW.map((item, idx) => (
              <div
                key={item.step}
                className="p-6 border border-white/10 bg-[#0c0c0c] relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-code text-xs text-[#ff4d00] font-semibold">
                      STEP {item.step}
                    </span>
                    {idx < SIMPLE_CLIENT_FLOW.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-white/25 hidden md:block" />
                    )}
                  </div>
                  <h4 className="font-display text-lg font-bold text-white leading-snug mb-2">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-white/65 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
