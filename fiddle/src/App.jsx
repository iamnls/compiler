import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import SignUp from './components/Signup'; // Import SignUp component

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const runCode = () => {
    const source = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `;
    setSrcDoc(source);
  };

  const downloadCode = () => {
    const blob = new Blob([`<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
  };

  const clearCode = () => {
    setHtml('');
    setCss('');
    setJs('');
    setSrcDoc('');
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        {/* Navbar with theme toggle */}
        <Navbar
          runCode={runCode}
          downloadCode={downloadCode}
          clearCode={clearCode}
          toggleTheme={toggleTheme}
          darkMode={darkMode}
        />

        <Routes>
          {/* Define routes here */}
          <Route path="/" element={<Home html={html} setHtml={setHtml} css={css} setCss={setCss} js={js} setJs={setJs} srcDoc={srcDoc} darkMode={darkMode} />} />  {/* Home page */}
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/signup" element={<SignUp />} />  {/* Corrected route for SignUp */}
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
