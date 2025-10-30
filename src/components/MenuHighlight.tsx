import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import rendangImage from "@/assets/menu-rendang.jpg";
import nasigorengImage from "@/assets/menu-nasigoreng.jpg";
import sateImage from "@/assets/menu-sate.jpg";
import gadogadoImage from "@/assets/menu-gadogado.jpg";
import sotoImage from "@/assets/menu-soto.jpg";
import ayamgorengImage from "@/assets/menu-ayamgoreng.jpg";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingCart, Star } from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  {
    name: "Rendang Sapi Premium",
    description: "Daging sapi pilihan dengan bumbu rempah tradisional, dimasak hingga empuk sempurna",
    price: "Rp 85.000",
    image: rendangImage,
  },
  {
    name: "Nasi Goreng Signature",
    description: "Nasi goreng spesial dengan telur mata sapi dan topping seafood premium",
    price: "Rp 65.000",
    image: nasigorengImage,
  },
  {
    name: "Sate Ayam Madura",
    description: "Sate ayam dengan bumbu kacang khas Madura yang autentik",
    price: "Rp 55.000",
    image: sateImage,
  },
  {
    name: "Gado-Gado Jakarta",
    description: "Salad sayuran segar dengan bumbu kacang spesial dan kerupuk",
    price: "Rp 45.000",
    image: gadogadoImage,
  },
  {
    name: "Soto Ayam Lamongan",
    description: "Sup ayam kuah kuning dengan bumbu rempah khas Lamongan",
    price: "Rp 50.000",
    image: sotoImage,
  },
  {
    name: "Ayam Goreng Kremes",
    description: "Ayam goreng renyah dengan kremesan gurih dan sambal terasi",
    price: "Rp 60.000",
    image: ayamgorengImage,
  },
];

export const MenuHighlight = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: typeof menuItems[0]) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const handleWhatsAppOrder = () => {
    if (selectedItem) {
      const message = `Halo, saya ingin memesan ${selectedItem.name} - ${selectedItem.price}`;
      window.open(`https://wa.me/6285797179752?text=${encodeURIComponent(message)}`, "_blank");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with dramatic entrance
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        gsap.set(headerElements, { y: 50, opacity: 0, scale: 0.9 });
        gsap.to(headerElements, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Advanced grid stagger animation with 3D effects
      const cards = gridRef.current?.children;
      if (cards) {
        // Set initial state with 3D perspective
        gsap.set(cards, { 
          y: 80, 
          opacity: 0, 
          scale: 0.8,
          rotationX: -20,
          transformPerspective: 1000
        });
        
        // Animate in with smooth 3D entrance
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: {
            each: 0.12,
            from: "start",
            ease: "power2.out"
          },
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });

        // Parallax effect on scroll for each card
        Array.from(cards).forEach((card, index) => {
          gsap.to(card, {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            }
          });
        });

      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="py-16 md:py-24 bg-secondary relative overflow-hidden">
      {/* Animated Food Decorative Elements */}
      <div className="absolute top-20 -left-20 w-64 h-64 opacity-20 animate-float" style={{ animationDelay: '0s' }}>
        <img src={rendangImage} alt="" className="w-full h-full object-cover rounded-full blur-sm" />
      </div>
      <div className="absolute top-1/2 -right-20 w-72 h-72 opacity-15 animate-float" style={{ animationDelay: '1s' }}>
        <img src={sateImage} alt="" className="w-full h-full object-cover rounded-full blur-sm" />
      </div>
      <div className="absolute bottom-20 left-10 w-56 h-56 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <img src={nasigorengImage} alt="" className="w-full h-full object-cover rounded-full blur-sm" />
      </div>
      
      {/* Floating Food Icons with Scroll Animation */}
      <div ref={(el) => {
        if (el && sectionRef.current) {
          gsap.set(el.children, { x: -100, opacity: 0, rotation: -45 });
          gsap.to(el.children, {
            x: 0,
            opacity: 0.3,
            rotation: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          });
        }
      }} className="absolute left-0 top-1/4 space-y-8 pointer-events-none hidden md:block">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 shadow-gold-glow animate-float">
          <img src={ayamgorengImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/30 shadow-gold-glow animate-float" style={{ animationDelay: '0.5s' }}>
          <img src={sotoImage} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      <div ref={(el) => {
        if (el && sectionRef.current) {
          gsap.set(el.children, { x: 100, opacity: 0, rotation: 45 });
          gsap.to(el.children, {
            x: 0,
            opacity: 0.3,
            rotation: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          });
        }
      }} className="absolute right-0 top-1/3 space-y-8 pointer-events-none hidden md:block">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary/30 shadow-gold-glow animate-float" style={{ animationDelay: '0.3s' }}>
          <img src={gadogadoImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 shadow-gold-glow animate-float" style={{ animationDelay: '0.8s' }}>
          <img src={rendangImage} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Menu Unggulan</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Hidangan <span className="text-gradient">Istimewa</span> Kami
          </h2>
          <p className="text-muted-foreground">
            Nikmati berbagai pilihan menu autentik Indonesia yang diolah dengan bahan premium
          </p>
        </div>

        {/* Menu Grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              onClick={() => handleItemClick(item)}
              className="group overflow-hidden bg-card cursor-pointer border-border/50 will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover will-change-transform"
                />
                
                {/* Shimmer overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500" />

                {/* Price Badge */}
                <div className="absolute bottom-2 left-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
                  {item.price}
                </div>

                {/* Hover Icon */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                    <Star className="w-4 h-4 text-primary" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-2 md:p-3">
                <h3 className="text-xs md:text-sm font-bold group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {item.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card border-border/50">
            {selectedItem && (
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-64 md:h-auto">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Floating Rating */}
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl flex items-center gap-1">
                    <Star className="w-4 h-4 text-gold" fill="currentColor" />
                    <span className="text-white font-semibold text-sm">4.9</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-bold mb-2 text-gradient">
                        {selectedItem.name}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                      {selectedItem.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between py-3 border-b border-border/30">
                        <span className="text-sm text-muted-foreground">Harga</span>
                        <span className="text-2xl font-bold text-primary">{selectedItem.price}</span>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b border-border/30">
                        <span className="text-sm text-muted-foreground">Porsi</span>
                        <span className="font-semibold">1-2 Orang</span>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b border-border/30">
                        <span className="text-sm text-muted-foreground">Waktu Penyajian</span>
                        <span className="font-semibold">15-20 Menit</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                        Halal
                      </span>
                      <span className="px-3 py-1 bg-gold/10 text-gold text-xs rounded-full font-medium">
                        Premium
                      </span>
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                        Best Seller
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    onClick={handleWhatsAppOrder}
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-elegant group"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Pesan Sekarang via WhatsApp
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
