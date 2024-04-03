import './App.css';
import './components/loader/loader.css';
import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { FontCard } from 'renderer/components/font-card/FontCard';

const unloadedFonts = {};

function Hello() {
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    window.electron.ipcRenderer.once('retrieve-system-fonts', async (systemFontData) => {

      await document.fonts.ready;

      for (const font of document.fonts) unloadedFonts[font.family] = font;

      const filtered = systemFontData.filter((fontData) => fontData.meta);

      setFonts(filtered);

      window.scrollBy({
        top: 1000, // could be negative value
        left: 0,
        behavior: 'smooth'
      });

    });

    window.electron.ipcRenderer.sendMessage('retrieve-system-fonts');
  }, []);

  return (
    <article className='App'>
      <header className='App-header'>
        <h1>
          <span>Font<b>face</b></span>
        </h1>
      </header>

      {fonts.length === 0
        ? <div className='loader'></div>
        : <div className='card-container'>
          <p className='found'><span>{fonts.length}</span> System fonts found</p>

          {fonts.map(({ meta }, index) => <FontCard key={index} meta={meta} />)}

        </div>
      }
    </article>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Hello />} />
      </Routes>
    </Router>
  );
}
