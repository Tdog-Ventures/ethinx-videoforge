import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const modes = [
  { value: "light" as const, icon: Sun, label: "Light" },
  { value: "dark" as const, icon: Moon, label: "Dark" },
  { value: "system" as const, icon: Monitor, label: "System" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-secondary p-0.5 gap-0.5">
      {modes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={label}
          className={`inline-flex items-center justify-center rounded-full p-1.5 transition-colors duration-200 ${
            theme === value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}
