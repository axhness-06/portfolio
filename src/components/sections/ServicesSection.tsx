import React from 'react';
import { FadeIn } from '../ui/FadeIn';
import { motion } from 'framer-motion';

const services = [
  {
    num: "01",
    name: "Content Design",
    desc: "Posts, reels, carousels, and campaign assets designed to stop the scroll and hold brand identity across every platform."
  },
  {
    num: "02",
    name: "Video Editing",
    desc: "Short-form and long-form edits built for retention — reels, YouTube, campaign videos, cut and paced for how people actually watch."
  },
  {
    num: "03",
    name: "Brand Identity",
    desc: "Visual systems, tone, and creative direction that make a brand recognizable in one frame, not just one post."
  },
  {
    num: "04",
    name: "Social Strategy & Growth",
    desc: "Content calendars and platform-aware execution built to convert views into real audience growth — not just impressions."
  },
  {
    num: "05",
    name: "Web Design",
    desc: "Clean, founder-brand websites designed and shipped end-to-end, from brief to live launch."
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="bg-transparent rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 -mt-10 sm:-mt-12 md:-mt-14 shadow-2xl">
      <FadeIn y={40} className="w-full text-center">
        <h2 className="font-black uppercase text-[#111111] mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          What I Do
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col">
        {services.map((svc, i) => (
          <div key={svc.num} className="relative">
            {/* Animated SVG Line at the top of each item */}
            <motion.svg className="absolute top-0 left-0 w-full" height="2" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
              <motion.line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(17,17,17,0.15)" strokeWidth="2" 
                variants={{
                  hidden: { pathLength: 0 },
                  visible: { pathLength: 1, transition: { duration: 1, delay: i * 0.1 } }
                }}
              />
            </motion.svg>

            <FadeIn 
              delay={i * 0.1} 
              y={20}
              className="flex flex-col sm:flex-row gap-6 sm:gap-10 md:gap-16 items-start py-8 sm:py-10 md:py-12"
            >
              <div className="font-black text-[#111111] leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
                {svc.num}
              </div>
              <div className="flex flex-col gap-3 sm:gap-5 pt-2 sm:pt-4 md:pt-6">
                <h3 className="font-medium uppercase text-[#111111]" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                  {svc.name}
                </h3>
                <p className="font-light leading-relaxed max-w-2xl text-[#FF4500]" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                  {svc.desc}
                </p>
              </div>
            </FadeIn>

            {/* If it's the last item, add a bottom SVG line too */}
            {i === services.length - 1 && (
              <motion.svg className="absolute bottom-0 left-0 w-full" height="2" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
                <motion.line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(17,17,17,0.15)" strokeWidth="2" 
                  variants={{
                    hidden: { pathLength: 0 },
                    visible: { pathLength: 1, transition: { duration: 1, delay: (i + 1) * 0.1 } }
                  }}
                />
              </motion.svg>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
