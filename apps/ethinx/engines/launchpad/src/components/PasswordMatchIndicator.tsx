import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordMatchIndicatorProps {
  password: string;
  confirmPassword: string;
}

export function PasswordMatchIndicator({ password, confirmPassword }: PasswordMatchIndicatorProps) {
  if (!confirmPassword) return null;

  const matches = password === confirmPassword;

  return (
    <div className="flex items-center gap-1.5 animate-fade-in">
      {matches ? (
        <>
          <Check className="h-3.5 w-3.5 text-success" />
          <span className="text-xs text-success">Passwords match</span>
        </>
      ) : (
        <>
          <X className="h-3.5 w-3.5 text-destructive" />
          <span className="text-xs text-destructive">Passwords don't match</span>
        </>
      )}
    </div>
  );
}
