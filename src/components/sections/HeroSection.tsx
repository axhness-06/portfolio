import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FadeIn } from '../ui/FadeIn';
import { ContactButton } from '../ui/ContactButton';
import { Magnet } from '../ui/Magnet';

const RollingText = ({ text, href }: { text: string, href: string }) => {
  return (
    <a href={href} className="group relative overflow-hidden inline-block leading-none h-[1em]">
      <span className="flex flex-col transition-transform duration-300 group-hover:-translate-y-1/2">
        <span>{text}</span>
        <span className="text-[#FF4500]">{text}</span>
      </span>
    </a>
  );
};

export const HeroSection = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const chars = textRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "power4.out", delay: 1.5 }
    );
  }, []);

  return (
    <section className="h-screen flex flex-col overflow-x-clip relative">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="flex justify-between px-6 md:px-10 pt-6 md:pt-8 text-[#111111] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] relative z-40 pointer-events-auto">
        <RollingText href="#about" text="About" />
        <RollingText href="#projects" text="Projects" />
        <RollingText href="https://ig.me/m/studioashh" text="Contact" />
      </FadeIn>

      {/* Hero Heading */}
      <div className="flex-1 flex flex-col justify-center sm:justify-start sm:mt-10 md:mt-12 relative z-0 pointer-events-none px-6 md:px-10">
        <div className="w-full text-left mt-6 sm:mt-0 relative">
          <div className="w-full">
            <h1 ref={textRef} className="hero-heading font-normal tracking-tight leading-none whitespace-nowrap w-full flex flex-col items-start">
              <span className="text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] uppercase">
                {"HI, I'm ".split('').map((char, i) => (
                  <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal', opacity: 0 }}>
                    {char}
                  </span>
                ))}
              </span>
              <span className="normal-case tracking-normal inline-block mt-[4vw] sm:mt-[3vw] font-normal ml-[5vw] sm:ml-[8vw] text-[22vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw]" style={{ fontFamily: "'Great Vibes', cursive" }}>
                {"Ashfaaq".split('').map((char, i) => (
                  <span key={i + 100} className="char inline-block" style={{ opacity: 0 }}>
                    {char}
                  </span>
                ))}
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Portrait */}
      <FadeIn 
        delay={0.6} 
        y={30} 
        className="absolute left-1/2 -translate-x-1/2 z-30 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto"
      >
        <img 
          src="/heroicon.png" 
          alt="Jack Portrait" 
          className="w-full h-auto object-contain"
        />
      </FadeIn>

      {/* Bottom bar */}
      <div className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 relative z-40 pointer-events-auto">
        <FadeIn delay={0.35} y={20} className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
          <p className="text-[#FF4500] font-light uppercase tracking-wide leading-snug" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
            I build brands people actually stop scrolling for.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};
