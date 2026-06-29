import React, { useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="px-3 py-1.5 border-2 border-black bg-white text-black text-xs font-mono tracking-widest hover:bg-black hover:text-white transition-colors duration-100 uppercase select-none font-bold shrink-0"
    >
      {isDark ? "LIGHT ☼" : "DARK ☾"}
    </button>
  );
}
