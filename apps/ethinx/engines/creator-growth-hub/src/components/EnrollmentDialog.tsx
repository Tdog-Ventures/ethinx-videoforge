import { useState, useRef } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Strip all HTML tags from a string */
function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}

const enrollmentSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
});

interface EnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tier: string;
  tierLabel: string;
  sourcePage: string;
}

export function EnrollmentDialog({
  open,
  onOpenChange,
  tier,
  tierLabel,
  sourcePage,
}: EnrollmentDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const cooldownRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Rate limit: 5s cooldown
    if (cooldownRef.current) {
      toast.info("Please wait a few seconds before submitting again.");
      return;
    }

    // Sanitize inputs
    const sanitizedName = stripHtml(name);
    const sanitizedEmail = stripHtml(email);

    const result = enrollmentSchema.safeParse({ name: sanitizedName, email: sanitizedEmail });
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as "name" | "email"] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    // Start cooldown
    cooldownRef.current = true;
    setTimeout(() => {
      cooldownRef.current = false;
    }, 5000);

    const { error } = await supabase.from("enrollments").insert({
      name: result.data.name,
      email: result.data.email,
      tier,
      source_page: sourcePage,
    });

    if (error) {
      setLoading(false);
      if (error.code === "23505") {
        toast.info("You're already enrolled in this tier! Check your email for details.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      return;
    }

    // Send confirmation email via edge function (fire-and-forget)
    supabase.functions
      .invoke("send-enrollment-confirmation", {
        body: { name: result.data.name, email: result.data.email, tier },
      })
      .then(({ error: fnError }) => {
        if (fnError) console.error("Email send error:", fnError);
      });

    setLoading(false);
    toast.success("Enrolled! Check your email for confirmation.");
    setName("");
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enroll in {tierLabel}</DialogTitle>
          <DialogDescription>
            Enter your details to get started.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="enroll-name">Name</Label>
            <Input
              id="enroll-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={100}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="enroll-email">Email</Label>
            <Input
              id="enroll-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              maxLength={255}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Enrolling…" : "Get Started"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
