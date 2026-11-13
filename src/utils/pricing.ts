export type CurrencyCode = 'INR' | 'USD';

export type DurationTierId = '15s' | '30s' | '45s' | '60s';

export type AspectRatioFormat = '16:9' | '9:16' | '1:1' | 'multi';

export interface PricingTier {
  id: DurationTierId;
  label: string;
  shortTag: string;
  maxSeconds: number;
  priceInr: number;
  priceUsd: number;
  idealFor: string;
  estimatedShots: string;
  deliveryDays: string;
  featured?: boolean;
  includedPipeline: string[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: '15s',
    label: 'Up to 15 seconds',
    shortTag: '10–15 SEC',
    maxSeconds: 15,
    priceInr: 5000,
    priceUsd: 65,
    idealFor: 'Ideal for short social videos, product moments, announcements and quick campaign creatives.',
    estimatedShots: '4–6 intentional AI shots',
    deliveryDays: '3–4 business days',
    includedPipeline: [
      '01. Concept Understanding & hook framing',
      '02. Visual Direction & style moodboard',
      '03. High-definition AI Shot Generation',
      '04. Precision Pacing & Cut Editing',
      '05. Sound Design, Mix & Final Master',
    ],
  },
  {
    id: '30s',
    label: 'Up to 30 seconds',
    shortTag: '30 SEC',
    maxSeconds: 30,
    priceInr: 10000,
    priceUsd: 125,
    idealFor: 'Ideal for ads, brand stories, product showcases and social campaigns.',
    estimatedShots: '8–12 cohesive scenes',
    deliveryDays: '5–6 business days',
    featured: true,
    includedPipeline: [
      '01. Concept Understanding & narrative arc',
      '02. Custom Visual Language & look development',
      '03. Multi-environment AI Scene Generation',
      '04. Commercial Narrative Pacing & Grading',
      '05. Custom Soundscape, SFX & Final Master',
    ],
  },
  {
    id: '45s',
    label: 'Up to 45 seconds',
    shortTag: '45 SEC',
    maxSeconds: 45,
    priceInr: 14000,
    priceUsd: 175,
    idealFor: 'Ideal for more detailed storytelling, campaign films and concept-led videos.',
    estimatedShots: '12–18 directed shots',
    deliveryDays: '6–8 business days',
    includedPipeline: [
      '01. Deep Brief & Campaign Strategy Alignment',
      '02. World-Building & Visual Direction Bible',
      '03. Complex Camera & Environment Generation',
      '04. Editorial Rhythm, Transitions & Color Pass',
      '05. Full Musical Score, Foley & Stem Finishing',
    ],
  },
  {
    id: '60s',
    label: 'Up to 60 seconds',
    shortTag: '60+ SEC',
    maxSeconds: 60,
    priceInr: 18000,
    priceUsd: 225,
    idealFor: 'Ideal for complete brand films, product stories and longer narrative-driven content.',
    estimatedShots: '18–26 cinematic sequences',
    deliveryDays: '8–10 business days',
    includedPipeline: [
      '01. Full Script & Director Treatment',
      '02. Bespoke Visual World & Product Integration',
      '03. Flagship Multi-Scene AI Cinematography',
      '04. Director-Cut Assembly, Rhythm & Finishing',
      '05. Mastered Cinema Audio & Multi-Platform Delivery',
    ],
  },
];

export interface ScopeEstimateInput {
  durationSeconds: number;
  currency: CurrencyCode;
  aspectRatio: AspectRatioFormat;
}

export interface ScopeEstimateResult {
  matchedTier: PricingTier;
  basePrice: number;
  aspectRatioAddon: number;
  totalPrice: number;
  formattedTotal: string;
  formattedBase: string;
  isExtendedScale: boolean;
}

/**
 * Resolves any positive duration in seconds to the appropriate PDF pricing tier.
 */
export function resolveTierByDuration(durationSeconds: number): PricingTier {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 15) {
    return PRICING_TIERS[0];
  }
  if (durationSeconds <= 30) {
    return PRICING_TIERS[1];
  }
  if (durationSeconds <= 45) {
    return PRICING_TIERS[2];
  }
  return PRICING_TIERS[3];
}

