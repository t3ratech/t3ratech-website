import { useEffect, useState } from "react";

/**
 * A product's price, read from WavePay's public `/v2/pricing` — the figure checkout charges.
 *
 * This page used to carry "$29.99" and a launch date in its markup, which went stale the
 * day the gateway's price changed. Until the gateway answers (or if it cannot be reached)
 * the hook returns null and the page says "one-time" with no figure.
 */
export const WAVEPAY_ORIGIN = "https://t3rnel-wavepay-production.t3ratech.workers.dev";

export interface PlanPricing {
  price: string;
  promotion: { price: string; ends: string; requiresCode: boolean } | null;
}

function money(minor: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(minor / 100);
  } catch {
    return `${(minor / 100).toFixed(2)} ${currency}`;
  }
}

export function usePricing(productId: string, planId: string): PlanPricing | null {
  const [pricing, setPricing] = useState<PlanPricing | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${WAVEPAY_ORIGIN}/v2/pricing?productId=${encodeURIComponent(productId)}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((body) => {
        const plan = body?.plans?.find((p: { planId?: string }) => p.planId === planId);
        const price = plan?.prices?.find((p: { amountMinor?: unknown; currency?: unknown }) => typeof p.amountMinor === "number" && typeof p.currency === "string");
        if (!price) return;
        const promo = plan.promotion;
        const live = promo && typeof promo.amountMinor === "number" && typeof promo.endsAt === "number" && promo.endsAt * 1000 >= Date.now();
        setPricing({
          price: money(price.amountMinor, price.currency),
          promotion: live
            ? {
                price: money(promo.amountMinor, promo.currency ?? price.currency),
                ends: new Intl.DateTimeFormat(undefined, { dateStyle: "long", timeZone: "UTC" }).format(new Date(promo.endsAt * 1000)),
                requiresCode: promo.requiresCode === true,
              }
            : null,
        });
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [productId, planId]);
  return pricing;
}
