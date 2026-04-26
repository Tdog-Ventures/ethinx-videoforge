// ETHINX Auth Guard — wrap protected routes with this component
// Usage: <AuthGuard requireSubscription><YourPage /></AuthGuard>

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'

interface AuthGuardProps {
  children: React.ReactNode
  requireSubscription?: boolean
  redirectTo?: string
}

export function AuthGuard({
  children,
  requireSubscription = false,
  redirectTo = '/',
}: AuthGuardProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)

      if (!session) {
        setLoading(false)
        return
      }

      if (requireSubscription) {
        const { data: sub } = await supabase
          .from('ethinx_subscriptions')
          .select('status')
          .eq('user_id', session.user.id)
          .eq('status', 'active')
          .maybeSingle()
        setHasAccess(!!sub)
      } else {
        setHasAccess(true)
      }

      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [requireSubscription])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00FF88] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    window.location.href = redirectTo
    return null
  }

  if (requireSubscription && !hasAccess) {
    window.location.href = '/pricing'
    return null
  }

  return <>{children}</>
}
