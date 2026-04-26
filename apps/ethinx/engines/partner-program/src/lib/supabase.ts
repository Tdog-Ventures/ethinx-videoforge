// ETHINX Shared Supabase Client
// Project: eejnkddyhrxzaunlksag
// Inject into every Lovable project — identical across all 8 apps
// Reads from VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

export type UserRole = 'admin' | 'member' | 'partner'

export async function getUserRole(userId: string): Promise<UserRole | null> {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single()

  if (error || !data) return null
  return data.role as UserRole
}

export async function isAdmin(userId: string): Promise<boolean> {
  const role = await getUserRole(userId)
  return role === 'admin'
}

export async function getSubscription(userId: string) {
  const { data } = await supabase
    .from('ethinx_subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()
  return data
}
