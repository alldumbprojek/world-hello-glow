import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface CountUpProps {
  to: number;
  duration?: number;
  className?: string;
}

export default function CountUp({ to, duration = 2, className = '' }: CountUpProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const endValue = to;

    // Use GSAP for smooth, optimized animation
    const animation = gsap.fromTo(element,
      { innerText: 0 },
      {
        innerText: endValue,
        duration: duration,
        ease: "power2.out",
        snap: { innerText: 1 },
        onUpdate: function() {
          element.textContent = Math.floor(this.targets()[0].innerText).toString();
        }
      }
    );

    return () => {
      animation.kill();
    };
  }, [to, duration]);

  return <span ref={elementRef} className={className}>0</span>;
}
