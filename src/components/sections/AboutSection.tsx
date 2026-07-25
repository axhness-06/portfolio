import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { FadeIn } from '../ui/FadeIn';
import { AnimatedText } from '../ui/AnimatedText';
import { ContactButton } from '../ui/ContactButton';

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-100, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-80, 120]);
  const y4 = useTransform(scrollYProgress, [0, 1], [150, -200]);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#111111]">
      {/* Decorative Images */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]">
        <motion.div style={{ y: y1 }}>
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="Moon" className="w-full h-auto object-contain" />
        </motion.div>
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]">
        <motion.div style={{ y: y2 }}>
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="3D Object" className="w-full h-auto object-contain" />
        </motion.div>
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]">
        <motion.div style={{ y: y3 }}>
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="Lego" className="w-full h-auto object-contain" />
        </motion.div>
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]">
        <motion.div style={{ y: y4 }}>
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="3D Group" className="w-full h-auto object-contain" />
        </motion.div>
      </FadeIn>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center relative z-10 w-full">
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2 className="text-[#F4F1E8] font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            About me
          </h2>
        </FadeIn>
        
        <div className="h-10 sm:h-14 md:h-16"></div>
        
        <FadeIn delay={0.2} y={30} className="w-full max-w-4xl px-4 flex justify-center">
          <p 
            className="text-[#FF4500] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}
          >
            I design, edit, and run the content — not just the strategy behind it. I've led creative direction for a 300-member community to 2M+ organic views, and grown a brand from zero to 700K+ views in two months, doing the design and the edit myself. I care about brands that have something to say and want to say it well. If that's you, let's build it.
          </p>
        </FadeIn>

        <div className="h-16 sm:h-20 md:h-24"></div>
        
        <ContactButton />
      </div>
    </section>
  );
};
