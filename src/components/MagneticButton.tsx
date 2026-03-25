import React, { useRef, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import gsap from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'outline';
  strength?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseMove?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function MagneticButton({ 
  children, 
  className, 
  variant = 'primary',
  strength = 0.35,
  onMouseMove: propsOnMouseMove,
  onMouseLeave: propsOnMouseLeave,
  ...props 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const xTo = useRef<any>(null);
  const yTo = useRef<any>(null);
  const textXTo = useRef<any>(null);
  const textYTo = useRef<any>(null);

  useEffect(() => {
    if (!buttonRef.current || !textRef.current) return;
    
    xTo.current = gsap.quickTo(buttonRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    yTo.current = gsap.quickTo(buttonRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    textXTo.current = gsap.quickTo(textRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    textYTo.current = gsap.quickTo(textRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !xTo.current || !yTo.current || !textXTo.current || !textYTo.current) return;
    
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    
    xTo.current(x * strength);
    yTo.current(y * strength);
    textXTo.current(x * (strength * 0.4));
    textYTo.current(y * (strength * 0.4));
    
    if (propsOnMouseMove) propsOnMouseMove(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (xTo.current && yTo.current && textXTo.current && textYTo.current) {
      xTo.current(0);
      yTo.current(0);
      textXTo.current(0);
      textYTo.current(0);
    }
    
    if (propsOnMouseLeave) propsOnMouseLeave(e);
  };

  return (
    <div className="relative inline-block p-4"> {/* Hit area expansion */}
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "group relative overflow-hidden rounded-full px-8 py-4 transition-all duration-500",
          variant === 'primary' 
            ? "bg-cognac text-white" 
            : "border border-concrete/30 text-concrete hover:text-white",
          className
        )}
        {...props}
      >
        {/* Liquid fill effect */}
        <div 
          className={cn(
            "absolute inset-0 -translate-y-full bg-cognac transition-transform duration-500 ease-in-out group-hover:translate-y-0",
            variant === 'primary' && "hidden"
          )}
        />
        
        <span ref={textRef} className="relative z-10 block font-sans font-bold uppercase tracking-wider text-sm pointer-events-none">
          {children}
        </span>
      </button>
    </div>
  );
}
