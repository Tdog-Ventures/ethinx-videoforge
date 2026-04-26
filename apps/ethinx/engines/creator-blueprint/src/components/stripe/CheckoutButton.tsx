// ETHINX Checkout Button — drop into any Lovable project
// Example: <CheckoutButton projectSlug="biz-creator-path-297" label="Get Creator System — $297" />

import { useState } from 'react'
import { startCheckout, PRICE_IDS } from './checkout'
import { useAuth } from '../auth/useAuth'

interface CheckoutButtonProps {
  projectSlug: keyof typeof PRICE_IDS
  label: string
  className?: string
  metadata?: Record<string, string>
}

export function CheckoutButton({ projectSlug, label, className, metadata }: CheckoutButtonProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const config = PRICE_IDS[projectSlug]

  const handleClick = async () => {
    if (!user) {
      window.location.href = '/auth'
      return
    }

    if (!config?.priceId) {
      setError('Product not yet available. Check back soon.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await startCheckout({
        priceId: config.priceId,
        userId: user.id,
        userEmail: user.email ?? '',
        projectSlug,
        mode: config.mode,
        metadata,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={className ?? [
          'px-8 py-4 rounded-lg font-bold text-lg',
          'bg-[#00FF88] text-[#0a0a0a]',
          'hover:bg-[#00CC6A] transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'w-full sm:w-auto',
        ].join(' ')}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
            Processing…
          </span>
        ) : label}
      </button>
      {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
    </div>
  )
}
