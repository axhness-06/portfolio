import React from 'react';

interface LiveProjectButtonProps {
  href?: string;
}

export const LiveProjectButton = ({ href }: LiveProjectButtonProps) => {
  return (
    <a 
      href={href || "#"} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block rounded-full border-2 border-[#111111] text-[#111111] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#FF4500] hover:border-[#FF4500] hover:text-white active:scale-95 transition-all duration-300"
    >
      Live Project
    </a>
  );
};
