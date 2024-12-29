import React from 'react';
import './Home.css';  // Import the Home CSS file

const Home = ({ html, setHtml, css, setCss, js, setJs, srcDoc, darkMode }) => {
  return (
    <div className={`editor-container ${darkMode ? 'dark' : 'light'}`}>
      {/* Upper section: HTML and CSS Editors */}
      <div className="editor-box">
        <textarea
          placeholder="HTML"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          className={`editor ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        />
      </div>
      <div className="editor-box">
        <textarea
          placeholder="CSS"
          value={css}
          onChange={(e) => setCss(e.target.value)}
          className={`editor ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        />
      </div>

      {/* Lower section: JavaScript Editor and Output */}
      <div className="editor-box">
        <textarea
          placeholder="JavaScript"
          value={js}
          onChange={(e) => setJs(e.target.value)}
          className={`editor ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        />
      </div>
      <div className="editor-box">
        <iframe
          srcDoc={srcDoc}
          title="Output"
          className={`output ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        />
      </div>
    </div>
  );
};

export default Home;
