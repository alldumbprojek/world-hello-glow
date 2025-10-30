import { useEffect, useState } from "react";
import { gsap } from "gsap";

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate logo text with GSAP
      const logoText = document.querySelector('.loading-logo');
      const tagline = document.querySelector('.loading-tagline');
      const spinner = document.querySelector('.loading-spinner');

      if (logoText) {
        gsap.set(logoText, { y: 30, opacity: 0 });
        gsap.to(logoText, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        });
      }

      if (tagline) {
        gsap.set(tagline, { y: 20, opacity: 0 });
        gsap.to(tagline, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power2.out"
        });
      }

      if (spinner) {
        gsap.set(spinner, { scale: 0, opacity: 0 });
        gsap.to(spinner, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "back.out(1.7)"
        });
      }

      // Start fade out after 2 seconds
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);

        // Animate fade out
        gsap.to('.loading-screen', {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      }, 2000);

      // Remove loading screen after animation completes
      const removeTimer = setTimeout(() => {
        setIsLoading(false);
      }, 2800);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    });

    return () => ctx.revert();
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen fixed inset-0 z-[9999] flex items-center justify-center bg-secondary transition-all duration-1000">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-300" />
      </div>

      {/* Logo and Text */}
      <div className="relative z-10 text-center space-y-6">
        {/* Animated Logo Text */}
        <div className="space-y-2">
          <h1 className="loading-logo text-5xl md:text-7xl font-bold text-gradient">
            Rasa Nusantara
          </h1>
          <p className="loading-tagline text-lg md:text-xl text-muted-foreground font-light">
            Cita Rasa Autentik Indonesia
          </p>
        </div>

        {/* Loading Spinner */}
        <div className="loading-spinner flex justify-center">
          <div className="relative w-16 h-16">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />

            {/* Spinning Ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />

            {/* Inner Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Lines */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </div>
  );
};
