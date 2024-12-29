import React, { useState, useEffect } from 'react';

import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';



const App = () => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedHtml = localStorage.getItem('html');
    const savedCss = localStorage.getItem('css');
    const savedJs = localStorage.getItem('js');

    if (savedHtml || savedCss || savedJs) {
      setHtml(savedHtml || '');
      setCss(savedCss || '');
      setJs(savedJs || '');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('html', html);
    localStorage.setItem('css', css);
    localStorage.setItem('js', js);
  }, [html, css, js]);

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
    setError('');
  };

  const downloadCode = () => {
    const blob = new Blob([
      `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`
    ], { type: 'text/html' });
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
  };

  return (
    <div className="app">
      <Navbar />
      <div className="editor-container">
        <textarea
          placeholder="HTML"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
        <textarea
          placeholder="CSS"
          value={css}
          onChange={(e) => setCss(e.target.value)}
        />
        <textarea
          placeholder="JavaScript"
          value={js}
          onChange={(e) => setJs(e.target.value)}
        />
      </div>
      <div className="actions">
        <button onClick={runCode}>Run</button>
        <button onClick={downloadCode}>Download</button>
        <button onClick={clearCode}>Clear</button>
      </div>
      <iframe
        srcDoc={srcDoc}
        title="Output"
        className="output"
      />
      <Footer />
    </div>
  );
};

export default App;
