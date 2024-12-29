import React from 'react';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = ({ runCode, downloadCode, clearCode, toggleTheme, darkMode }) => {
  return (
    <div>
      <nav className={`bg-white border-gray-200 dark:bg-gray-900`}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-9 mr-3" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              JsCompiler
            </span>
          </a>

          <div className="flex items-center space-x-4">
            {/* Action buttons for Run, Download, Clear */}
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={runCode}
            >
              Run
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={downloadCode}
            >
              Download
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={clearCode}
            >
              Clear
            </button>

            {/* Theme Toggle */}
            <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />

            {/* Login and Sign Up */}
            <button
              className="px-4 py-2 border border-gray-500 text-gray-800 rounded hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              <Link to="/signup">Signup</Link>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
