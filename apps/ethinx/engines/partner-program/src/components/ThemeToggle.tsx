import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const modes: { value: "light" | "dark" | "system"; icon: typeof Sun }[] = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center rounded-full border border-border bg-muted/50 p-0.5">
      {modes.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={`Switch to ${value} theme`}
          className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${
            theme === value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
