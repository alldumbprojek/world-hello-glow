import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const columns = contentRef.current?.querySelectorAll('.footer-column');
      if (columns) {
        gsap.set(columns, { y: 30, opacity: 0 });
        gsap.to(columns, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsApp = () => {
    window.open("https://wa.me/6285797179752?text=Halo,%20saya%20ingin%20reservasi", "_blank");
  };

  return (
    <footer ref={footerRef} className="bg-secondary text-secondary-foreground py-12 md:py-16 border-t border-primary/10 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={contentRef}>
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* About Column */}
            <div className="footer-column space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gradient-gold mb-4">
                Rasa Nusantara
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Restoran premium yang menghadirkan kelezatan kuliner Indonesia dengan cita rasa autentik dan presentasi modern.
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://instagram.com/rasanusantara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass hover:glass-dark flex items-center justify-center transition-all duration-500 group hover-lift hover:shadow-gold"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://facebook.com/rasanusantara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass hover:glass-dark flex items-center justify-center transition-all duration-500 group hover-lift hover:shadow-gold"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://twitter.com/rasanusantara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass hover:glass-dark flex items-center justify-center transition-all duration-500 group hover-lift hover:shadow-gold"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="footer-column space-y-4">
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-primary" />
                Menu Cepat
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#menu" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    Menu Spesial
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    Galeri
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    Testimoni
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    Hubungi Kami
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div className="footer-column space-y-4">
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-primary" />
                Kontak
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Jl. Kuliner Nusantara No. 88<br />
                    Jakarta Selatan, DKI Jakarta 12345
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="tel:+6281234567890" className="text-muted-foreground hover:text-primary transition-colors">
                    +62 812-3456-7890
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="mailto:info@rasanusantara.com" className="text-muted-foreground hover:text-primary transition-colors">
                    info@rasanusantara.com
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Senin - Jumat: 10.00 - 22.00<br />
                    Sabtu - Minggu: 09.00 - 23.00
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA Column */}
            <div className="footer-column space-y-4">
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-primary" />
                Reservasi
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Pesan tempat Anda sekarang dan nikmati pengalaman kuliner yang tak terlupakan!
              </p>
              <button
                onClick={handleWhatsApp}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-500 shadow-gold hover:shadow-gold-glow hover:scale-105 flex items-center justify-center gap-2 group"
              >
                <Phone className="w-4 h-4 group-hover:animate-pulse" />
                WhatsApp Kami
              </button>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-4">
                <div className="glass px-3 py-1 rounded-full text-xs text-primary font-medium">
                  Halal
                </div>
                <div className="glass px-3 py-1 rounded-full text-xs text-gold font-medium">
                  Premium
                </div>
                <div className="glass px-3 py-1 rounded-full text-xs text-accent font-medium">
                  15+ Tahun
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                &copy; {currentYear} Rasa Nusantara. Semua hak dilindungi undang-undang.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
                <span className="text-border">•</span>
                <a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a>
                <span className="text-border">•</span>
                <a href="#" className="hover:text-primary transition-colors">FAQ</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
