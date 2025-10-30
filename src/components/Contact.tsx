import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, MessageCircle, Instagram } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleWhatsApp = () => {
    window.open("https://wa.me/6285797179752?text=Halo,%20saya%20ingin%20reservasi", "_blank");
  };

  const handleInstagram = () => {
    window.open("https://instagram.com/rasanusantara", "_blank");
  };

  const handleGoFood = () => {
    window.open("https://gofood.co.id/rasanusantara", "_blank");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        gsap.set(headerElements, { y: 30, opacity: 0 });
        gsap.to(headerElements, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Info cards animation
      const infoCards = infoRef.current?.children;
      if (infoCards) {
        gsap.set(infoCards, { x: -50, opacity: 0 });
        gsap.to(infoCards, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Map animation
      if (mapRef.current) {
        gsap.set(mapRef.current, { x: 50, opacity: 0 });
        gsap.to(mapRef.current, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2 flex items-center justify-center gap-2">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            Hubungi Kami
            <span className="w-8 h-0.5 bg-primary inline-block" />
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Kunjungi <span className="text-gradient-gold">Restoran</span> Kami
          </h2>
          <p className="text-muted-foreground">
            Reservasi sekarang atau pesan langsung melalui platform favorit Anda
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-4 md:space-y-6">
            {/* Address */}
            <div className="glass p-6 rounded-xl hover-lift group">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-gold group-hover:animate-glow">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-gradient-gold">Alamat</h3>
                  <p className="text-muted-foreground">
                    Jl. Kuliner Nusantara No. 88<br />
                    Jakarta Selatan, DKI Jakarta 12345
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="glass p-6 rounded-xl hover-lift group">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-gold group-hover:animate-glow">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-gradient-gold">Telepon</h3>
                  <p className="text-muted-foreground">
                    +62 812-3456-7890<br />
                    +62 21-7654-3210
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="glass p-6 rounded-xl hover-lift group">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-gold group-hover:animate-glow">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-gradient-gold">Jam Operasional</h3>
                  <p className="text-muted-foreground">
                    Senin - Jumat: 10.00 - 22.00 WIB<br />
                    Sabtu - Minggu: 09.00 - 23.00 WIB
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4">
              <Button 
                variant="default"
                size="lg"
                onClick={handleWhatsApp}
                className="w-full shadow-gold hover:shadow-gold-glow transition-all duration-500 hover:scale-105 group touch-manipulation"
              >
                <MessageCircle className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Pesan via WhatsApp
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                onClick={handleInstagram}
                className="w-full hover:shadow-gold transition-all duration-500 hover:scale-105 group touch-manipulation"
              >
                <Instagram className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Follow Instagram
              </Button>

              <Button 
                variant="secondary"
                size="lg"
                onClick={handleGoFood}
                className="w-full hover:shadow-gold transition-all duration-500 hover:scale-105 touch-manipulation"
              >
                Order via GoFood/GrabFood
              </Button>
            </div>
          </div>

          {/* Map */}
          <div className="animate-fade-in">
            <div className="rounded-2xl overflow-hidden shadow-premium hover:shadow-gold-glow transition-all duration-700 h-full min-h-[300px] md:min-h-[400px] border border-border/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.213843181438!2d106.82045731476893!3d-6.229386195496358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1635000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "300px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Rasa Nusantara"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
