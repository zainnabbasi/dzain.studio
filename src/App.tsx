/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Play,
  ArrowUpRight,
  Menu,
  X,
  Film,
  Sparkles,
} from 'lucide-react';
import {
  HERO_SHOWREEL,
  SPEC_FILMS,
  SpecCategory,
  SpecFilmItem,
} from './data/studioData';
import {
  CurrencyCode,
  DurationTierId,
  AspectRatioFormat,
} from './utils/pricing';
import { TimelineDivider } from './components/TimelineDivider';
import { VideoLightboxModal } from './components/VideoLightboxModal';
import { CapabilitiesAndCraftSection } from './components/CapabilitiesAndCraftSection';
import { ProcessSection } from './components/ProcessSection';
import { PricingSection } from './components/PricingSection';
import { BriefAndFaqSection } from './components/BriefAndFaqSection';

const CATEGORIES: SpecCategory[] = [
  'All',
  'Product Showcases',
  'Brand Films',
  'Campaign Creatives',
  'Social Media',
];

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [selectedCategory, setSelectedCategory] = useState<SpecCategory>('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Video Lightbox Modal State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxHeroMode, setLightboxHeroMode] = useState(false);
  const [activeSpecFilm, setActiveSpecFilm] = useState<SpecFilmItem | null>(
    null
  );

  // Brief Pre-fill State
  const [selectedTierId, setSelectedTierId] = useState<DurationTierId>('30s');
  const [selectedAspectRatio, setSelectedAspectRatio] =
    useState<AspectRatioFormat>('16:9');
  const [prefilledNote, setPrefilledNote] = useState<string>('');

  const filteredFilms =
    selectedCategory === 'All'
      ? SPEC_FILMS
      : SPEC_FILMS.filter((film) => film.category === selectedCategory);

  const handleOpenHeroShowreel = () => {
    setLightboxHeroMode(true);
    setActiveSpecFilm(null);
    setLightboxOpen(true);
  };

  const handleOpenSpecFilm = (film: SpecFilmItem) => {
    setLightboxHeroMode(false);
    setActiveSpecFilm(film);
    setLightboxOpen(true);
  };

  const handleSelectTierForBrief = (
    tierId: DurationTierId,
    referenceNote?: string,
    aspectRatio?: AspectRatioFormat
  ) => {
    setSelectedTierId(tierId);
    if (aspectRatio) {
      setSelectedAspectRatio(aspectRatio);
    }
    if (referenceNote) {
      setPrefilledNote(referenceNote);
    }
    const briefEl = document.getElementById('brief-project');
    if (briefEl) {
      briefEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] flex flex-col selection:bg-[#ff4d00] selection:text-black">
      {/* 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-40 h-20 w-full bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1440px] mx-auto h-full border-x border-white/10 px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Lockup (Single-Line Wordmark) */}
          <a
            href="#"
            className="flex items-center gap-3 font-display text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            <span className="w-3.5 h-3.5 bg-[#ff4d00] inline-block shrink-0" />
            <span>dzain.studio</span>
          </a>

          {/* Zone 2: Primary Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8"
          >
            <a
              href="#spec-work"
              className="text-sm font-medium text-white/75 hover:text-[#ff4d00] transition-colors whitespace-nowrap"
            >
              Spec Anthology
            </a>
            <a
              href="#why-ai-video"
              className="text-sm font-medium text-white/75 hover:text-[#ff4d00] transition-colors whitespace-nowrap"
            >
              Why AI Video
            </a>
            <a
              href="#process"
              className="text-sm font-medium text-white/75 hover:text-[#ff4d00] transition-colors whitespace-nowrap"
            >
              5-Step Process
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-white/75 hover:text-[#ff4d00] transition-colors whitespace-nowrap"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-white/75 hover:text-[#ff4d00] transition-colors whitespace-nowrap"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: Action Cluster (Max 2 interactive controls on desktop) */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
              aria-label="Toggle pricing currency between INR and USD"
              className="px-3 py-2 border border-white/15 hover:border-[#ff4d00] font-mono-code text-xs uppercase tracking-wider text-white/85 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {currency === 'INR' ? 'INR ₹ / USD $' : 'USD $ / INR ₹'}
            </button>

            <a
              href="#brief-project"
              className="inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff621f] text-black font-semibold px-5 py-2.5 text-sm tracking-wide transition-colors whitespace-nowrap shrink-0"
            >
              <span>Brief Your Video</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Action & Hamburger Trigger */}
          <div className="flex sm:hidden items-center gap-2.5 shrink-0">
            <a
              href="#brief-project"
              className="inline-flex items-center gap-1 bg-[#ff4d00] hover:bg-[#ff621f] text-black font-semibold px-3.5 py-2 text-xs tracking-wide transition-colors whitespace-nowrap shrink-0"
            >
              <span>Brief ↗</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-white border border-white/15 cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#0a0a0a] border-b border-white/15 px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3">
              <a
                href="#spec-work"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-white/85 hover:text-[#ff4d00]"
              >
                Spec Anthology
              </a>
              <a
                href="#why-ai-video"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-white/85 hover:text-[#ff4d00]"
              >
                Why AI Video
              </a>
              <a
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-white/85 hover:text-[#ff4d00]"
              >
                5-Step Process
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-white/85 hover:text-[#ff4d00]"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-white/85 hover:text-[#ff4d00]"
              >
                FAQ
              </a>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
                className="px-3 py-2.5 border border-white/15 font-mono-code text-xs uppercase text-white/85 whitespace-nowrap"
              >
                Currency: {currency}
              </button>
              <a
                href="#brief-project"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center bg-[#ff4d00] text-black font-semibold py-2.5 px-4 text-sm whitespace-nowrap"
              >
                Brief Your Video
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative w-full bg-[#050505] overflow-hidden">
          <div className="max-w-[1440px] mx-auto border-x border-white/10 relative">
            {/* Hero Background Video Canvas */}
            <div className="relative min-h-[640px] lg:min-h-[720px] flex flex-col justify-between p-6 sm:p-10 md:p-16">
              {/* Background Video + Multi-Stop Scrim */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                <video
                  src={HERO_SHOWREEL.videoUrl}
                  poster={HERO_SHOWREEL.posterUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-55 scale-[1.01]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-[#050505]/45" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />
              </div>

              {/* Top Viewfinder Metadata Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
                <div className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00]">
                  AI VIDEO PRODUCTION · DIRECTOR-LED STUDIO
                </div>
                <div className="font-mono-code text-xs text-white/60 uppercase tracking-widest hidden sm:block">
                  BRANDS · CAMPAIGNS · PRODUCTS · SOCIAL MEDIA
                </div>
              </div>

              {/* Center Hero Content Split */}
              <div className="relative z-10 my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                <div className="lg:col-span-8">
                  <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.03]">
                    Cinema-grade brand films.{' '}
                    <span className="text-[#ff4d00]">
                      Directed by a human, powered by AI.
                    </span>
                  </h1>

                  <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed font-normal">
                    Anyone can type a prompt. Very few can direct a cut. We
                    combine visual direction, intentional pacing, and master
                    sound design to build product films and ad creatives that
                    hold attention.
                  </p>

                  {/* Primary Action Row */}
                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <a
                      href="#brief-project"
                      className="inline-flex items-center gap-2.5 bg-[#ff4d00] hover:bg-[#ff621f] text-black font-semibold px-7 py-4 text-sm md:text-base tracking-wide transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Start Your Video Brief</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={handleOpenHeroShowreel}
                      className="inline-flex items-center gap-3 bg-black/75 hover:bg-white/10 text-white border border-white/25 hover:border-[#ff4d00] px-6 py-4 text-sm md:text-base font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Play className="w-4 h-4 text-[#ff4d00] fill-[#ff4d00]" />
                      <span>Play Director’s Showreel</span>
                    </button>
                  </div>
                </div>

                {/* Right Viewfinder Spec Preview Card */}
                <div className="lg:col-span-4 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/15 p-6 relative">
                  <span className="pointer-events-none absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ff4d00]" />
                  <span className="pointer-events-none absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ff4d00]" />
                  <span className="pointer-events-none absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ff4d00]" />
                  <span className="pointer-events-none absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff4d00]" />

                  <div className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00] mb-2">
                    WHAT GOES INTO EACH VIDEO
                  </div>
                  <p className="text-sm text-white/85 leading-relaxed mb-4">
                    Strategic creativity meets advanced tools and expert craft.
                    We iterate, refine, and deliver a cohesive film that feels
                    seamless from start to finish.
                  </p>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono-code text-xs text-white/60">
                    <span>STUDIO SPEED</span>
                    <span className="text-[#ff4d00] font-semibold">
                      TURNAROUND: 48–72 HRS
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Studio Parameters Strip (Full Width) */}
              <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/15 font-mono-code text-xs">
                <div>
                  <span className="text-white/45 block">PRODUCTION SCOPE</span>
                  <span className="text-white font-medium">
                    CONCEPT TO SOUND MASTER
                  </span>
                </div>
                <div>
                  <span className="text-white/45 block">DURATION TIERS</span>
                  <span className="text-white font-medium">
                    15 SEC · 30 SEC · 45 SEC · 60+ SEC
                  </span>
                </div>
                <div>
                  <span className="text-white/45 block">CREATIVE FREEDOM</span>
                  <span className="text-white font-medium">
                    ZERO SET OR LOCATION LIMITS
                  </span>
                </div>
                <div>
                  <span className="text-white/45 block">STUDIO OUTPUT</span>
                  <span className="text-[#ff4d00] font-semibold">
                    DELIVERABLES: 4K MASTER + AUDIO STEMS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE DIVIDER 01 */}
        <TimelineDivider
          trackCode="TRACK_01"
          sectionLabel="SPEC_ANTHOLOGY & CAPABILITIES"
          timecode="00:00:15:00"
          playheadPercent={18}
        />

        {/* SPEC ANTHOLOGY / VISUAL SHOWCASE SECTION */}
        <section id="spec-work" className="relative w-full bg-[#050505]">
          <div className="max-w-[1440px] mx-auto border-x border-white/10 p-8 md:p-14">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div>
                <div className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00] mb-3">
                  DIRECTED SPEC ANTHOLOGY · VISUAL PROOF OF CRAFT
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
                  Proof that AI video doesn&apos;t have to look &apos;AI-generated&apos;.
                </h2>
              </div>

              {/* Category Filter Buttons */}
              <div
                role="tablist"
                aria-label="Filter spec films by category"
                className="flex flex-wrap items-center gap-2"
              >
                {CATEGORIES.map((category) => {
                  const active = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-xs font-mono-code uppercase tracking-wider border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#ff4d00] text-black border-[#ff4d00] font-semibold'
                          : 'bg-[#0b0b0b] text-white/70 border-white/15 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Asymmetric Bento Grid of Spec Films */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {filteredFilms.map((film, idx) => {
                // Balanced 12-column row pairing:
                // When odd count and last item, span full 12 columns; otherwise alternate 7/5 and 5/7 per row
                const isLastOddItem =
                  filteredFilms.length % 2 === 1 &&
                  idx === filteredFilms.length - 1;
                const rowNumber = Math.floor(idx / 2);
                const isFirstInRow = idx % 2 === 0;
                const isSevenCol =
                  rowNumber % 2 === 0 ? isFirstInRow : !isFirstInRow;

                const colSpanClass = isLastOddItem
                  ? 'lg:col-span-12'
                  : isSevenCol
                  ? 'lg:col-span-7'
                  : 'lg:col-span-5';

                return (
                  <article
                    key={film.id}
                    onClick={() => handleOpenSpecFilm(film)}
                    className={`${colSpanClass} group relative border border-white/15 bg-[#0a0a0a] hover:border-[#ff4d00] transition-colors cursor-pointer flex flex-col justify-between overflow-hidden`}
                  >
                    {/* Viewfinder Corner Brackets */}
                    <span className="pointer-events-none absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/30 group-hover:border-[#ff4d00] z-20 transition-colors" />
                    <span className="pointer-events-none absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/30 group-hover:border-[#ff4d00] z-20 transition-colors" />
                    <span className="pointer-events-none absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/30 group-hover:border-[#ff4d00] z-20 transition-colors" />
                    <span className="pointer-events-none absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/30 group-hover:border-[#ff4d00] z-20 transition-colors" />

                    {/* Video Viewport */}
                    <div className="relative aspect-video w-full bg-black overflow-hidden">
                      <video
                        src={film.videoUrl}
                        poster={film.posterUrl}
                        preload="metadata"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => {
                          e.currentTarget.play().catch(() => {});
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                      {/* Top Unboxed Metadata Overlay */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono-code text-xs text-white/90 pointer-events-none">
                        <span className="bg-black/75 px-2.5 py-1 border border-white/15">
                          {film.category.toUpperCase()} · {film.durationTag}
                        </span>
                        <span className="bg-black/75 px-2.5 py-1 border border-white/15 text-[#ff4d00]">
                          {film.timecode}
                        </span>
                      </div>

                      {/* Play Action Indicator */}
                      <div className="absolute bottom-4 right-4 w-11 h-11 bg-[#ff4d00] text-black flex items-center justify-center group-hover:scale-105 transition-transform pointer-events-none">
                        <Play className="w-5 h-5 fill-black ml-0.5" />
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-6 flex flex-col justify-between flex-1 bg-[#0b0b0b]">
                      <div>
                        <div className="font-mono-code text-xs text-white/50 uppercase mb-1">
                          {film.aspectRatio} · DIRECTOR TREATMENT AVAILABLE
                        </div>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-[#ff4d00] transition-colors">
                          {film.title}
                        </h3>
                        <p className="text-sm text-white/70 mt-1.5">
                          {film.subtitle}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-code">
                        <span className="text-white/60">
                          INSPECT VISUAL DIRECTION & PACING NOTES
                        </span>
                        <span className="text-[#ff4d00] flex items-center gap-1 font-semibold">
                          <span>PLAY WITH SOUND + NOTES</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* TIMELINE DIVIDER 02 */}
        <TimelineDivider
          trackCode="TRACK_02"
          sectionLabel="CRAFT_AND_FLEXIBILITY"
          timecode="00:00:30:00"
          playheadPercent={42}
        />

        {/* MORE THAN JUST GENERATION + FLEXIBLE BY DESIGN + WHY AI VIDEO */}
        <CapabilitiesAndCraftSection />

        {/* TIMELINE DIVIDER 03 */}
        <TimelineDivider
          trackCode="TRACK_03"
          sectionLabel="FIVE_STEP_PIPELINE"
          timecode="00:00:45:00"
          playheadPercent={64}
        />

        {/* 5-STEP PRODUCTION PIPELINE + THE SIMPLE VERSION */}
        <ProcessSection />

        {/* TIMELINE DIVIDER 04 */}
        <TimelineDivider
          trackCode="TRACK_04"
          sectionLabel="DURATION_PRICING"
          timecode="00:01:00:00"
          playheadPercent={82}
        />

        {/* DURATION-BASED PRICING + INTERACTIVE CALCULATOR */}
        <PricingSection
          currency={currency}
          onCurrencyChange={setCurrency}
          selectedTierId={selectedTierId}
          onSelectTierForBrief={handleSelectTierForBrief}
        />

        {/* TIMELINE DIVIDER 05 */}
        <TimelineDivider
          trackCode="TRACK_05"
          sectionLabel="FAQ_AND_PROJECT_BRIEF"
          timecode="00:01:15:00"
          playheadPercent={94}
        />

        {/* FAQ + INTERACTIVE PROJECT BRIEF FORM */}
        <BriefAndFaqSection
          currency={currency}
          selectedTierId={selectedTierId}
          selectedAspectRatio={selectedAspectRatio}
          prefilledContextNote={prefilledNote}
          onTierChange={setSelectedTierId}
          onAspectRatioChange={setSelectedAspectRatio}
        />
      </main>

      {/* QUIET ARCHITECTURAL FOOTER */}
      <footer className="w-full bg-[#040404] border-t border-white/10">
        <div className="max-w-[1440px] mx-auto border-x border-white/10 px-6 md:px-14 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 font-display text-2xl font-extrabold text-white tracking-tight">
                <span className="w-3.5 h-3.5 bg-[#ff4d00] inline-block" />
                <span>dzain.studio</span>
              </div>
              <p className="text-sm text-white/60 mt-2 max-w-md">
                AI-powered video production for brands, campaigns, products, and
                social media. Make the video look good, feel intentional, and
                communicate clearly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
              <a href="#spec-work" className="hover:text-[#ff4d00]">
                Spec Anthology
              </a>
              <a href="#why-ai-video" className="hover:text-[#ff4d00]">
                Why AI Video
              </a>
              <a href="#process" className="hover:text-[#ff4d00]">
                5-Step Process
              </a>
              <a href="#pricing" className="hover:text-[#ff4d00]">
                Duration Pricing
              </a>
              <a href="#brief-project" className="hover:text-[#ff4d00]">
                Submit Brief
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-code text-xs text-white/45">
            <div>
              © {new Date().getFullYear()} DZAIN.STUDIO — AI VIDEO PRODUCTION.
              ALL RIGHTS RESERVED.
            </div>
            <div>
              CONCEPT UNDERSTANDING · VISUAL DIRECTION · AI GENERATION · EDITING
              · SOUND & FINISHING
            </div>
          </div>
        </div>
      </footer>

      {/* Video Lightbox Modal */}
      <VideoLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        activeFilm={activeSpecFilm}
        isHeroShowreel={lightboxHeroMode}
        onSelectTierForBrief={(tierId, refTitle) =>
          handleSelectTierForBrief(
            tierId,
            `Inspired by "${refTitle}" (${tierId} tier)`
          )
        }
      />
    </div>
  );
}
