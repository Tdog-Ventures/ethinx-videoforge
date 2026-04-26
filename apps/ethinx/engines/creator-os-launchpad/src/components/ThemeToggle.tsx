import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const modes = [
  { value: "light" as const, icon: Sun, label: "Light" },
  { value: "dark" as const, icon: Moon, label: "Dark" },
  { value: "system" as const, icon: Monitor, label: "System" },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-card/80 p-1 gap-0.5 backdrop-blur-sm">
      {modes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={`${label} theme`}
          className={`rounded-full p-2 transition-all duration-200 ${
            theme === value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
