import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, type Theme } from "./ThemeProvider";

const modes: { value: Theme; icon: typeof Sun }[] = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
];

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center rounded-full border border-border bg-secondary/50 p-1 gap-0.5">
      {modes.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`p-1.5 rounded-full transition-all duration-200 ${
            theme === value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label={`${value} theme`}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
};
