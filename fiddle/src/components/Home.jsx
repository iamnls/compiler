import React from 'react';
import './Home.css';

const Home = ({ html, setHtml, css, setCss, js, setJs, srcDoc, setSrcDoc, darkMode }) => {
  const templates = [
    { label: 'Tailwind Checkboxes', html: '<input type="checkbox" class="form-checkbox" />', css: '', js: '' },
    { label: 'Import a JS Module', html: '<h1>Hello, Module!</h1>', css: '', js: "import message from './module.js'; console.log(message);" },
    { label: 'jQuery', html: '<div id="box">Click Me</div>', css: '#box { width: 100px; height: 100px; background: red; }', js: "$('#box').click(() => alert('Clicked!'));" },
    { label: 'React', html: '<div id="root"></div>', css: '', js: "ReactDOM.render(<h1>Hello React</h1>, document.getElementById('root'));" },
    { label: 'React + JSX', html: '<div id="root"></div>', css: '', js: "const App = () => <h1>Hello JSX</h1>; ReactDOM.render(<App />, document.getElementById('root'));" },
    { label: 'Preact', html: '<div id="root"></div>', css: '', js: "Preact.render(<h1>Hello Preact</h1>, document.getElementById('root'));" },
    { label: 'TypeScript', html: '<h1>Hello TypeScript</h1>', css: '', js: "let message: string = 'Hello, World!'; console.log(message);" },
    { label: 'CoffeeScript', html: '<h1>Hello CoffeeScript</h1>', css: '', js: "alert \"Hello CoffeeScript!\"" },
    { label: 'SCSS', html: '<div class="box"></div>', css: ".box { width: 100px; height: 100px; background: blue; &:hover { background: green; } }", js: '' },
    { label: 'CSS Grid', html: '<div class="grid-container"><div>1</div><div>2</div><div>3</div></div>', css: ".grid-container { display: grid; grid-template-columns: repeat(3, 1fr); }", js: '' },
    { label: 'Bootstrap', html: '<button class="btn btn-primary">Click Me</button>', css: '', js: '' },
    { label: 'PostCSS', html: '<div class="postcss-example">Hello PostCSS</div>', css: '.postcss-example { color: purple; }', js: '' },
  ];

  const loadTemplate = (template) => {
    setHtml(template.html);
    setCss(template.css);
    setJs(template.js);
    setSrcDoc(`
      <html>
        <style>${template.css}</style>
        <body>${template.html}</body>
        <script>${template.js}</script>
      </html>
    `);
  };

  return (
    <div className={`editor-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="editor-box">
        <div className="text">HTML</div>
        <textarea
          placeholder="HTML"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          className={`editor ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        />
      </div>
      <div className="editor-box">
        <div className="text">CSS</div>
        <textarea
          placeholder="CSS"
          value={css}
          onChange={(e) => setCss(e.target.value)}
          className={`editor ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        />
      </div>
      <div className="editor-box">
        <div className="text">Javascript</div>
        <textarea
          placeholder="JavaScript"
          value={js}
          onChange={(e) => setJs(e.target.value)}
          className={`editor ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        />
      </div>
      <div className="editor-box">
        <div className="text">Output</div>
        <iframe
          srcDoc={srcDoc}
          title="Output"
          className={`output ${darkMode ? 'bg-white' : 'bg-white'}`}
        />
      
        <h2 className="boilerplate-heading">Start with a boilerplate:</h2>
        <div className="result-buttons" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          {templates.map((template, index) => (
            <button
              key={index}
              onClick={() => loadTemplate(template)}
              className="template-button"
            >
              {template.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
