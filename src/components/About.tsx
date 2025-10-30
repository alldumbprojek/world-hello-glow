import { useEffect, useRef, useState } from "react";
import aboutImage from "@/assets/about-restaurant.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundTextRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background text animation with ScrollTrigger
      gsap.set(backgroundTextRef.current, { y: 32, opacity: 0 });
      gsap.to(backgroundTextRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Parallax effect for background text
      gsap.to(backgroundTextRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Image animation with stagger
      gsap.set(imageRef.current, { x: -50, opacity: 0 });
      gsap.to(imageRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Content animation with stagger
      const contentElements = contentRef.current?.children;
      if (contentElements) {
        gsap.set(contentElements, { y: 30, opacity: 0 });
        gsap.to(contentElements, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Stats animation with stagger
      const statItems = statsRef.current?.children;
      if (statItems) {
        gsap.set(statItems, { scale: 0.8, opacity: 0 });
        gsap.to(statItems, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Image hover effect
      const image = imageRef.current?.querySelector('img');
      if (image) {
        image.addEventListener('mouseenter', () => {
          gsap.to(image, {
            scale: 1.05,
            duration: 0.6,
            ease: "power2.out"
          });
        });

        image.addEventListener('mouseleave', () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Large Animated Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h2
          ref={backgroundTextRef}
          className="text-[12rem] md:text-[20rem] font-bold text-primary/5"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          RASA
        </h2>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl shadow-premium hover:shadow-gold-glow transition-all duration-700">
              <img
                src={aboutImage}
                alt="Interior Restoran Rasa Nusantara"
                className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6 order-1 lg:order-2">
            <div className="space-y-3">
              <p className="text-primary font-semibold tracking-wide uppercase text-sm flex items-center gap-2">
                <span className="w-8 h-0.5 bg-primary inline-block" />
                Tentang Kami
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Warisan Kuliner <span className="text-gradient-gold">Nusantara</span>
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Rasa Nusantara</strong> lahir dari kecintaan mendalam terhadap
                kekayaan kuliner Indonesia. Kami menghadirkan pengalaman gastronomi yang memadukan resep tradisional
                turun-temurun dengan teknik memasak modern.
              </p>

              <p>
                Setiap hidangan di restoran kami adalah hasil dari riset mendalam dan dedikasi para chef berpengalaman
                yang memahami esensi cita rasa autentik Indonesia. Dari Sabang hingga Merauke, kami menghadirkan
                kelezatan dalam setiap sajian.
              </p>

              <p>
                Dengan suasana yang elegan namun hangat, Rasa Nusantara menjadi tempat sempurna untuk berbagai acara,
                dari jamuan keluarga hingga pertemuan bisnis yang berkesan.
              </p>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 gap-6 pt-4">
              <div className="glass p-6 rounded-xl hover-lift cursor-pointer group">
                <div className="text-3xl md:text-4xl font-bold text-gradient-gold group-hover:scale-110 transition-transform duration-300">500+</div>
                <p className="text-sm text-muted-foreground mt-2">Menu Pilihan Premium</p>
              </div>
              <div className="glass p-6 rounded-xl hover-lift cursor-pointer group">
                <div className="text-3xl md:text-4xl font-bold text-gradient-gold group-hover:scale-110 transition-transform duration-300">10K+</div>
                <p className="text-sm text-muted-foreground mt-2">Pelanggan Puas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
