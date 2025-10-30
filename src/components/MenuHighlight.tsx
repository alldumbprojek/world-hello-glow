import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import rendangImage from "@/assets/menu-rendang.jpg";
import nasigorengImage from "@/assets/menu-nasigoreng.jpg";
import sateImage from "@/assets/menu-sate.jpg";
import gadogadoImage from "@/assets/menu-gadogado.jpg";
import sotoImage from "@/assets/menu-soto.jpg";
import ayamgorengImage from "@/assets/menu-ayamgoreng.jpg";
import { useState } from "react";
import { ShoppingCart, Star } from "lucide-react";

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
  {
    name: "Nasi Kuning Komplit",
    description: "Nasi kuning dengan lauk lengkap ayam, telur, dan perkedel",
    price: "Rp 55.000",
    image: nasigorengImage,
  },
  {
    name: "Rawon Surabaya",
    description: "Sup daging sapi dengan kuah hitam khas Jawa Timur",
    price: "Rp 70.000",
    image: rendangImage,
  },
  {
    name: "Pecel Lele",
    description: "Lele goreng crispy dengan sambal dan lalapan segar",
    price: "Rp 40.000",
    image: ayamgorengImage,
  },
  {
    name: "Nasi Uduk Betawi",
    description: "Nasi gurih dengan ayam goreng, telur balado, dan kerupuk",
    price: "Rp 50.000",
    image: nasigorengImage,
  },
  {
    name: "Gulai Kambing",
    description: "Daging kambing empuk dengan kuah gulai rempah tradisional",
    price: "Rp 90.000",
    image: rendangImage,
  },
  {
    name: "Ikan Bakar Sambal Matah",
    description: "Ikan segar bakar dengan sambal matah khas Bali",
    price: "Rp 75.000",
    image: sateImage,
  },
];

export const MenuHighlight = () => {
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState(6);

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

  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + 6, menuItems.length));
  };

  const displayedItems = menuItems.slice(0, visibleItems);

  return (
    <section id="menu" className="py-16 md:py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-2">Menu Unggulan</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Hidangan <span className="text-gradient">Istimewa</span> Kami
          </h2>
          <p className="text-muted-foreground">
            Nikmati berbagai pilihan menu autentik Indonesia yang diolah dengan bahan premium
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {displayedItems.map((item, index) => (
            <Card
              key={index}
              onClick={() => handleItemClick(item)}
              className="group overflow-hidden bg-card cursor-pointer border-border/50"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Price Badge */}
                <div className="absolute bottom-2 left-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-lg text-xs font-semibold shadow-lg">
                  {item.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-2 md:p-3">
                <h3 className="text-xs md:text-sm font-bold line-clamp-2">
                  {item.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button - Mobile Only */}
        {visibleItems < menuItems.length && (
          <div className="flex justify-center mt-8 md:hidden">
            <Button 
              onClick={handleLoadMore}
              variant="outline"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Tampilkan Lebih Banyak
            </Button>
          </div>
        )}

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
