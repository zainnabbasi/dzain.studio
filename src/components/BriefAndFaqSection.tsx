import React, { useState, useEffect } from 'react';
import { FAQ_ITEMS } from '../data/studioData';
import {
  PRICING_TIERS,
  CurrencyCode,
  DurationTierId,
  AspectRatioFormat,
  validateProjectBrief,
  formatProjectBriefSummary,
  formatPrice,
} from '../utils/pricing';
import {
  ChevronDown,
  Send,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Loader2,
} from 'lucide-react';

interface BriefAndFaqSectionProps {
  currency: CurrencyCode;
  selectedTierId: DurationTierId;
  selectedAspectRatio: AspectRatioFormat;
  prefilledContextNote: string;
  onTierChange: (tierId: DurationTierId) => void;
  onAspectRatioChange: (ratio: AspectRatioFormat) => void;
}

export const BriefAndFaqSection: React.FC<BriefAndFaqSectionProps> = ({
  currency,
  selectedTierId,
  selectedAspectRatio,
  prefilledContextNote,
  onTierChange,
  onAspectRatioChange,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  // Brief Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brandOrProduct, setBrandOrProduct] = useState('');
  const [projectGoal, setProjectGoal] = useState('Product Launch & Showcase');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Web3Forms Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledContextNote && !ideaDescription) {
      setIdeaDescription(
        `${prefilledContextNote} — We want to create an intentional AI-directed video that communicates our core product story.`
      );
    }
  }, [prefilledContextNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateProjectBrief({
      name,
      email,
      brandOrProduct,
      selectedTierId,
      projectGoal,
      aspectRatio: selectedAspectRatio,
      ideaDescription,
      currency,
    });

    if (!validation.valid) {
      setErrors(validation.errors as Record<string, string>);
      return;
    }

    setErrors({});
    const summary = formatProjectBriefSummary({
      name,
      email,
      brandOrProduct,
      selectedTierId,
      projectGoal,
      aspectRatio: selectedAspectRatio,
      ideaDescription,
      currency,
    });

    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '73c97edc-db6c-4dc4-ab39-e35c09fdd9fa', // <-- Replace with your Web3Forms key
          subject: `New Video Brief: ${brandOrProduct} (${selectedTierId})`,
          from_name: 'dzain.studio Brief Desk',
          name,
          email,
          brand_or_product: brandOrProduct,
          project_goal: projectGoal,
          duration_tier: selectedTierId,
          aspect_ratio: selectedAspectRatio,
          currency,
          idea_description: ideaDescription,
          formatted_brief_summary: summary,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmittedSummary(summary);
      } else {
        setSubmitError(
          result.message || 'Unable to send brief right now. Please try again.'
        );
      }
    } catch {
      setSubmitError(
        'Network error while submitting your brief. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!submittedSummary) return;
    try {
      await navigator.clipboard.writeText(submittedSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
    }
  };

  return (
    <section className="relative w-full bg-[#050505]">
      <div className="max-w-[1440px] mx-auto border-x border-white/10">
        {/* Part 1: FAQ Accordion */}
        <div id="faq" className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10">
          <div className="lg:col-span-5 p-8 md:p-14 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#080808]">
            <div className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00] mb-3">
              CLARITY BEFORE PRODUCTION · FAQ
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Direct answers on process, rights, and delivery.
            </h2>
            <p className="text-white/70 text-sm md:text-base mt-4 leading-relaxed">
              Every project is scoped upfront by duration with zero hidden day
              rates. Here is how we turn concepts into campaign-ready video.
            </p>
          </div>

          <div className="lg:col-span-7 divide-y divide-white/10">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={item.question} className="bg-[#060606]">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 hover:bg-[#0c0c0c] transition-colors cursor-pointer"
                  >
                    <span className="font-display text-lg md:text-xl font-semibold text-white">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#ff4d00] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 md:px-8 pb-8 text-sm md:text-base text-white/75 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2: Conversion Project Brief Form */}
        <div
          id="brief-project"
          className="grid grid-cols-1 lg:grid-cols-12 bg-[#080808]"
        >
          {/* Left Column: Conversion Framing */}
          <div className="lg:col-span-5 p-8 md:p-14 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
            <div>
              <div className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00] mb-3">
                START YOUR PRODUCTION · STEP 01
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.08]">
                Share the idea. We build the visual world around it.
              </h2>
              <p className="text-white/70 text-base mt-5 leading-relaxed">
                Whether you have a complete script or a single sentence describing
                your product, submit your project brief below. You will receive a
                director’s visual treatment and production schedule within 24
                hours.
              </p>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-6 font-mono-code text-xs text-white/70">
                <div>01. NO RETAINER LOCK-IN · PAY PER FINISHED DURATION</div>
                <div>02. FULL COMMERCIAL & PAID MEDIA USAGE RIGHTS</div>
                <div>03. DIRECT COLLABORATION WITH THE CREATIVE DIRECTOR</div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10">
              <div className="font-mono-code text-xs text-white/45 uppercase mb-1">
                DIRECT STUDIO DESK
              </div>
              <div className="font-display text-lg font-semibold text-white">
                briefs@dzain.studio · Global Campaign Delivery
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Project Brief Form */}
          <div className="lg:col-span-7 p-8 md:p-14 bg-[#0b0b0b]">
            {submittedSummary ? (
              <div
                data-testid="brief-confirmation"
                className="p-8 border border-[#ff4d00] bg-[#110d0b] space-y-6"
              >
                <div className="flex items-center gap-3 text-[#ff4d00]">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <span className="font-mono-code text-xs uppercase tracking-widest">
                    PRODUCTION BRIEF SENT · READY FOR DIRECTION
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                  Thank you, {name}. Your video brief has been received.
                </h3>

                <p className="text-sm text-white/75 leading-relaxed">
                  We have received your structured production specification
                  below. Our creative director will review your concept and
                  reply to <span className="text-white font-medium">{email}</span>{' '}
                  with initial visual direction notes.
                </p>

                <pre className="p-4 bg-black border border-white/15 font-mono-code text-xs text-white/85 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {submittedSummary}
                </pre>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff621f] text-black font-semibold px-5 py-3 text-sm cursor-pointer whitespace-nowrap"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Brief Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Brief Specification</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmittedSummary(null)}
                    className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white/80 hover:text-white px-5 py-3 text-sm cursor-pointer whitespace-nowrap"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Edit or Submit Another Brief</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="brief-name"
                      className="block font-mono-code text-xs uppercase tracking-wider text-white/70 mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      id="brief-name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rohan Verma"
                      className="w-full bg-[#060606] border border-white/15 focus:border-[#ff4d00] px-4 py-3 text-sm text-white outline-none transition-colors"
                    />
                    {errors.name && (
                      <p className="text-xs text-[#ff4d00] mt-1.5">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="brief-email"
                      className="block font-mono-code text-xs uppercase tracking-wider text-white/70 mb-2"
                    >
                      Work or Direct Email *
                    </label>
                    <input
                      id="brief-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-[#060606] border border-white/15 focus:border-[#ff4d00] px-4 py-3 text-sm text-white outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#ff4d00] mt-1.5">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="brief-brand"
                      className="block font-mono-code text-xs uppercase tracking-wider text-white/70 mb-2"
                    >
                      Brand / Product / Campaign Name *
                    </label>
                    <input
                      id="brief-brand"
                      name="brand_or_product"
                      type="text"
                      value={brandOrProduct}
                      onChange={(e) => setBrandOrProduct(e.target.value)}
                      placeholder="e.g. Aetheria Fragrance Launch"
                      className="w-full bg-[#060606] border border-white/15 focus:border-[#ff4d00] px-4 py-3 text-sm text-white outline-none transition-colors"
                    />
                    {errors.brandOrProduct && (
                      <p className="text-xs text-[#ff4d00] mt-1.5">
                        {errors.brandOrProduct}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="brief-goal"
                      className="block font-mono-code text-xs uppercase tracking-wider text-white/70 mb-2"
                    >
                      Primary Video Objective
                    </label>
                    <select
                      id="brief-goal"
                      name="project_goal"
                      value={projectGoal}
                      onChange={(e) => setProjectGoal(e.target.value)}
                      className="w-full bg-[#060606] border border-white/15 focus:border-[#ff4d00] px-4 py-3 text-sm text-white outline-none transition-colors"
                    >
                      <option value="Product Launch & Showcase">
                        Product Launch & Showcase
                      </option>
                      <option value="Paid Social & Performance Ad">
                        Paid Social & Performance Ad
                      </option>
                      <option value="Brand Story & Manifesto Film">
                        Brand Story & Manifesto Film
                      </option>
                      <option value="Campaign Announcement Creative">
                        Campaign Announcement Creative
                      </option>
                    </select>
                  </div>
                </div>

                {/* Duration Package Selector */}
                <div>
                  <label className="block font-mono-code text-xs uppercase tracking-wider text-white/70 mb-2">
                    Target Video Duration Tier
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {PRICING_TIERS.map((tier) => {
                      const price =
                        currency === 'INR' ? tier.priceInr : tier.priceUsd;
                      const active = selectedTierId === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => onTierChange(tier.id)}
                          className={`p-3 border text-left transition-colors cursor-pointer ${
                            active
                              ? 'border-[#ff4d00] bg-[#161210] text-white'
                              : 'border-white/15 bg-[#060606] text-white/70 hover:text-white'
                          }`}
                        >
                          <div className="font-mono-code text-xs text-[#ff4d00]">
                            {tier.shortTag}
                          </div>
                          <div className="font-display font-bold text-sm mt-0.5">
                            {formatPrice(price, currency)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Format Selection */}
                <div>
                  <label className="block font-mono-code text-xs uppercase tracking-wider text-white/70 mb-2">
                    Aspect Ratio Format
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {(
                      [
                        { id: '16:9', label: '16:9 Horizontal' },
                        { id: '9:16', label: '9:16 Vertical' },
                        { id: '1:1', label: '1:1 Square' },
                        { id: 'multi', label: 'Multi-Format (+15%)' },
                      ] as const
                    ).map((ratio) => (
                      <button
                        key={ratio.id}
                        type="button"
                        onClick={() => onAspectRatioChange(ratio.id)}
                        className={`py-2.5 px-3 border font-mono-code text-xs uppercase transition-colors cursor-pointer whitespace-nowrap ${
                          selectedAspectRatio === ratio.id
                            ? 'border-[#ff4d00] bg-[#161210] text-white'
                            : 'border-white/15 bg-[#060606] text-white/65 hover:text-white'
                        }`}
                      >
                        {ratio.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Idea & Communication Description */}
                <div>
                  <label
                    htmlFor="brief-idea"
                    className="block font-mono-code text-xs uppercase tracking-wider text-white/70 mb-2"
                  >
                    The Idea & What the Video Needs to Communicate *
                  </label>
                  <textarea
                    id="brief-idea"
                    name="idea_description"
                    rows={4}
                    value={ideaDescription}
                    onChange={(e) => setIdeaDescription(e.target.value)}
                    placeholder="Share your rough idea, desired mood, environment, or what the viewer should feel and understand..."
                    className="w-full bg-[#060606] border border-white/15 focus:border-[#ff4d00] p-4 text-sm text-white outline-none transition-colors"
                  />
                  {errors.ideaDescription && (
                    <p className="text-xs text-[#ff4d00] mt-1.5">
                      {errors.ideaDescription}
                    </p>
                  )}
                </div>

                {submitError && (
                  <p className="text-xs text-[#ff4d00] bg-[#160a06] border border-[#ff4d00]/40 p-3">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#ff4d00] hover:bg-[#ff621f] disabled:opacity-60 text-black font-semibold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Project Brief...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Project Brief & Request Visual Direction</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};