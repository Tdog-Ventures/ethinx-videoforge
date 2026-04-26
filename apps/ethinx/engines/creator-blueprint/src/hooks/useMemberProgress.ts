import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

interface MemberProgress {
  id: string;
  email: string;
  current_week: number;
  modules_completed: string[];
  last_accessed: string;
}

export const useMemberProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<MemberProgress | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch or create row on mount
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchOrCreate = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("member_progress")
        .select("*")
        .eq("email", user.email!)
        .maybeSingle();

      if (error) {
        console.error("Error fetching progress:", error);
        setLoading(false);
        return;
      }

      if (data) {
        setProgress(data as MemberProgress);
      } else {
        // Auto-create row for new user
        const { data: created, error: insertErr } = await supabase
          .from("member_progress")
          .insert({ email: user.email! })
          .select()
          .single();

        if (!insertErr && created) {
          setProgress(created as MemberProgress);
        }
      }
      setLoading(false);
    };

    fetchOrCreate();
  }, [user?.email]);

  const toggleModule = useCallback(
    async (lessonId: string) => {
      if (!progress) return;

      const current = progress.modules_completed ?? [];
      const next = current.includes(lessonId)
        ? current.filter((id) => id !== lessonId)
        : [...current, lessonId];

      // Optimistic update
      setProgress((prev) => prev ? { ...prev, modules_completed: next } : prev);

      const { error } = await supabase
        .from("member_progress")
        .update({ modules_completed: next, last_accessed: new Date().toISOString() })
        .eq("id", progress.id);

      if (error) {
        // Rollback
        setProgress((prev) => prev ? { ...prev, modules_completed: current } : prev);
        console.error("Error saving progress:", error);
      }
    },
    [progress]
  );

  return { progress, loading, toggleModule };
};
