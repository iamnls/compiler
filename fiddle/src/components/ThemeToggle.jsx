import React from 'react';

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 dark:bg-black"
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
