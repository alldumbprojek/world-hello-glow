import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Star, Utensils, Shield } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "./CountUp";
import "./Hero.css";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background effect - reduced for better visibility
      gsap.to(backgroundRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Title stagger animation
      const titleLines = titleRef.current?.querySelectorAll('.title-line');
      if (titleLines) {
        gsap.set(titleLines, { y: 50, opacity: 0 });
        gsap.to(titleLines, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Subtitle animation
      gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
      gsap.to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Stats animation
      gsap.set(statsRef.current, { y: 30, opacity: 0 });
      gsap.to(statsRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // CTA animation
      gsap.set(ctaRef.current, { y: 30, opacity: 0 });
      gsap.to(ctaRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Floating elements animation
      const floatingElements = floatingElementsRef.current?.children;
      if (floatingElements) {
        gsap.set(floatingElements, { opacity: 0, scale: 0.8 });
        gsap.to(floatingElements, {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: floatingElementsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        // Continuous floating animation
        gsap.to(floatingElements, {
          y: "random(-20, 20)",
          rotation: "random(-5, 5)",
          duration: "random(4, 8)",
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.5
        });
      }

      // Animated shapes
      const shapes = shapesRef.current?.children;
      if (shapes) {
        gsap.set(shapes, { opacity: 0, scale: 0.5 });
        gsap.to(shapes, {
          opacity: 0.3,
          scale: 1,
          duration: 2,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: shapesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        // Continuous shape movement
        gsap.to(shapes[0], {
          x: 30,
          y: -20,
          scale: 1.1,
          duration: 8,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true
        });
        gsap.to(shapes[1], {
          x: -20,
          y: 30,
          scale: 0.9,
          duration: 10,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true
        });
        gsap.to(shapes[2], {
          x: 15,
          y: 15,
          scale: 1.2,
          duration: 12,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true
        });
      }

      // Set visibility for intersection observer
      setIsVisible(true);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsApp = () => {
    window.open("https://wa.me/6285797179752?text=Halo,%20saya%20ingin%20reservasi", "_blank");
  };

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 pb-16 md:pb-24">
      {/* Background Image with Parallax Effect */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: 'center top',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50" />
      </div>

      {/* Floating Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element element-1">
          <Utensils className="text-primary/20" size={40} />
        </div>
        <div className="floating-element element-2">
          <Star className="text-gold/20" size={30} />
        </div>
        <div className="floating-element element-3">
          <Shield className="text-primary/20" size={35} />
        </div>
      </div>

      {/* Animated Background Shapes */}
      <div ref={shapesRef} className="absolute inset-0 overflow-hidden">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Main Title with Stagger Animation */}
          <div ref={titleRef} className="space-y-4 md:space-y-6">
            <div className="title-container">
              <h1 className="hero-title">
                <span className="title-line line-1">Nikmati Cita Rasa</span>
                <span className="title-line line-2 text-gradient-gold">
                  <span className="word-animation">Nusantara</span>
                </span>
                <span className="title-line line-3">yang Autentik</span>
              </h1>
            </div>

            <div ref={subtitleRef} className="hero-subtitle">
              <p className="text-base md:text-xl lg:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-4">
                Perpaduan sempurna antara tradisi kuliner Indonesia dengan sentuhan modern premium
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div ref={statsRef} className="stats-bar">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12 text-white/80">
              <div className="stat-item">
                <CountUp to={15} duration={2} className="text-xl md:text-2xl lg:text-3xl font-bold text-gold" />
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-gold">+</span>
                <div className="text-xs md:text-sm">Tahun Pengalaman</div>
              </div>
              <div className="stat-item">
                <CountUp to={500} duration={2} className="text-xl md:text-2xl lg:text-3xl font-bold text-gold" />
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-gold">+</span>
                <div className="text-xs md:text-sm">Menu Premium</div>
              </div>
              <div className="stat-item">
                <CountUp to={10000} duration={2} className="text-xl md:text-2xl lg:text-3xl font-bold text-gold" />
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-gold">+</span>
                <div className="text-xs md:text-sm">Pelanggan Puas</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="cta-container">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-6 md:pt-8">
              <Button
                variant="hero"
                size="lg"
                onClick={scrollToMenu}
                className="hero-btn-primary group w-full sm:w-auto"
              >
                <span>Lihat Menu</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleWhatsApp}
                className="group border-2 border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 hover:shadow-gold w-full sm:w-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                <span>Order via WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="scroll-indicator">
          <div className="scroll-arrow" />
        </div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-gradient-to-r from-primary/10 to-gold/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-gradient-to-l from-primary/10 to-gold/5 rounded-full blur-3xl opacity-50"></div>
    </section>
  );
};
