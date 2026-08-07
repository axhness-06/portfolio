import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue, useMotionValue, useSpring } from 'framer-motion';
import { FadeIn } from '../ui/FadeIn';

import { ShapeBlur } from '../ui/ShapeBlur';

const projects = [
  {
    num: "01",
    client: "SUPPER COMMUNITY",
    name: "VANTAMMAYILU",
    link: "https://www.vantammayilu.com/",
    nameClassName: "text-[#FBCEB1]"
  },
  {
    num: "02",
    client: "Luxury Menswear",
    name: "MFKHAN INTERNATIONAL",
    link: "https://www.mfkhaninternational.com/",
    nameClassName: "font-['Times_New_Roman',_serif] text-white"
  },
  {
    num: "03",
    client: "Sports Enthusiast Community",
    name: "THE GUILD",
    link: "https://theguild-nu.vercel.app/formula1",
    nameClassName: "text-white"
  }
];

interface CardProps {
  i: number;
  project: typeof projects[0];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card = ({ i, project, progress, range, targetScale }: CardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use scroll progress to calculate scale down effect
  const scale = useTransform(progress, range, [1, targetScale]);
  
  const topOffset = `calc(2rem + ${i * 40}px)`;

  // 3D Tilt Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0 px-2 sm:px-4" style={{ perspective: "2000px" }}>
      <motion.div 
        style={{ scale, top: topOffset, rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative flex flex-col w-full max-w-[1400px] h-[95vh] rounded-[30px] sm:rounded-[40px] border border-[#222] bg-[#0A0A0A] transform-gpu overflow-hidden p-0`}
      >
        <div className="w-full h-full relative group">
          <a href={project.link} target="_blank" rel="noreferrer" className="absolute inset-0 z-50 cursor-pointer block" />
          <div className="absolute inset-0 z-0 bg-[#0A0A0A]">
            <iframe 
              src={project.link} 
              className="w-full h-full border-0 pointer-events-none" 
              title={project.name} 
              loading="eager"
            />
          </div>
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none transition-opacity duration-300 group-hover:bg-black/20" />
          
          {/* Top Row Text Overlapping */}
          <div className="absolute top-0 left-0 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 sm:p-8 md:p-10 z-20 pointer-events-none">
            <div className="flex items-center gap-4 sm:gap-6 bg-black/30 backdrop-blur-sm p-4 rounded-3xl border border-white/10">
              <span className="font-black text-white/90 leading-none drop-shadow-xl" style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}>
                {project.num}
              </span>
              <div className="flex flex-col">
                <span className="text-[#FF4500] uppercase tracking-wider text-sm sm:text-base font-bold drop-shadow-md">
                  {project.client}
                </span>
                <h3 className={`font-medium uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-1 drop-shadow-lg ${project.nameClassName || 'text-white'}`}>
                  {project.name}
                </h3>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const WebDesignSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={containerRef} id="web-design" className="bg-[#050505] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20 shadow-2xl">
      <FadeIn y={40} className="w-full text-center">
        <h2 className="font-black uppercase mb-8 sm:mb-12 md:mb-16 text-[#FF4500]" style={{ fontSize: 'clamp(2rem, 8vw, 120px)' }}>
          Web Design
        </h2>
      </FadeIn>

      <div className="relative w-full pb-[10vh]">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - 1 - i) * 0.03;
          return (
            <Card 
              key={project.num} 
              i={i} 
              project={project} 
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};
