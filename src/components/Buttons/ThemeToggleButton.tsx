"use client";

import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex cursor-pointer items-center">
      <SunIcon
        size={28}
        className="h-6 w-6 -rotate-90 opacity-100 transition-all duration-300 md:h-7 md:w-7 dark:rotate-0 dark:opacity-0"
      />

      <MoonStarIcon
        size={28}
        className="absolute h-6 w-6 -rotate-90 opacity-0 transition-all duration-300 md:h-7 md:w-7 dark:rotate-0 dark:opacity-100"
      />
    </button>
  );
};

export default ThemeToggleButton;
