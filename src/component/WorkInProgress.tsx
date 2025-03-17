import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const WorkingInProgress = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const text = "Work in Progress";
    const chars = text.split('');
    
    if (textRef.current) {
      textRef.current.innerHTML = chars
        .map(char => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      // Text fade animation
      gsap.fromTo(
        '.char',
        { opacity: 0.2 },
        {
          opacity: 1,
          duration: 1.5,
          stagger: {
            each: 0.2,
            repeat: -1,
            yoyo: true
          },
          ease: "sine.inOut"
        }
      );
    }

    // Circle rotation
    gsap.to('.rotating-circle', {
      rotate: 360,
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    // Mouse move handler with trail effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });

      if (cursorRef.current && trailsRef.current) {
        // Main cursor animation
        gsap.to(cursorRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.5,
          ease: "power2.out"
        });

        // Create trail star
        const star = document.createElement('div');
        star.className = 'absolute w-2 h-2 bg-white/30 rounded-full pointer-events-none';
        star.style.left = `${clientX}px`;
        star.style.top = `${clientY}px`;
        trailsRef.current.appendChild(star);

        // Animate and remove trail
        gsap.to(star, {
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "power1.out",
          onComplete: () => star.remove()
        });
      }
    };

    // Mouse enter/leave handlers for interactive elements
    const handleElementEnter = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          duration: 0.3
        });
      }
    };

    const handleElementLeave = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          duration: 0.3
        });
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    
    const interactiveElements = document.querySelectorAll('.interactive');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleElementEnter);
      element.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleElementEnter);
        element.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-zinc-900 px-4">
        <div ref={containerRef} className="relative mb-8 sm:mb-12">
          {/* Elegant spinner */}
          <div className="interactive relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 cursor-none">
            <div className="rotating-circle absolute inset-0 border-t-2 border-r-2 border-zinc-700 rounded-full" />
            <div className="rotating-circle absolute inset-0 border-t-2 border-white rounded-full" 
                 style={{ transform: 'rotate(45deg)' }} />
            
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Status text */}
        <div 
          ref={textRef}
          className="interactive text-base sm:text-xl md:text-2xl font-light text-white/80 tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] uppercase text-center whitespace-nowrap cursor-none"
        />
      </div>

      {/* Trail container */}
      <div ref={trailsRef} className="fixed inset-0 pointer-events-none overflow-hidden" />

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none w-4 h-4 bg-white/20 rounded-full mix-blend-difference"
        style={{
          left: -8,
          top: -8,
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      />
    </>
  );
};

export default WorkingInProgress;
