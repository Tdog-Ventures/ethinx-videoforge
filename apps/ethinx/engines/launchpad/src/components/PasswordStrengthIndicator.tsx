import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  password: string;
}

function getStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "bg-destructive" };
  if (score <= 2) return { score: 2, label: "Fair", color: "bg-orange-500" };
  if (score <= 3) return { score: 3, label: "Good", color: "bg-yellow-500" };
  if (score <= 4) return { score: 4, label: "Strong", color: "bg-primary" };
  return { score: 5, label: "Very Strong", color: "bg-green-500" };
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const { score, label, color } = useMemo(() => getStrength(password), [password]);

  if (!password) return null;

  return (
    <div className="animate-fade-in space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden"
          >
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500 ease-out",
                i <= score ? color : "bg-transparent"
              )}
              style={{
                width: i <= score ? "100%" : "0%",
                transitionDelay: `${(i - 1) * 75}ms`,
              }}
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground transition-opacity duration-300">{label}</p>
    </div>
  );
}
