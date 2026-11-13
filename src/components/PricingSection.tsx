import React, { useState } from 'react';
import {
  PRICING_TIERS,
  CurrencyCode,
  DurationTierId,
  AspectRatioFormat,
  formatPrice,
  calculateScopeEstimate,
} from '../utils/pricing';
import { Check, ArrowUpRight, Sliders } from 'lucide-react';

interface PricingSectionProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  selectedTierId: DurationTierId;
  onSelectTierForBrief: (
    tierId: DurationTierId,
    referenceNote?: string,
    aspectRatio?: AspectRatioFormat
  ) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  currency,
  onCurrencyChange,
  selectedTierId,
  onSelectTierForBrief,
}) => {
  const [calculatorSeconds, setCalculatorSeconds] = useState<number>(30);
  const [calculatorAspect, setCalculatorAspect] =
    useState<AspectRatioFormat>('16:9');

  const estimate = calculateScopeEstimate({
    durationSeconds: calculatorSeconds,
    currency,
    aspectRatio: calculatorAspect,
  });

  return (
    <section id="pricing" className="relative w-full bg-[#050505]">
      <div className="max-w-[1440px] mx-auto border-x border-white/10">
        {/* Part 1: "Built Around The Idea" — PDF Page 4 */}
        <div className="p-8 md:p-14 border-b border-white/10 bg-[#080808]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="font-mono-code text-xs uppercase tracking-widest text-[#ff4d00] mb-3">
                BUILT AROUND THE IDEA · TRANSPARENT DURATION PRICING
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
                Pricing based on the length and scale of the final video.
              </h2>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center gap-2 self-start lg:self-auto bg-[#0f0f0f] border border-white/15 p-1">
              <button
                type="button"
                onClick={() => onCurrencyChange('INR')}
                className={`px-4 py-2 text-xs font-mono-code uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                  currency === 'INR'
                    ? 'bg-[#ff4d00] text-black font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                INR (₹)
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange('USD')}
                className={`px-4 py-2 text-xs font-mono-code uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                  currency === 'USD'
                    ? 'bg-[#ff4d00] text-black font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          {/* 10 SEC / 30 SEC / 60+ SEC Trio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-white/10 bg-[#0c0c0c]">
              <div className="font-display text-3xl md:text-4xl font-extrabold text-[#ff4d00] mb-2">
                10 SEC
              </div>
              <p className="text-white/85 text-base font-medium">
                Sometimes a strong idea works best in 10 seconds.
              </p>
              <p className="text-xs text-white/50 mt-2">
                Punchy hooks, product reveals, and high-frequency social cuts.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-[#0c0c0c]">
              <div className="font-display text-3xl md:text-4xl font-extrabold text-[#ff4d00] mb-2">
                30 SEC
              </div>
              <p className="text-white/85 text-base font-medium">
                Sometimes it needs 30.
              </p>
              <p className="text-xs text-white/50 mt-2">
                The commercial standard for ads, brand stories, and product showcases.
              </p>
            </div>

            <div className="p-6 border border-white/10 bg-[#0c0c0c]">
              <div className="font-display text-3xl md:text-4xl font-extrabold text-[#ff4d00] mb-2">
                60+ SEC
              </div>
              <p className="text-white/85 text-base font-medium">
                Sometimes the story deserves a little more time.
              </p>
              <p className="text-xs text-white/50 mt-2">
                Complete brand films, world-building, and narrative-driven campaigns.
              </p>
            </div>
          </div>
        </div>

        {/* Part 2: The 4 Duration-Based Pricing Tiers (PDF Page 5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">
          {PRICING_TIERS.map((tier) => {
            const amount = currency === 'INR' ? tier.priceInr : tier.priceUsd;
            const isSelected = selectedTierId === tier.id;

            return (
              <div
                key={tier.id}
                className={`p-8 flex flex-col justify-between relative transition-colors ${
                  tier.featured
                    ? 'bg-[#0e0b09]'
                    : isSelected
                    ? 'bg-[#111111]'
                    : 'bg-[#060606]'
                }`}
              >
                {tier.featured && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff4d00]" />
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 font-mono-code text-xs uppercase tracking-widest mb-4">
                    <span className="text-[#ff4d00]">{tier.shortTag}</span>
                    {tier.featured ? (
                      <span className="text-white/80">MOST COMMISSIONED</span>
                    ) : (
                      <span className="text-white/40">{tier.deliveryDays}</span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                    {tier.label}
                  </h3>

                  <div className="mt-5 mb-4 flex items-baseline gap-2">
                    <span className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                      {formatPrice(amount, currency)}
                    </span>
                    <span className="font-mono-code text-xs text-white/50 uppercase">
                      / FINISHED FILM
                    </span>
                  </div>

                  <p className="text-sm text-white/75 leading-relaxed pb-6 border-b border-white/10">
                    {tier.idealFor}
                  </p>

                  <div className="py-6 space-y-3">
                    <div className="font-mono-code text-xs uppercase tracking-wider text-white/50 mb-2">
                      COMPLETE 5-STEP DELIVERABLE:
                    </div>
                    {tier.includedPipeline.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#ff4d00] shrink-0 mt-0.5" />
                        <span className="text-xs text-white/80 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="font-mono-code text-xs text-white/50 mb-4">
                    EST. SCALE: {tier.estimatedShots.toUpperCase()}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onSelectTierForBrief(
                        tier.id,
                        `Selected ${tier.label} package (${formatPrice(
                          amount,
                          currency
                        )})`
                      )
                    }
                    className={`w-full py-3.5 px-5 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
                      tier.featured || isSelected
                        ? 'bg-[#ff4d00] hover:bg-[#ff621f] text-black'
                        : 'bg-white/10 hover:bg-[#ff4d00] text-white hover:text-black'
                    }`}
                  >
                    <span>Select {tier.label}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Part 3: Interactive Custom Runtime & Format Calculator */}
        <div className="p-8 md:p-14 bg-[#090909]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 font-mono-code text-xs uppercase tracking-widest text-[#ff4d00]">
                <Sliders className="w-3.5 h-3.5" />
                <span>INTERACTIVE RUNTIME & FORMAT ESTIMATOR</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                Calculate exact scope for your campaign cut.
              </h3>

              {/* Duration Slider */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-sm">
                  <label
                    htmlFor="runtime-slider"
                    className="text-white/80 font-medium"
                  >
                    Target Video Runtime
                  </label>
                  <span className="font-mono-code text-[#ff4d00] font-semibold">
                    {calculatorSeconds} SECONDS ({estimate.matchedTier.label.toUpperCase()})
                  </span>
                </div>
                <input
                  id="runtime-slider"
                  type="range"
                  min={10}
                  max={90}
                  step={5}
                  value={calculatorSeconds}
                  onChange={(e) => setCalculatorSeconds(Number(e.target.value))}
                  className="w-full accent-[#ff4d00] bg-white/15 h-2 cursor-pointer"
                />
                <div className="flex justify-between font-mono-code text-xs text-white/40">
                  <span>10s</span>
                  <span>15s</span>
                  <span>30s</span>
                  <span>45s</span>
                  <span>60s</span>
                  <span>75s</span>
                  <span>90s (Extended)</span>
                </div>
              </div>

              {/* Aspect Ratio Format Selector */}
              <div className="space-y-2 pt-2">
                <div className="text-sm text-white/80 font-medium">
                  Delivery Aspect Ratio
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(
                    [
                      { id: '16:9', label: '16:9 Widescreen' },
                      { id: '9:16', label: '9:16 Vertical' },
                      { id: '1:1', label: '1:1 Square' },
                      { id: 'multi', label: 'All 3 Formats (+15%)' },
                    ] as const
                  ).map((fmt) => (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setCalculatorAspect(fmt.id)}
                      className={`px-3 py-2.5 text-xs font-mono-code uppercase border transition-colors cursor-pointer whitespace-nowrap ${
                        calculatorAspect === fmt.id
                          ? 'border-[#ff4d00] bg-[#161210] text-white'
                          : 'border-white/10 bg-[#0d0d0d] text-white/65 hover:text-white'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculator Output Box */}
            <div className="lg:col-span-5 p-6 md:p-8 border border-white/15 bg-[#0e0e0e] relative">
              <span className="pointer-events-none absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ff4d00]" />
              <span className="pointer-events-none absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ff4d00]" />
              <span className="pointer-events-none absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ff4d00]" />
              <span className="pointer-events-none absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff4d00]" />

              <div className="font-mono-code text-xs uppercase tracking-widest text-white/50 mb-1">
                ESTIMATED PRODUCTION INVESTMENT
              </div>
              <div className="font-display text-4xl md:text-5xl font-extrabold text-[#ff4d00] tracking-tight mb-4">
                {estimate.formattedTotal}
              </div>

              <div className="space-y-2 text-xs text-white/75 border-y border-white/10 py-4 mb-6 font-mono-code">
                <div className="flex justify-between">
                  <span>MATCHED TIER:</span>
                  <span className="text-white">
                    {estimate.matchedTier.label}
                    {estimate.isExtendedScale ? ` (${calculatorSeconds}s Extended)` : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>BASE PACKAGE:</span>
                  <span className="text-white">{estimate.formattedBase}</span>
                </div>
                <div className="flex justify-between">
                  <span>FORMAT DELIVERY:</span>
                  <span className="text-white">
                    {calculatorAspect === 'multi'
                      ? 'Multi-Ratio Suite (+15%)'
                      : `${calculatorAspect} Master`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>EST. TURNAROUND:</span>
                  <span className="text-white">
                    {estimate.matchedTier.deliveryDays}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onSelectTierForBrief(
                    estimate.matchedTier.id,
                    `Configured ${calculatorSeconds}s film (${estimate.formattedTotal})`,
                    calculatorAspect
                  )
                }
                className="w-full py-3.5 px-6 bg-[#ff4d00] hover:bg-[#ff621f] text-black font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Lock Scope & Brief This Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
