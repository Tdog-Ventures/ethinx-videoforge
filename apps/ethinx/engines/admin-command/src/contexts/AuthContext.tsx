import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  lastLogin: string | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  isAdmin: false,
  lastLogin: null,
  signOut: async () => {},
});

async function checkAdminRole(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  return !!data;
}

async function insertAuditLog(userId: string, email: string, action: string, note?: string) {
  await supabase.from("admin_audit").insert({
    actor_user_id: userId,
    target_user_id: userId,
    target_email: email,
    action,
    note: note ?? null,
  });
}

async function fetchLastLogin(userId: string): Promise<string | null> {
  const { data } = await supabase
    .from("admin_audit")
    .select("ts")
    .eq("actor_user_id", userId)
    .eq("action", "login")
    .order("ts", { ascending: false })
    .limit(2);
  // Return the second most recent (previous login), or the first if only one
  if (data && data.length >= 2) return data[1].ts;
  if (data && data.length === 1) return data[0].ts;
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [lastLogin, setLastLogin] = useState<string | null>(null);

  const handleSession = async (newSession: Session | null, isNewLogin: boolean) => {
    if (!newSession?.user) {
      setSession(null);
      setIsAdmin(false);
      setLastLogin(null);
      setIsLoading(false);
      return;
    }

    const admin = await checkAdminRole(newSession.user.id);
    if (!admin) {
      toast({
        title: "Access Denied",
        description: "You do not have admin privileges.",
        variant: "destructive",
      });
      await supabase.auth.signOut();
      setSession(null);
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    setSession(newSession);
    setIsAdmin(true);

    if (isNewLogin) {
      await insertAuditLog(newSession.user.id, newSession.user.email ?? "", "login", "dashboard login");
    }

    const last = await fetchLastLogin(newSession.user.id);
    setLastLogin(last);
    setIsLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        if (event === "SIGNED_IN") {
          setTimeout(() => handleSession(session, true), 0);
        } else if (event === "SIGNED_OUT") {
          setSession(null);
          setIsAdmin(false);
          setLastLogin(null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) handleSession(session, false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    if (session?.user) {
      await insertAuditLog(session.user.id, session.user.email ?? "", "logout", "dashboard logout");
    }
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, isLoading, isAdmin, lastLogin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
