import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  PRICING_TIERS,
  resolveTierByDuration,
  formatPrice,
  calculateScopeEstimate,
  validateProjectBrief,
  formatProjectBriefSummary,
} from './pricing.ts';

describe('AI Video Production Pricing & Brief Logic', () => {
  it('matches exact PDF duration tiers and INR rates', () => {
    assert.equal(PRICING_TIERS.length, 4);
    assert.equal(PRICING_TIERS[0].priceInr, 5000);
    assert.equal(PRICING_TIERS[1].priceInr, 10000);
    assert.equal(PRICING_TIERS[2].priceInr, 14000);
    assert.equal(PRICING_TIERS[3].priceInr, 18000);
  });

  it('resolves arbitrary durations to the right tier', () => {
    assert.equal(resolveTierByDuration(10).id, '15s');
    assert.equal(resolveTierByDuration(15).id, '15s');
    assert.equal(resolveTierByDuration(20).id, '30s');
    assert.equal(resolveTierByDuration(30).id, '30s');
    assert.equal(resolveTierByDuration(42).id, '45s');
    assert.equal(resolveTierByDuration(60).id, '60s');
    assert.equal(resolveTierByDuration(90).id, '60s');
  });

  it('formats INR and USD currencies cleanly', () => {
    assert.equal(formatPrice(5000, 'INR'), '₹5,000');
    assert.equal(formatPrice(18000, 'INR'), '₹18,000');
    assert.equal(formatPrice(125, 'USD'), '$125');
  });

  it('calculates scope estimate including multi-aspect-ratio addon and 60s+ scaling', () => {
    const standard30 = calculateScopeEstimate({
      durationSeconds: 30,
      currency: 'INR',
      aspectRatio: '16:9',
    });
    assert.equal(standard30.basePrice, 10000);
    assert.equal(standard30.aspectRatioAddon, 0);
    assert.equal(standard30.totalPrice, 10000);
    assert.equal(standard30.formattedTotal, '₹10,000');

    const multi30 = calculateScopeEstimate({
      durationSeconds: 30,
      currency: 'INR',
      aspectRatio: 'multi',
    });
    assert.equal(multi30.aspectRatioAddon, 1500);
    assert.equal(multi30.totalPrice, 11500);

    const extended75 = calculateScopeEstimate({
      durationSeconds: 75,
      currency: 'INR',
      aspectRatio: '16:9',
    });
    assert.equal(extended75.isExtendedScale, true);
    assert.equal(extended75.basePrice, 22000);
  });

  it('validates project brief inputs and rejects invalid emails or short descriptions', () => {
    const invalid = validateProjectBrief({
      name: 'A',
      email: 'not-an-email',
      brandOrProduct: '',
      selectedTierId: '30s',
      projectGoal: 'Product Launch',
      aspectRatio: '16:9',
      ideaDescription: 'Too short',
      currency: 'INR',
    });
    assert.equal(invalid.valid, false);
    assert.ok(invalid.errors.name);
    assert.ok(invalid.errors.email);
    assert.ok(invalid.errors.brandOrProduct);
    assert.ok(invalid.errors.ideaDescription);

    const valid = validateProjectBrief({
      name: 'Aarav Mehta',
      email: 'aarav@luxurywatch.co',
      brandOrProduct: 'Chronos Obsidian Watch',
      selectedTierId: '30s',
      projectGoal: 'Product Showcase & Paid Social',
      aspectRatio: '16:9',
      ideaDescription: 'We want a high-contrast macro showcase of the watch emerging from volcanic glass.',
      currency: 'INR',
    });
    assert.equal(valid.valid, true);
    assert.equal(Object.keys(valid.errors).length, 0);

    const summary = formatProjectBriefSummary({
      name: 'Aarav Mehta',
      email: 'aarav@luxurywatch.co',
      brandOrProduct: 'Chronos Obsidian Watch',
      selectedTierId: '30s',
      projectGoal: 'Product Showcase & Paid Social',
      aspectRatio: '16:9',
      ideaDescription: 'We want a high-contrast macro showcase of the watch emerging from volcanic glass.',
      currency: 'INR',
    });
    assert.ok(summary.includes('₹10,000'));
    assert.ok(summary.includes('Chronos Obsidian Watch'));
  });
});
