import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShapeBlur } from '../ui/ShapeBlur';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104530_521b2f85-c0f3-4d0e-9704-b578315b4cb9.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103711_76ccdb8b-5043-4f47-9c54-4379713393ea.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103728_394f6a1b-85e2-4386-a4f6-408472a0a5b7.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103739_86743e0e-16a7-4bee-bf38-dd67985344dc.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103748_b2215dc8-a3a7-470d-b19a-5b87fa7d0c37.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103758_e919ce72-5c9d-4b87-9be6-d7647b34825c.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103808_013583d0-3386-4547-9832-37c7d8edb3ac.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103937_a0c49d0a-33eb-4ead-aea6-c1baf241acbc.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103956_d18ed8fd-7b6f-4b86-91f9-20010fe38670.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104034_ba5a9963-87ff-4008-a545-6bd686c088b5.png&w=1920&q=85"
];

const buildLayout = (count: number, cols: number) => {
  const layout = [];
  let imageIndex = 0;
  let r = 0;
  while (imageIndex < count) {
    const row = Array(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = imageIndex++;
    if (imageIndex < count && r % 3 === 0) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = imageIndex++;
    }
    layout.push(row);
    r++;
  }
  return layout;
};

export const CreativeWorksSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCols(2);
      else if (window.innerWidth < 1024) setCols(3);
      else setCols(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const layout = buildLayout(images.length, cols);
  
  // Flatten layout to a grid
  const gridItems: number[] = [];
  layout.forEach(row => {
    row.forEach(cell => gridItems.push(cell));
  });

  useGSAP(() => {
    const cards = gsap.utils.toArray('.bp-card');
    
    cards.forEach((card: any, i) => {
      // Find row and col for transform-origin
      const colIndex = i % cols;
      const isLeft = colIndex < cols / 2;
      gsap.set(card, { transformOrigin: isLeft ? 'right bottom' : 'left bottom', scale: 0 });

      // Scale in
      gsap.to(card, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top 95%',
          end: 'top 50%',
          scrub: true,
        }
      });
      
      // Scale out
      gsap.to(card, {
        scale: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'bottom 40%',
          end: 'bottom 5%',
          scrub: true,
        }
      });
    });
  }, { scope: containerRef, dependencies: [cols] });

  return (
    <section 
      ref={containerRef} 
      id="creative" 
      className="bg-black relative z-10 w-full overflow-hidden py-24 sm:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 w-full pt-16">
        
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl text-white font-black uppercase tracking-tight mb-4">
            Creative <span className="font-['Instrument_Serif'] italic lowercase font-normal">works</span>
          </h2>
        </div>

        <div 
          className="grid gap-4 sm:gap-6 lg:gap-8 mx-auto"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {gridItems.map((imageIndex, index) => {
            if (imageIndex === -1) {
              return <div key={`spacer-${index}`} className="aspect-[2/3]" />;
            }
            return (
              <div 
                key={`card-${imageIndex}`} 
                className="bp-card relative aspect-[2/3] rounded-2xl overflow-hidden bg-[#111] will-change-transform"
              >
                {/* ShapeBlur layer behind the image or with mix-blend */}
                <div className="absolute inset-0 z-0 opacity-60">
                  <ShapeBlur variation={imageIndex % 4} shapeSize={1.5} roundness={0.6} />
                </div>
                
                <img 
                  src={images[imageIndex]} 
                  alt={`Creative Work ${imageIndex + 1}`} 
                  className="absolute inset-0 w-full h-full object-cover z-10 hover:opacity-0 transition-opacity duration-500" 
                />
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};
