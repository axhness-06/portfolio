import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/sections/HeroSection';
import { MarqueeSection } from './components/sections/MarqueeSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { WebDesignSection } from './components/sections/WebDesignSection';
import { ShowcaseSection } from './components/sections/ShowcaseSection';
import CursorGrid from './components/ui/CursorGrid';

function App() {
  const [cursorColor, setCursorColor] = useState('#FF4500');
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (['creative', 'showcase'].includes(entry.target.id)) {
            setCursorColor('#FFFFFF');
          } else {
            setCursorColor('#FF4500');
          }
        }
      });
    }, { threshold: 0.3 });

    const sections = document.querySelectorAll('section');
    sections.forEach(sec => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="main-wrapper bg-transparent min-h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CursorGrid 
          color={cursorColor}
          cellSize={50}
          radius={120}
          fadeDuration={800}
          lineWidth={1}
          maxOpacity={0.6}
          clickPulse={true}
        />
      </div>

      {/* ENTER SCREEN OVERLAY */}
      <div className={`enter-overlay ${hasEntered ? 'hidden' : ''}`}>
        <button className="water-btn" onClick={() => setHasEntered(true)}>
          + ENTER +
        </button>
      </div>

      {/* GLOBAL SPLASH */}
      <div className={`global-splash ${hasEntered ? 'is-entering' : ''}`} id="splash">
        <div className="splash-row splash-row-top">
          <div className="splash-box"></div><div className="splash-box"></div><div className="splash-box"></div><div className="splash-box"></div><div className="splash-box"></div>
        </div>
        <div className="splash-row splash-row-bottom">
          <div className="splash-box"></div><div className="splash-box"></div><div className="splash-box"></div><div className="splash-box"></div><div className="splash-box"></div>
        </div>
      </div>

      <HeroSection />
      <WebDesignSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ShowcaseSection />
    </main>
  );
}

export default App;
