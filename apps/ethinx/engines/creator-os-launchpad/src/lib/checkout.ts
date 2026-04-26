// ETHINX Stripe Checkout utility
// Works for all 3 payment types: subscription, one_time, operator_claim
// Calls the stripe-webhook Cloud Run service which handles session creation

const STRIPE_BACKEND_URL = import.meta.env.VITE_STRIPE_BACKEND_URL ||
  'https://stripe-webhook-967876404277.us-central1.run.app'

export interface CheckoutOptions {
  priceId: string
  userId: string
  userEmail: string
  projectSlug: string
  mode: 'payment' | 'subscription'
  successPath?: string
  cancelPath?: string
  metadata?: Record<string, string>
}

export async function startCheckout(opts: CheckoutOptions): Promise<void> {
  const response = await fetch(`${STRIPE_BACKEND_URL}/create-checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      price_id: opts.priceId,
      user_id: opts.userId,
      user_email: opts.userEmail,
      project_slug: opts.projectSlug,
      mode: opts.mode,
      success_url: `${window.location.origin}${opts.successPath ?? '/success'}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.origin}${opts.cancelPath ?? '/pricing'}`,
      metadata: opts.metadata ?? {},
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Checkout failed: ${err}`)
  }

  const { url } = await response.json()
  window.location.href = url
}

// Live Stripe price IDs — created 2026-03-30
export const PRICE_IDS: Record<string, { priceId: string; mode: 'payment' | 'subscription' }> = {
  'creator-compass-dash':      { priceId: 'price_1TGZZMIwTiWWr9XU5fc6xOnI', mode: 'subscription' },
  'brand-cascade':             { priceId: 'price_1TGZZNIwTiWWr9XUYjrk8nVy', mode: 'payment' },
  'pro-clip-gen':              { priceId: 'price_1TGZZOIwTiWWr9XUsNjI2Qvo', mode: 'subscription' },
  'biz-creator-path-297':      { priceId: 'price_1TGZZPIwTiWWr9XUtZLPfYTw', mode: 'payment' },
  'biz-creator-path-997':      { priceId: 'price_1TGZZRIwTiWWr9XU1uxqQumQ', mode: 'payment' },
  'ethinx-win-showcase':       { priceId: '', mode: 'payment' },
  'premium-video-forge':       { priceId: 'price_1TGZZSIwTiWWr9XULU4r5hA9', mode: 'payment' },
  'creator-blueprint-builder': { priceId: 'price_1TGZZTIwTiWWr9XU47aGnaCc', mode: 'payment' },
  'ai-engine-hub':             { priceId: 'price_1TGZZUIwTiWWr9XUTwcm6044', mode: 'subscription' },
}
