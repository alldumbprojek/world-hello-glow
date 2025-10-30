import { useState, useEffect, useRef } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: gallery1, alt: "Suasana restoran yang nyaman" },
  { src: gallery2, alt: "Hidangan spesial kami" },
  { src: gallery3, alt: "Chef sedang memasak" },
  { src: gallery4, alt: "Koleksi dessert premium" },
];

export const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const goToPrevious = () => {
    setSelectedImage((prev) => 
      prev === null ? null : prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setSelectedImage((prev) => 
      prev === null ? null : (prev + 1) % galleryImages.length
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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

      // Grid stagger animation
      const images = gridRef.current?.children;
      if (images) {
        gsap.set(images, { scale: 0.8, opacity: 0, y: 50 });
        gsap.to(images, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        // Add parallax hover effects
        Array.from(images).forEach((imageContainer, index) => {
          const container = imageContainer as HTMLElement;
          const img = container.querySelector('img');
          const overlay = container.querySelector('.absolute.inset-0');

          container.addEventListener('mouseenter', () => {
            setHoveredIndex(index);
            gsap.to(container, {
              scale: 1.05,
              duration: 0.6,
              ease: "power2.out"
            });
            if (img) {
              gsap.to(img, {
                scale: 1.1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
            if (overlay) {
              gsap.to(overlay, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
              });
            }
          });

          container.addEventListener('mouseleave', () => {
            setHoveredIndex(null);
            gsap.to(container, {
              scale: 1,
              duration: 0.6,
              ease: "power2.out"
            });
            if (img) {
              gsap.to(img, {
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
            if (overlay) {
              gsap.to(overlay, {
                opacity: 0.6,
                duration: 0.5,
                ease: "power2.out"
              });
            }
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-16 md:py-24 bg-secondary/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2 flex items-center justify-center gap-2">
            <span className="w-8 h-0.5 bg-primary inline-block" />
            Galeri Kami
            <span className="w-8 h-0.5 bg-primary inline-block" />
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Momen <span className="text-gradient-gold">Istimewa</span>
          </h2>
          <p className="text-white">
            Lihat keindahan suasana dan kelezatan hidangan di Rasa Nusantara
          </p>
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="relative overflow-hidden rounded-2xl shadow-premium group cursor-pointer h-64 md:h-80 hover:shadow-gold-glow transition-all duration-700 border border-border/50"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Decorative Corners */}
              <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500"
                style={{ opacity: hoveredIndex === index ? 1 : 0.7 }}
              >
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-dark px-4 py-3 rounded-lg backdrop-blur-xl">
                    <p className="text-white text-lg font-semibold transition-all duration-500 transform flex items-center gap-2"
                       style={{
                         transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(4px)',
                       }}>
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-7xl w-full p-0 bg-black/95 border-primary/20">
          <div className="relative w-full h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <Button
              onClick={closeLightbox}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/10 rounded-full w-10 h-10"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Previous Button */}
            <Button
              onClick={goToPrevious}
              variant="ghost"
              size="icon"
              className="absolute left-4 z-50 text-white hover:bg-white/10 rounded-full w-12 h-12"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            {/* Next Button */}
            <Button
              onClick={goToNext}
              variant="ghost"
              size="icon"
              className="absolute right-4 z-50 text-white hover:bg-white/10 rounded-full w-12 h-12"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Image Display */}
            {selectedImage !== null && (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-dark px-6 py-3 rounded-full">
                  <p className="text-white text-sm font-medium">
                    {selectedImage + 1} / {galleryImages.length} - {galleryImages[selectedImage].alt}
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
