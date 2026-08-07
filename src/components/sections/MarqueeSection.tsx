import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ShapeBlur } from '../ui/ShapeBlur';
import { FadeIn } from '../ui/FadeIn';

const videos = [
  "/vid3.mp4",
  "/vid4.mp4",
  "/vid1.mp4",
  "/vid2.mp4"
];

const CarouselCard = ({ src, index, activeIndex, onClick, hasLanded }: { src: string, index: number, activeIndex: number, onClick: () => void, hasLanded: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const isActive = index === activeIndex;
  const [isPlaying, setIsPlaying] = useState(true);
  
  useEffect(() => {
    if (isActive) {
      if (videoRef.current) videoRef.current.currentTime = 0;
      setIsPlaying(true);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && hasLanded) {
      if (videoRef.current) {
        videoRef.current.muted = false;
        if (isPlaying) {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Browser blocked unmuted autoplay due to lack of prior user interaction.
              // Pause the video and update state so the user can click to play.
              setIsPlaying(false);
            });
          }
        } else {
          videoRef.current.pause();
        }
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.muted = true;
      }
    }
  }, [isActive, hasLanded, isPlaying]);

  const handleCardClick = () => {
    if (isActive) {
      setIsPlaying(!isPlaying);
    } else {
      onClick();
    }
  };



  // Arch math:
  // Offset from active index (-1, 0, 1)
  const offset = index - activeIndex; 
  // Let's make it wrap around if we had many, but we only have 3, so:
  // If active is 0: index 0 (off=0), index 1 (off=1), index 2 (off=2 -> we can treat as -1 visually if we want continuous, but with arrows it's finite).
  // Let's just do a simple finite carousel.
  
  // Calculate transform based on offset
  let translateX = offset * 110; // percentage
  let translateZ = Math.abs(offset) * -200; // push back
  let rotateY = offset * -25; // arch effect
  let scale = isActive ? 1.2 : 0.8;
  let opacity = Math.abs(offset) > 1 ? 0 : 1;
  let zIndex = 10 - Math.abs(offset);

  return (
    <div 
      ref={cardRef}
      className="absolute top-1/2 left-1/2 w-[320px] sm:w-[480px] md:w-[560px] aspect-video cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
      style={{
        transform: `translate(-50%, -50%) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex,
        perspective: '1000px'
      }}
      onClick={handleCardClick}
    >


      <div className="relative w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden z-10 border-2 border-[#333] bg-[#111] shadow-2xl transition-colors duration-500 hover:border-[#FF4500]">
        <div 
          className="absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-1000 ease-in-out pointer-events-none"
          style={{ 
            opacity: hasLanded && isPlaying ? 0 : 1,
            backgroundColor: hasLanded && !isPlaying ? 'rgba(17,17,17,0.5)' : '#111'
          }}
        >
          <span className="text-[#FF4500] font-black text-2xl tracking-[0.2em]">
            {hasLanded && !isPlaying ? 'CLICK TO PLAY' : '+, - & x'}
          </span>
        </div>

        <video 
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          loop
          playsInline
          preload="auto"
        />
      </div>
    </div>
  );
};

export const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(1); // Start at vid2.mp4
  const [hasLanded, setHasLanded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // isIntersecting tells us if the user is in this section
      setHasLanded(entry.isIntersecting);
    }, { threshold: 0.2 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const next = () => setActiveIndex(prev => (prev + 1) % videos.length);
  const prev = () => setActiveIndex(prev => (prev - 1 + videos.length) % videos.length);

  return (
    <section ref={sectionRef} id="creative" className="bg-transparent pt-10 pb-20 sm:pt-20 sm:pb-32 overflow-hidden flex flex-col items-center relative min-h-[60vh] sm:min-h-[80vh] justify-center" style={{ perspective: '1200px' }}>
      
      <FadeIn y={20} className="w-full text-center mb-10 sm:mb-16 z-20">
        <h2 className="font-black uppercase text-[#111111]" style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}>
          Creative Edits
        </h2>
      </FadeIn>

      <div className="w-full relative h-[300px] sm:h-[450px] md:h-[500px] flex items-center justify-center max-w-7xl mx-auto px-4">
        {videos.map((src, idx) => (
          <CarouselCard 
            key={`carousel-${idx}`} 
            src={src} 
            index={idx} 
            activeIndex={activeIndex}
            onClick={() => setActiveIndex(idx)}
            hasLanded={hasLanded}
          />
        ))}

        {/* Navigation Arrows positioned closely */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-10 md:left-20 z-30 pointer-events-auto">
          <button 
            onClick={prev}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FF4500]/90 backdrop-blur-md border-2 border-[#FF4500] text-white flex items-center justify-center hover:bg-white hover:text-[#FF4500] hover:border-[#FF4500] transition-colors duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-10 md:right-20 z-30 pointer-events-auto">
          <button 
            onClick={next}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FF4500]/90 backdrop-blur-md border-2 border-[#FF4500] text-white flex items-center justify-center hover:bg-white hover:text-[#FF4500] hover:border-[#FF4500] transition-colors duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};
