import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

const modes: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card/80 backdrop-blur-md p-1">
      {modes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={`Switch to ${label} theme`}
          className={cn(
            "p-2 rounded-full transition-all duration-200",
            theme === value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
