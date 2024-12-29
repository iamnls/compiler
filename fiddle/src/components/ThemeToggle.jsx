import React from 'react';

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 border border-gray-500 rounded text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
