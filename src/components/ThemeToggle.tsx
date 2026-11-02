import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { getTheme, toggleTheme, type Theme } from "../theme";
import { DEFAULT_LOCALE, type Locale } from "../locale";
import { UI_MESSAGES } from "../messages";

interface ThemeToggleProps {
  /** Language of the accessible label. English unless the tool has turned languages on. */
  locale?: Locale;
}

export function ThemeToggle({ locale = DEFAULT_LOCALE }: ThemeToggleProps = {}) {
  const [theme, setTheme] = useState<Theme>("dark");
  const t = UI_MESSAGES[locale];

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  const handleToggle = () => {
    const next = toggleTheme();
    setTheme(next);
  };

  return (
    <button
      onClick={handleToggle}
      className="theme-toggle"
      aria-label={theme === "dark" ? t.switchToLight : t.switchToDark}
    >
      {theme === "dark" ? (
        <Sun size={16} strokeWidth={1.5} />
      ) : (
        <Moon size={16} strokeWidth={1.5} />
      )}
    </button>
  );
}
