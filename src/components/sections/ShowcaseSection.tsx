import React, { useEffect, useRef, useState } from 'react';
import './ShowcaseSection.css';

export const ShowcaseSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgLayerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Word reveal
    if (headlineRef.current && headlineRef.current.childElementCount === 0) {
      const text = "Got a brand worth building? Let's talk.";
      const words = text.split(' ');
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'word-reveal';
        span.textContent = word;
        span.style.animationDelay = `${1 + i * 0.05}s`;
        headlineRef.current?.appendChild(span);
        // add space
        headlineRef.current?.appendChild(document.createTextNode(' '));
      });
    }

    // Spotlight reveal
    const SPOTLIGHT_R = 260;
    const canvas = canvasRef.current;
    const imgLayer = imgLayerRef.current;
    const section = sectionRef.current;
    if (!canvas || !imgLayer || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    
    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(section);

    const mouse = { x: -999, y: -999 };
    const smooth = { x: -999, y: -999 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const loop = () => {
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, SPOTLIGHT_R);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.4, 'rgba(255,255,255,1)');
      grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
      grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
      grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.beginPath();
      ctx.arc(smooth.x, smooth.y, SPOTLIGHT_R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      const dataUrl = canvas.toDataURL();
      imgLayer.style.webkitMaskImage = `url(${dataUrl})`;
      imgLayer.style.maskImage = `url(${dataUrl})`;
      imgLayer.style.webkitMaskSize = '100% 100%';
      imgLayer.style.maskSize = '100% 100%';

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="showcase-wrapper" id="showcase">
      {/* LOGO REMOVED */}
      <div className="logo-wrapper">
      </div>

      {/* BURGER */}
      <div className="burger-wrapper">
        <div className="inner">
          <button 
            className={`burger-btn ${menuOpen ? 'open' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* MENU PANEL */}
      <div className={`showcase-menu-panel ${menuOpen ? 'open' : ''}`}>
        <nav>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <div className="menu-contact">
          <a href="mailto:axhness@gmail.com" className="menu-email">axhness@gmail.com</a>
        </div>
        <div className="menu-socials flex gap-4 mt-6">
          <a href="https://ig.me/m/studioashh" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity uppercase text-xs font-medium tracking-widest text-[#FF4500]">Instagram</a>
          <a href="#" className="hover:opacity-70 transition-opacity uppercase text-xs font-medium tracking-widest text-[#FF4500]">LinkedIn</a>
        </div>
        <div style={{ marginTop: '32px' }}>
          <a href="https://ig.me/m/studioashh" target="_blank" rel="noreferrer" className="menu-cta-btn hover:scale-[1.02] active:scale-95 transition-transform duration-300 inline-flex items-center justify-center">
            <span className="menu-cta-bg"></span>
            <span className="menu-cta-text">Say Hello</span>
            <span className="menu-cta-circle">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* HERO */}
      {/* Big text behind image */}
      <div className="hero-big-text creator-text-animate flex justify-start pl-[5%] sm:pl-[10%]">
        <h2 className="ml-[-15vw]">axh</h2>
      </div>

      {/* Base image */}
      <div className="hero-base-img hero-image-animate"
           style={{ backgroundImage: "url('/base.png')" }}>
      </div>

      {/* Reveal layer */}
      <canvas ref={canvasRef} className="reveal-canvas"></canvas>
      <div ref={imgLayerRef} className="hero-reveal-img"
           style={{ backgroundImage: "url('/hidden.png')" }}>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-content-inner">
          <h1 ref={headlineRef} className="showcase-hero-headline"></h1>
          <a href="https://ig.me/m/studioashh" target="_blank" rel="noreferrer" className="showcase-cta-btn cta-animate hover:scale-[1.02] active:scale-95 transition-transform duration-300 inline-flex items-center justify-center">
            <span className="cta-btn-bg"></span>
            <span className="cta-btn-text">Contact</span>
            <span className="cta-btn-circle">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