/**
 * Formats an integer amount in INR or USD with clean locale separators.
 */
export function formatPrice(amount: number, currency: CurrencyCode): string {
  const safeAmount = Math.max(0, Math.round(amount));
  if (currency === 'INR') {
    return `₹${safeAmount.toLocaleString('en-IN')}`;
  }
  return `$${safeAmount.toLocaleString('en-US')}`;
}

/**
 * Calculates the project scope estimate based on duration, currency, and aspect ratio format.
 */
export function calculateScopeEstimate(input: ScopeEstimateInput): ScopeEstimateResult {
  const safeSeconds = Math.max(5, Math.min(120, Math.round(input.durationSeconds || 30)));
  const matchedTier = resolveTierByDuration(safeSeconds);
  const isExtendedScale = safeSeconds > 60;

  let basePrice = input.currency === 'INR' ? matchedTier.priceInr : matchedTier.priceUsd;

  // If over 60 seconds (e.g. 75s or 90s), scale proportionally per 15s block
  if (isExtendedScale) {
    const extraBlocks = Math.ceil((safeSeconds - 60) / 15);
    const perBlockIncrement = input.currency === 'INR' ? 4000 : 50;
    basePrice += extraBlocks * perBlockIncrement;
  }

  // Multi-ratio adaptation (16:9 + 9:16 + 1:1 re-framing) adds 15%
  const aspectRatioAddon =
    input.aspectRatio === 'multi' ? Math.round(basePrice * 0.15) : 0;

  const totalPrice = basePrice + aspectRatioAddon;

  return {
    matchedTier,
    basePrice,
    aspectRatioAddon,
    totalPrice,
    formattedBase: formatPrice(basePrice, input.currency),
    formattedTotal: formatPrice(totalPrice, input.currency),
    isExtendedScale,
  };
}

export interface ProjectBriefInput {
  name: string;
  email: string;
  phone?: string;
  brandOrProduct: string;
  selectedTierId: DurationTierId;
  projectGoal: string;
  aspectRatio: AspectRatioFormat;
  ideaDescription: string;
  currency: CurrencyCode;
}

export interface BriefValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ProjectBriefInput, string>>;
}

export function validateProjectBrief(input: ProjectBriefInput): BriefValidationResult {
  const errors: Partial<Record<keyof ProjectBriefInput, string>> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please enter a valid work or personal email address.';
  }

  if (!input.brandOrProduct || input.brandOrProduct.trim().length < 2) {
    errors.brandOrProduct = 'Please specify the brand, product, or campaign name.';
  }

  if (!input.ideaDescription || input.ideaDescription.trim().length < 15) {
    errors.ideaDescription = 'Share at least a short sentence (15+ characters) about what the video needs to communicate.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatProjectBriefSummary(input: ProjectBriefInput): string {
  const tier = PRICING_TIERS.find((t) => t.id === input.selectedTierId) ?? PRICING_TIERS[1];
  const estimate = calculateScopeEstimate({
    durationSeconds: tier.maxSeconds,
    currency: input.currency,
    aspectRatio: input.aspectRatio,
  });

  const contactLine = input.phone && input.phone.trim()
    ? `Client: ${input.name.trim()} (${input.email.trim()} · WhatsApp/Phone: ${input.phone.trim()})`
    : `Client: ${input.name.trim()} (${input.email.trim()})`;

  return [
    `DZAIN.STUDIO — PRODUCTION BRIEF`,
    contactLine,
    `Brand / Subject: ${input.brandOrProduct.trim()}`,
    `Selected Scale: ${tier.label} (${tier.shortTag})`,
    `Primary Objective: ${input.projectGoal}`,
    `Delivery Format: ${input.aspectRatio === 'multi' ? 'Multi-Format Suite (16:9 + 9:16 + 1:1)' : input.aspectRatio}`,
    `Estimated Investment: ${estimate.formattedTotal}`,
    `Concept & Communication Notes: ${input.ideaDescription.trim()}`,
  ].join('\n');
}
