import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const words = text.split(' ');
  let charIndex = 0;
  const totalChars = text.replace(/\s+/g, '').length;

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, wIdx) => {
        const wordChars = word.split('');
        return (
          <span key={wIdx} className="inline-block mr-[0.25em]">
            {wordChars.map((char, cIdx) => {
              const currentIdx = charIndex++;
              // Calculate the range for this specific character
              const start = currentIdx / totalChars;
              const end = start + (1 / totalChars);
              
              const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
              
              return (
                <span key={cIdx} className="relative inline-block">
                  <span className="invisible">{char}</span>
                  <motion.span 
                    className="absolute left-0 top-0"
                    style={{ opacity }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
};
