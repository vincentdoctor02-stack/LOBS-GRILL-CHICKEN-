import React, { useState, useEffect } from 'react';
import {
  Flame,
  Clock,
  Truck,
  Utensils,
  Star,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Menu,
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Check,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

// Define TS Interfaces for Menu Items
interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'Starters' | 'Grilled Chicken' | 'Sides' | 'Beverages' | 'Combos';
  spicy?: boolean;
  popular?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

// Menu Data
const MENU_ITEMS: MenuItem[] = [
  // Grilled Chicken (Highlights)
  {
    id: 'whole-chicken',
    name: 'Lobs Legendary Whole Chicken',
    price: 24.99,
    description: 'Whole butterfly-cut chicken, marinated for 24 hours in our 12-spice recipe, slow-cooked and flame-grilled to absolute juicy perfection.',
    image: 'https://images.unsplash.com/photo-1615557960901-d409eab546ca?auto=format&fit=crop&w=600&q=80',
    category: 'Grilled Chicken',
    popular: true
  },
  {
    id: 'half-chicken',
    name: 'The Fire-Grill Half Bird',
    price: 14.99,
    description: 'Half chicken flame-seared over natural hardwood charcoal, basted in our signature smoked-honey BBQ or secret peri-peri glaze.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&w=600&q=80',
    category: 'Grilled Chicken',
    popular: true
  },
  {
    id: 'skewer-feast',
    name: 'Flame-Seared Skewer Feast',
    price: 16.99,
    description: 'Three flame-grilled skewers of triple-marinated premium chicken breast, sweet bell peppers, and red onions with garlic herb butter.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    category: 'Grilled Chicken'
  },
  {
    id: 'peri-wings',
    name: 'Peri-Peri Fire Wings (8pcs)',
    price: 10.99,
    description: 'Fiery chicken wings tossed in our bold, tangy citrus peri-peri glaze. Grilled on high flame to lock in the smoky crispness.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80',
    category: 'Grilled Chicken',
    spicy: true,
    popular: true
  },
  {
    id: 'charcoal-burger',
    name: 'Lobs Crispy Charcoal Burger',
    price: 12.49,
    description: 'Flame-grilled breast fillet, sharp cheddar cheese, smoky grilled onion slabs, and house secret Lobs sauce inside a custom activated charcoal brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    category: 'Combos',
    popular: true
  },
  {
    id: 'ultimate-combo',
    name: 'The Ultimate Grill Combo',
    price: 29.99,
    description: 'Half bird, 4 Peri-Peri wings, 2 beef skewers, grilled garlic sweet corn, house-made slaw, and a generous portion of rustic fries.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    category: 'Combos',
    popular: true
  },
  // Starters
  {
    id: 'chicken-quesadilla',
    name: 'Smoked Chicken Quesadilla',
    price: 9.99,
    description: 'Charred grill chicken, triple melted jack cheddar cheese, and fire-roasted peppers in a crispy flour tortilla. Side of lime sour cream.',
    image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80',
    category: 'Starters'
  },
  {
    id: 'charcoal-corn',
    name: 'Charcoal Sweet Corn',
    price: 4.99,
    description: 'Two pieces of sweet local corn-on-the-cob charred over active wood fire coals, slathered in our famous garlic-chili butter and cotija cheese.',
    image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&fit=crop&w=600&q=80',
    category: 'Starters'
  },
  {
    id: 'mozzarella-logs',
    name: 'Crispy Garlic Mozzarella Logs',
    price: 7.99,
    description: 'Crunchy herb-breaded whole mozzarella logs fried golden, accompanied by our bold charcoal-charred marinara dip.',
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4b76ce?auto=format&fit=crop&w=600&q=80',
    category: 'Starters'
  },
  // Sides
  {
    id: 'garlic-fries',
    name: 'Garlic Butter Rustic Fries',
    price: 4.49,
    description: 'Crispy skin-on sea salt fries tossed in melted sweet garlic butter and fresh chopped Italian parsley.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    category: 'Sides'
  },
  {
    id: 'grilled-veggies',
    name: 'Flame-Grilled Garden Veggies',
    price: 5.49,
    description: 'Smoky fire-seared zucchini spears, sweet bell peppers, and crimson red onions drizzled with a thick balsamic glaze.',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80',
    category: 'Sides'
  },
  {
    id: 'jalapeno-slaw',
    name: 'Creamy Jalapeño House Slaw',
    price: 3.99,
    description: 'Shredded crispy green and purple cabbage, hand-cut carrots tossed in a rich cilantro-lime and sweet jalapeño dressing.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    category: 'Sides'
  },
  // Combos
  {
    id: 'single-pack',
    name: 'Single Flame Pack',
    price: 18.99,
    description: 'Half bird, choice of garlic butter fries or jalapeño slaw, 1 house dipping sauce, and 1 direct-refill craft fountain beverage.',
    image: 'https://images.unsplash.com/photo-1560614382-33bd4ebd1b9d?auto=format&fit=crop&w=600&q=80',
    category: 'Combos'
  },
  {
    id: 'double-feast',
    name: 'Double Fire-Feast Pack',
    price: 34.99,
    description: 'One whole bird, golden potato wedges, family-sized house slaw, 2 signature dipping sauces, and 2 craft beverages or craft draft beers.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    category: 'Combos'
  },
  // Beverages
  {
    id: 'flame-lemonade',
    name: 'Craft Flame-Char Lemonade',
    price: 3.49,
    description: 'Artisanal lemonade crafted with hand-squeezed yellow lemons and caramelized, charred lemon wheels with a cool crushed mint finish.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    category: 'Beverages'
  },
  {
    id: 'amber-ale',
    name: 'Lobs Smoked Amber Draft',
    price: 6.99,
    description: 'Our proprietary craft amber beer, custom-brewed with smoked malts to elevate and pair perfectly with charred poultry skins.',
    image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&w=600&q=80',
    category: 'Beverages'
  },
  {
    id: 'mexican-coke',
    name: 'Glass Bottle Mexican Coke',
    price: 3.49,
    description: 'Classic imported ice-cold glass bottle of Coca-Cola, sweet sugar cane formulation.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    category: 'Beverages'
  }
];

// Testimonials Data
const TESTIMONIALS = [
  {
    name: 'Marcus Vance',
    role: 'Food Blogger & BBQ Enthusiast',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    quote: 'Absolutely mind-blowing chicken! The smoky charcoal flavor goes all the way to the bone, which is extremely rare. That secret marinade is sweet, citrusy, and deeply spiced. 10/10 will order every week.'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Local Resident',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    quote: 'Lobs Grill Chicken is our family savior! It arrives piping hot within 20 minutes, is incredibly fresh, and is so much healthier than fried food options. The Ultimate Grill Combo is a total steal.'
  },
  {
    name: 'Chef David Chen',
    role: 'Professional Grillmaster',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    quote: 'They get the charcoal heat levels exactly right. The skin is wonderfully charred, crispy and loaded with spice, while the meat remains soft and drips with juices. These guys are true culinary fire craftsmen.'
  }
];

// Gallery Images
const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1615557960901-d409eab546ca?auto=format&fit=crop&w=600&q=80', alt: 'Smoky chicken whole grill close-up' },
  { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', alt: 'Glazed wings sizzling on open flame' },
  { url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', alt: 'Tempting Lobs Charcoal burger with cheese' },
  { url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', alt: 'Tender chicken skewers with grilled peppers' },
  { url: 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&w=600&q=80', alt: 'Flame-grilled chicken platter on rustic board' },
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', alt: 'Cozy modern grill house ambient interior' },
  { url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80', alt: 'Juicy Peri-Peri wings served hot' },
  { url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80', alt: 'Happy group sharing grill platter and beers' }
];

export default function App() {
  // Navigation & UI States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState<'Starters' | 'Grilled Chicken' | 'Sides' | 'Beverages' | 'Combos'>('Grilled Chicken');
  const [imageLightbox, setImageLightbox] = useState<string | null>(null);

  // Cart States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  
  // Promotion States
  const [promoEmail, setPromoEmail] = useState('');
  const [isPromoSubmitted, setIsPromoSubmitted] = useState(false);
  const [enteredPromoCode, setEnteredPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Checkout Form State
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryType: 'delivery' as 'delivery' | 'pickup',
    instructions: '',
    platform: 'direct' as 'direct' | 'ubereats' | 'doordash' | 'grubhub'
  });

  // Live Order Tracking Simulation States (updates every few seconds)
  const [orderTrackingStep, setOrderTrackingStep] = useState(1);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Trigger temporary notification toast
  const triggerToast = (message: string) => {
    setNotificationToast(message);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  // Cart Handlers
  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === item.id);
      if (existing) {
        return prevCart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    triggerToast(`🔥 ${item.name} added to your order!`);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((c) => c.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((c) => {
          if (c.id === itemId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter((c): c is CartItem => c !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Promo Code Handler
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPromoCode.trim().toUpperCase() === 'LOBSFIRE10') {
      setIsPromoApplied(true);
      setPromoError('');
      triggerToast('🎉 10% Discount applied successfully!');
    } else {
      setPromoError('Invalid coupon code. Try LOBSFIRE10');
      setIsPromoApplied(false);
    }
  };

  // Cart Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = isPromoApplied ? subtotal * 0.1 : 0;
  const deliveryFee = checkoutForm.deliveryType === 'delivery' && subtotal > 0 ? 3.99 : 0;
  const total = subtotal - discountAmount + deliveryFee;

  // Checkout Form Submission
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone || (checkoutForm.deliveryType === 'delivery' && !checkoutForm.address)) {
      triggerToast('⚠️ Please fill out all required fields.');
      return;
    }
    
    // Switch on order tracking simulation
    setIsCheckoutOpen(false);
    setIsOrderConfirmed(true);
    setOrderTrackingStep(1);
    setIsCartOpen(false);
  };

  // Simulated order tracking increments
  useEffect(() => {
    if (isOrderConfirmed) {
      const timer = setInterval(() => {
        setOrderTrackingStep((prev) => {
          if (prev >= 4) {
            clearInterval(timer);
            return 4;
          }
          return prev + 1;
        });
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [isOrderConfirmed]);

  // Newsletter Email capture
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoEmail.trim()) {
      setIsPromoSubmitted(true);
      triggerToast('📧 10% Coupon code generated!');
    }
  };

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0C0D12] text-[#E4E9F0] selection:bg-[#FF4500] selection:text-white overflow-x-hidden font-sans">
      
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1D1E26] border-2 border-orange-600 text-white py-3 px-6 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
          <span className="font-medium text-sm sm:text-base">{notificationToast}</span>
        </div>
      )}

      {/* 1. Sticky Navbar */}
      <nav id="navbar" className="sticky top-0 z-40 bg-[#0C0D12]/95 backdrop-blur-md border-b border-white/5 py-4 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold tracking-tight text-white hover:opacity-90 transition-opacity cursor-pointer"
            id="nav-logo"
          >
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 bg-clip-text text-transparent">LOBS GRILL</span>
            <span className="text-amber-400">CHICKEN</span>
            <span className="animate-wiggle">🐔</span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase text-neutral-400">
            <button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors cursor-pointer">Home</button>
            <button onClick={() => scrollToSection('highlights')} className="hover:text-white transition-colors cursor-pointer">Signature</button>
            <button onClick={() => scrollToSection('why-us')} className="hover:text-white transition-colors cursor-pointer">Why Us</button>
            <button onClick={() => scrollToSection('full-menu')} className="hover:text-white transition-colors cursor-pointer">Menu</button>
            <button onClick={() => scrollToSection('gallery')} className="hover:text-white transition-colors cursor-pointer">Gallery</button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-white transition-colors cursor-pointer">Reviews</button>
            <button onClick={() => scrollToSection('order-options')} className="hover:text-white transition-colors cursor-pointer">Delivery</button>
            <button onClick={() => scrollToSection('location')} className="hover:text-white transition-colors cursor-pointer">Location</button>
          </div>

          {/* Nav Right CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Active Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:p-3 bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 rounded-full text-white hover:text-amber-400 transition-all cursor-pointer group"
              aria-label="Open Cart"
              id="cart-trigger-btn"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#0C0D12] animate-pulse">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Sticky Order Now CTA */}
            <button 
              onClick={() => scrollToSection('full-menu')}
              className="px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2"
              id="nav-order-now"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>Order Now</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden bg-neutral-900 border border-white/10 rounded-full hover:bg-neutral-800 text-white cursor-pointer"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="absolute top-[100%] left-0 w-full bg-[#0C0D12] border-b border-white/10 shadow-2xl z-30 lg:hidden py-6 px-4 flex flex-col gap-4 animate-fadeIn">
            <button onClick={() => scrollToSection('hero')} className="py-2.5 text-left text-lg font-semibold text-neutral-300 hover:text-white border-b border-white/5">Home</button>
            <button onClick={() => scrollToSection('highlights')} className="py-2.5 text-left text-lg font-semibold text-neutral-300 hover:text-white border-b border-white/5">Signature Dishes</button>
            <button onClick={() => scrollToSection('why-us')} className="py-2.5 text-left text-lg font-semibold text-neutral-300 hover:text-white border-b border-white/5">Why Lobs</button>
            <button onClick={() => scrollToSection('full-menu')} className="py-2.5 text-left text-lg font-semibold text-neutral-300 hover:text-white border-b border-white/5">Full Menu</button>
            <button onClick={() => scrollToSection('gallery')} className="py-2.5 text-left text-lg font-semibold text-neutral-300 hover:text-white border-b border-white/5">Ambience & Food</button>
            <button onClick={() => scrollToSection('testimonials')} className="py-2.5 text-left text-lg font-semibold text-neutral-300 hover:text-white border-b border-white/5">Reviews</button>
            <button onClick={() => scrollToSection('order-options')} className="py-2.5 text-left text-lg font-semibold text-neutral-300 hover:text-white border-b border-white/5">Delivery Options</button>
            <button onClick={() => scrollToSection('location')} className="py-2.5 text-left text-lg font-semibold text-neutral-300 hover:text-white border-b border-white/5">Location & Hours</button>
            
            <button 
              onClick={() => {
                scrollToSection('full-menu');
                setIsMobileMenuOpen(false);
              }}
              className="mt-4 w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-500 text-center font-extrabold text-white uppercase rounded-xl tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <Flame className="w-5 h-5 fill-white" />
              <span>Browse Full Menu</span>
            </button>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section id="hero" className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(12, 13, 18, 0.85), rgba(12, 13, 18, 0.95)), url('https://images.unsplash.com/photo-1615557960901-d409eab546ca?auto=format&fit=crop&w=1920&q=80')` }}>
        
        {/* Fire Sparks Overlay Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-amber-600 via-transparent to-transparent"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          {/* Flame Intro Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-600/10 border border-orange-500/30 text-orange-500 text-xs sm:text-sm font-bold uppercase tracking-widest mb-6 animate-pulse">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span>REAL WOODFIRE FLAME-GRILLED</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none">
            FLAME-GRILLED <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 bg-clip-text text-transparent">TO PERFECTION.</span> <br />
            <span className="text-white">BOLD TO THE BONE.</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl text-base sm:text-xl text-neutral-300 font-normal leading-relaxed mb-10">
            Freshly marinated for 24 hours in our secret family blend, grilled over screaming hot charcoal. No gas. No shortcuts. Just pure, unmatched smokiness.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
            <button 
              onClick={() => scrollToSection('full-menu')}
              className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-extrabold uppercase text-sm tracking-widest rounded-xl transition-all shadow-[0_4px_20px_rgba(234,88,12,0.4)] hover:shadow-[0_6px_30px_rgba(234,88,12,0.6)] transform hover:-translate-y-1 cursor-pointer"
            >
              Order Online Now
            </button>
            <button 
              onClick={() => scrollToSection('highlights')}
              className="w-full sm:w-auto px-8 py-4 bg-neutral-900 hover:bg-neutral-800 border border-white/20 text-white font-extrabold uppercase text-sm tracking-widest rounded-xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              View Signature Items
            </button>
          </div>

          {/* Trust Badges Row */}
          <div className="w-full border-t border-white/5 pt-8 grid grid-cols-3 gap-4 text-center max-w-3xl">
            <div className="flex flex-col items-center">
              <span className="text-amber-400 font-extrabold text-lg sm:text-2xl">4.8 ★★★★★</span>
              <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider font-semibold mt-1">15k+ Real Reviews</span>
            </div>
            <div className="flex flex-col items-center border-x border-white/5">
              <span className="text-white font-extrabold text-lg sm:text-2xl">100% FRESH</span>
              <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider font-semibold mt-1">Never-Frozen Poultry</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-orange-500 font-extrabold text-lg sm:text-2xl">&lt; 30 MINS</span>
              <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider font-semibold mt-1">Superfast Hot Delivery</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Signature Dishes / Menu Highlights */}
      <section id="highlights" className="py-24 px-4 sm:px-6 md:px-8 bg-[#090A0D]">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold text-xs sm:text-sm tracking-widest uppercase block mb-3">🔥 HOUSE FAVORITES</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">SIGNATURE FLAME HIGHLIGHTS</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-amber-500 mx-auto rounded-full"></div>
            <p className="text-neutral-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
              The crown jewels of our wood-fire grill. These masterfully grilled classics are guaranteed to trigger pure grill envy.
            </p>
          </div>

          {/* Signature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="highlights-grid">
            {MENU_ITEMS.filter(item => item.popular).slice(0, 6).map((item) => (
              <div 
                key={item.id} 
                className="bg-neutral-900/60 rounded-2xl overflow-hidden border border-white/5 flex flex-col group hover:border-orange-500/20 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transform hover:-translate-y-1.5"
                id={`highlight-card-${item.id}`}
              >
                
                {/* Image & Badges */}
                <div className="relative h-64 overflow-hidden bg-neutral-950">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.spicy && (
                      <span className="bg-red-600 text-white text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg">
                        🔥 EXTREME SPICY
                      </span>
                    )}
                    {item.popular && (
                      <span className="bg-amber-500 text-black text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg">
                        ⭐️ BESTSELLER
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#0C0D12]/90 backdrop-blur-md px-4 py-1.5 rounded-lg border border-white/10 font-bold text-amber-400 text-lg">
                    ${item.price.toFixed(2)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{item.name}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">{item.description}</p>
                  </div>
                  
                  {/* Add to Order CTA */}
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full py-3 bg-neutral-800 hover:bg-orange-600 text-white font-extrabold uppercase text-xs tracking-wider rounded-xl border border-white/10 hover:border-orange-500 transition-all cursor-pointer flex items-center justify-center gap-2 group-hover:bg-neutral-800 group-hover:hover:bg-orange-600"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add To Order</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section id="why-us" className="py-24 px-4 sm:px-6 md:px-8 bg-neutral-950 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold text-xs sm:text-sm tracking-widest uppercase block mb-3">🔥 THE LOBS DIFFERENCE</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">CRISP SKIN, CRACKLING EMBER, PURE MAGIC</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-amber-500 mx-auto rounded-full"></div>
            <p className="text-neutral-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
              Why settle for chemical-gassed ovens or greasy fryers? Here is why LOBS GRILL CHICKEN stands in a league of its own.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-neutral-900/40 p-8 rounded-2xl border border-white/5 text-center flex flex-col items-center group hover:border-orange-500/20 transition-all">
              <div className="w-16 h-16 rounded-full bg-orange-600/10 border border-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Flame className="w-8 h-8 text-orange-500 fill-orange-500/20" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Flame-Grilled Daily</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                We sear all chicken over genuine glowing hardwood briquettes. No gas or fake smoke flavorings are ever used.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-neutral-900/40 p-8 rounded-2xl border border-white/5 text-center flex flex-col items-center group hover:border-orange-500/20 transition-all">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">24hr Secret Marinade</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Soaked for a full 24 hours in a heritage blend of fresh lime juice, crushed garlic cloves, sweet chili, and wild thyme.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-neutral-900/40 p-8 rounded-2xl border border-white/5 text-center flex flex-col items-center group hover:border-orange-500/20 transition-all">
              <div className="w-16 h-16 rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Fast Hot Delivery</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Fitted with high-tech thermal sealed transport cells to block moisture escape. It arrives exactly as hot as on the fire-grill.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-neutral-900/40 p-8 rounded-2xl border border-white/5 text-center flex flex-col items-center group hover:border-orange-500/20 transition-all">
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Utensils className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">100% Fresh Farms</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Hand-selected free-roaming local chickens. Hand-trimmed and never frozen. Pure ingredients for bold flavors.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Full Menu Preview */}
      <section id="full-menu" className="py-24 px-4 sm:px-6 md:px-8 bg-[#090A0D]">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-orange-500 font-bold text-xs sm:text-sm tracking-widest uppercase block mb-3">🍴 MENU EXPLORER</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">THE FULL LOBS GRILL MENU</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-amber-500 mx-auto rounded-full"></div>
            <p className="text-neutral-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
              Build your perfect feast. Tap categories to browse starters, succulent chickens, sides, combos, and ice-cold drafts.
            </p>
          </div>

          {/* Menu Categories Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-3xl mx-auto bg-neutral-950/80 p-2 border border-white/5 rounded-xl sm:rounded-full">
            {(['Grilled Chicken', 'Starters', 'Sides', 'Combos', 'Beverages'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setActiveMenuCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer flex-grow md:flex-grow-0 text-center ${
                  activeMenuCategory === category 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Category Content List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" id="full-menu-list">
            {MENU_ITEMS.filter(item => item.category === activeMenuCategory).map((item) => (
              <div 
                key={item.id} 
                className="bg-neutral-900/25 hover:bg-neutral-900/50 p-4 sm:p-5 rounded-2xl border border-white/5 hover:border-orange-500/10 flex items-center gap-4 sm:gap-6 transition-all group"
                id={`menu-item-${item.id}`}
              >
                {/* Thumb Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-950">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>

                {/* Text Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                      {item.name}
                      {item.spicy && <span className="text-xs ml-1.5">🌶️</span>}
                    </h3>
                    <span className="text-amber-400 font-extrabold text-sm sm:text-base flex-shrink-0">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">{item.description}</p>
                  
                  {/* Simple Add to Order Button */}
                  <button 
                    onClick={() => addToCart(item)}
                    className="inline-flex items-center gap-1.5 text-xs text-orange-500 hover:text-orange-400 font-extrabold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Gallery */}
      <section id="gallery" className="py-24 px-4 sm:px-6 md:px-8 bg-neutral-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold text-xs sm:text-sm tracking-widest uppercase block mb-3">📸 EXPERIENCE LOBS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">OUR AMBIENCE & CREATIONS</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-amber-500 mx-auto rounded-full"></div>
            <p className="text-neutral-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
              A sensory tour of our fiery kitchen and modern fast-casual grill house. Tap any shot to zoom into the sizzle.
            </p>
          </div>

          {/* Responsive Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" id="gallery-grid">
            {GALLERY_IMAGES.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setImageLightbox(img.url)}
                className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 group cursor-zoom-in"
              >
                <img 
                  src={img.url} 
                  alt={img.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy"
                />
                
                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
                  <div className="text-left">
                    <span className="text-amber-400 font-extrabold text-[10px] tracking-widest uppercase">LOBS GALLERY</span>
                    <p className="text-white text-xs font-bold leading-tight mt-0.5">{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {imageLightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setImageLightbox(null)}>
          <button className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 text-white cursor-pointer hover:bg-neutral-800 transition-colors">
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl" onClick={e => e.stopPropagation()}>
            <img src={imageLightbox} alt="Enlarged Food Shot" className="w-full h-auto object-contain max-h-[85vh]" />
          </div>
        </div>
      )}

      {/* 7. Testimonials */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 md:px-8 bg-[#090A0D]">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold text-xs sm:text-sm tracking-widest uppercase block mb-3">🔥 REAL CHIRP FROM CUSTOMERS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">WHAT THE GRILL FEASTERS SAY</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-amber-500 mx-auto rounded-full"></div>
            <p className="text-neutral-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
              Don't just take our word for it. Read honest reviews from food experts and local chicken lovers.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <div 
                key={index}
                className="bg-neutral-900/50 p-8 rounded-2xl border border-white/5 hover:border-orange-500/20 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-neutral-300 text-sm sm:text-base italic leading-relaxed mb-8">
                    "{t.quote}"
                  </blockquote>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-neutral-800">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{t.name}</h4>
                    <span className="text-[11px] text-neutral-400 uppercase tracking-widest font-semibold block mt-0.5">{t.role}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Order/Delivery Section */}
      <section id="order-options" className="py-24 px-4 sm:px-6 md:px-8 bg-neutral-950 border-t border-white/5 relative">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          <span className="text-orange-500 font-bold text-xs sm:text-sm tracking-widest uppercase block mb-3">🔥 INSTANT CRAVING SATISFACTION</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">HOW TO ORDER YOUR FEAST</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-amber-500 mx-auto rounded-full mb-8"></div>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Get LOBS GRILL delivered hot directly to your doorstep, or skip the wait and pick up fresh from the grill. We have teamed up with top premium delivery services.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            
            {/* Lobs Direct Delivery (Recommended) */}
            <div className="p-6 bg-[#0E0F14] rounded-2xl border-2 border-orange-600/30 text-center flex flex-col justify-between hover:border-orange-500 transition-all shadow-[0_0_20px_rgba(234,88,12,0.1)]">
              <div>
                <span className="text-[10px] bg-orange-600 text-white font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full inline-block mb-3">RECOMMENDED</span>
                <h3 className="font-extrabold text-white text-lg mb-1">LOBS Direct</h3>
                <p className="text-neutral-400 text-xs mt-1">Superfast 30 min delivery, lower fees.</p>
              </div>
              <button 
                onClick={() => scrollToSection('full-menu')}
                className="mt-6 w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
              >
                Order Direct
              </button>
            </div>

            {/* Uber Eats */}
            <div className="p-6 bg-[#0E0F14] rounded-2xl border border-white/5 text-center flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <span className="text-[10px] bg-neutral-800 text-neutral-400 font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full inline-block mb-3">PARTNER</span>
                <h3 className="font-extrabold text-white text-lg mb-1">Uber Eats</h3>
                <p className="text-neutral-400 text-xs mt-1">Available via Uber Eats app inside delivery bounds.</p>
              </div>
              <a 
                href="https://ubereats.com" 
                target="_blank" 
                rel="noreferrer"
                className="mt-6 w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase rounded-xl transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <span>Uber Eats</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* DoorDash */}
            <div className="p-6 bg-[#0E0F14] rounded-2xl border border-white/5 text-center flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <span className="text-[10px] bg-neutral-800 text-neutral-400 font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full inline-block mb-3">PARTNER</span>
                <h3 className="font-extrabold text-white text-lg mb-1">DoorDash</h3>
                <p className="text-neutral-400 text-xs mt-1">Standard listing, delivery, and active group orders.</p>
              </div>
              <a 
                href="https://doordash.com" 
                target="_blank" 
                rel="noreferrer"
                className="mt-6 w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase rounded-xl transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <span>DoorDash</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Grubhub */}
            <div className="p-6 bg-[#0E0F14] rounded-2xl border border-white/5 text-center flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <span className="text-[10px] bg-neutral-800 text-neutral-400 font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full inline-block mb-3">PARTNER</span>
                <h3 className="font-extrabold text-white text-lg mb-1">Grubhub</h3>
                <p className="text-neutral-400 text-xs mt-1">Easy checkout, student discounts active.</p>
              </div>
              <a 
                href="https://grubhub.com" 
                target="_blank" 
                rel="noreferrer"
                className="mt-6 w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase rounded-xl transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <span>Grubhub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Call to Order CTA */}
          <div className="bg-neutral-900/60 p-6 rounded-2xl border border-white/5 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h4 className="font-bold text-white text-base">Rather order via voice call?</h4>
              <p className="text-neutral-400 text-sm mt-0.5">Place your order with our friendly host team.</p>
            </div>
            <a 
              href="tel:+18005555627"
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-extrabold uppercase text-xs tracking-wider rounded-xl transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 fill-neutral-950 text-neutral-950" />
              <span>Call +1 (800) 555-LOBS</span>
            </a>
          </div>

        </div>
      </section>

      {/* 9. Location & Hours */}
      <section id="location" className="py-24 px-4 sm:px-6 md:px-8 bg-[#090A0D] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Info Column (Left) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              <div>
                <span className="text-orange-500 font-bold text-xs sm:text-sm tracking-widest uppercase block mb-3">📍 GRAB THE FLAVOR</span>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">VISIT THE GRILL HOUSE</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full mb-8"></div>
                
                {/* Contact items */}
                <div className="flex flex-col gap-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-neutral-900 border border-white/10 rounded-xl text-orange-500 flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-base">Address</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed mt-1">
                        427 Pitmasters Avenue, Suite B <br />
                        Smoky District, NY 10012
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-neutral-900 border border-white/10 rounded-xl text-orange-500 flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-base">Hotline Phone</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed mt-1">
                        Main House: +1 (800) 555-5627 <br />
                        Direct Order Helpline: +1 (800) 555-GRILL
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-neutral-900 border border-white/10 rounded-xl text-orange-500 flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-base">Inquiries</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed mt-1">
                        General: hello@lobsgrillchicken.com <br />
                        Franchising: fire@lobsgrillchicken.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours Table */}
              <div className="bg-neutral-900/60 rounded-2xl p-6 border border-white/5">
                <h3 className="font-extrabold text-white text-base uppercase tracking-wider mb-4 border-b border-white/5 pb-2">Opening Hours</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center justify-between text-neutral-300">
                    <span>Monday - Thursday</span>
                    <span className="font-bold text-white">11:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300">
                    <span>Friday - Saturday</span>
                    <span className="font-bold text-orange-500">11:00 AM - 12:00 AM (Late)</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-300">
                    <span>Sunday</span>
                    <span className="font-bold text-white">12:00 PM - 9:00 PM</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Dark Map Embed Placeholder (Right) */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 min-h-[400px] relative bg-[#12141D] group shadow-2xl">
              
              {/* Fake Map UI Grid */}
              <div className="absolute inset-0 bg-neutral-900/50 flex flex-col justify-between p-6 pointer-events-none z-10">
                <div className="bg-[#0C0D12]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg text-left inline-block self-start max-w-xs">
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                    LOBS GRILL CHICKEN
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">427 Pitmasters Ave, NY 10012</p>
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-neutral-500">Map rendering active</span>
                  <a 
                    href="https://google.com/maps" 
                    target="_blank" 
                    rel="noreferrer"
                    className="pointer-events-auto px-4 py-1.5 bg-neutral-950/95 border border-white/15 rounded-lg text-[11px] font-bold uppercase text-amber-400 hover:text-white transition-colors flex items-center gap-1 shadow-lg"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Aesthetic Mock Dark Map Canvas Background */}
              <div className="absolute inset-0 opacity-40 select-none pointer-events-none" style={{ backgroundImage: `radial-gradient(#ffffff0a 2px, transparent 2px)`, backgroundSize: '24px 24px' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                
                {/* Concentric Pulse Rings */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-40 h-40 border border-orange-500/20 rounded-full animate-ping opacity-30"></div>
                  <div className="absolute w-24 h-24 border border-orange-500/40 rounded-full animate-pulse opacity-40"></div>
                  <div className="absolute w-12 h-12 border-2 border-orange-500 rounded-full"></div>
                  
                  {/* Pin */}
                  <div className="relative z-20 w-8 h-8 rounded-full bg-orange-600 border-2 border-white flex items-center justify-center shadow-2xl animate-bounce">
                    <Flame className="w-4 h-4 fill-white text-white" />
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 10. Newsletter/Offers Signup */}
      <section id="offers-signup" className="py-24 px-4 sm:px-6 md:px-8 bg-neutral-950 border-t border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff450010] via-transparent to-transparent"></div>

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 sm:p-12 md:p-16 rounded-3xl border border-white/10 text-center relative z-10 shadow-2xl overflow-hidden">
          
          {/* Spicy Graphic Elements */}
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-orange-600/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>

          <span className="text-amber-400 font-extrabold text-xs sm:text-sm tracking-widest uppercase block mb-3 flex items-center justify-center gap-1">
            <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>JOIN THE FEAST CLUB</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">GET 10% OFF YOUR FIRST ORDER</h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Drop your email to receive an instant 10% coupon code, plus exclusive access to weekly spicy promotions, secret menu items, and limited-edition grill drops.
          </p>

          {!isPromoSubmitted ? (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
              <input 
                type="email" 
                required
                value={promoEmail}
                onChange={(e) => setPromoEmail(e.target.value)}
                placeholder="Enter your email address" 
                className="w-full px-5 py-4 bg-neutral-950/90 border border-white/15 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white placeholder-neutral-500 rounded-xl outline-none transition-all text-sm sm:text-base"
              />
              <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-extrabold uppercase text-xs sm:text-sm tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 flex-shrink-0"
              >
                <span>Reveal 10% Code</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="bg-orange-600/10 border-2 border-dashed border-orange-500/50 rounded-2xl p-6 max-w-md mx-auto text-center animate-fadeIn">
              <span className="text-xs text-orange-500 font-bold uppercase tracking-wider block mb-2">🎉 YOUR SPECIAL PROMO CODE IS REVEALED</span>
              <div className="flex items-center justify-center gap-2.5 mb-3 bg-[#0C0D12] py-2.5 px-4 rounded-xl border border-white/10">
                <span className="text-white font-mono font-extrabold text-xl sm:text-2xl tracking-widest">LOBSFIRE10</span>
              </div>
              <p className="text-neutral-400 text-xs leading-normal">
                Use this code at checkout to claim your 10% off! We've also sent this code and a welcome package to <strong className="text-neutral-200">{promoEmail}</strong>.
              </p>
            </div>
          )}

          <p className="text-neutral-500 text-[11px] mt-6">
            We value your privacy. Unsubscribe at any time. We promise zero spam, only juicy grill updates.
          </p>

        </div>
      </section>

      {/* 11. Footer */}
      <footer className="bg-[#08090C] border-t border-white/5 py-16 px-4 sm:px-6 md:px-8 text-neutral-400 text-sm">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
            
            {/* Col 1: About */}
            <div className="flex flex-col gap-6">
              <button onClick={() => scrollToSection('hero')} className="flex items-center gap-2 text-xl font-extrabold text-white text-left cursor-pointer">
                <span className="text-orange-500">LOBS GRILL</span>
                <span className="text-amber-400">CHICKEN</span>
                <span>🐔</span>
              </button>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                LOBS GRILL CHICKEN is a modern premium fast-casual grill house. Driven by real coal woodfires, all-natural birds, and standard craft seasonings.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-neutral-900 border border-white/15 rounded-full text-neutral-400 hover:text-orange-500 hover:border-orange-500/40 transition-all" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-neutral-900 border border-white/15 rounded-full text-neutral-400 hover:text-orange-500 hover:border-orange-500/40 transition-all" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-neutral-900 border border-white/15 rounded-full text-neutral-400 hover:text-orange-500 hover:border-orange-500/40 transition-all" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h3 className="text-white font-extrabold text-xs uppercase tracking-widest mb-6">Explore Links</h3>
              <div className="flex flex-col gap-3 text-xs sm:text-sm">
                <button onClick={() => scrollToSection('hero')} className="text-left text-neutral-400 hover:text-white transition-colors cursor-pointer">Back to Top</button>
                <button onClick={() => scrollToSection('highlights')} className="text-left text-neutral-400 hover:text-white transition-colors cursor-pointer">Signature Specialties</button>
                <button onClick={() => scrollToSection('why-us')} className="text-left text-neutral-400 hover:text-white transition-colors cursor-pointer">The Lobs Guarantee</button>
                <button onClick={() => scrollToSection('full-menu')} className="text-left text-neutral-400 hover:text-white transition-colors cursor-pointer">Interactive Menu</button>
                <button onClick={() => scrollToSection('testimonials')} className="text-left text-neutral-400 hover:text-white transition-colors cursor-pointer">What Foodies Say</button>
              </div>
            </div>

            {/* Col 3: Quick Orders */}
            <div>
              <h3 className="text-white font-extrabold text-xs uppercase tracking-widest mb-6">Delivery Partners</h3>
              <div className="flex flex-col gap-3 text-xs sm:text-sm">
                <a href="https://ubereats.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Uber Eats Delivery</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="https://doordash.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>DoorDash Delivery</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="https://grubhub.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Grubhub Fast Order</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button onClick={() => scrollToSection('location')} className="text-left hover:text-white transition-colors">Find Location / Hours</button>
              </div>
            </div>

            {/* Col 4: Contact info */}
            <div>
              <h3 className="text-white font-extrabold text-xs uppercase tracking-widest mb-6">Contact & Support</h3>
              <p className="text-xs sm:text-sm leading-relaxed mb-4">
                427 Pitmasters Avenue, Suite B <br />
                Smoky District, NY 10012
              </p>
              <p className="font-bold text-white text-xs sm:text-sm mb-1">Helpline: +1 (800) 555-5627</p>
              <p className="text-xs text-neutral-500">Call charges may apply according to provider.</p>
            </div>

          </div>

          {/* Copyright Row */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-neutral-500 text-center sm:text-left">
              &copy; {new Date().getFullYear()} LOBS GRILL CHICKEN Restaurant Group. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-neutral-500">
              <a href="#" className="hover:text-neutral-300">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-300">Terms of Service</a>
              <a href="#" className="hover:text-neutral-300">Sitemap</a>
            </div>
          </div>

        </div>
      </footer>


      {/* INTERACTIVE SHOPPING CART DRAWER OVERLAY */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)}
          ></div>

          {/* Drawer Body */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#0C0D12] border-l border-white/10 flex flex-col justify-between shadow-2xl relative animate-slideLeft">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">Your Roast Order</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-white cursor-pointer"
                  id="close-cart-drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable List */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-orange-600/10 flex items-center justify-center mb-4">
                      <ShoppingBag className="w-8 h-8 text-neutral-400" />
                    </div>
                    <p className="text-white font-extrabold text-lg uppercase tracking-wide">Your Cart is Empty</p>
                    <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-xs leading-normal">
                      Add some hot, smoking-grilled chicken, delicious starters, and craft beverages from our menu highlights to start your feast!
                    </p>
                    <button 
                      onClick={() => {
                        setIsCartOpen(false);
                        scrollToSection('full-menu');
                      }}
                      className="mt-6 px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                    >
                      Browse Full Menu
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between bg-neutral-900/50 p-4 rounded-xl border border-white/5 gap-4"
                      id={`cart-item-card-${item.id}`}
                    >
                      {/* Image Thumbnail */}
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-950">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Name, Price & Quantity Managers */}
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-white text-xs sm:text-sm truncate">{item.name}</h4>
                        <span className="text-amber-400 font-extrabold text-xs sm:text-sm block mt-0.5">${(item.price * item.quantity).toFixed(2)}</span>
                        
                        {/* Qty Managers */}
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs text-white font-bold px-1.5">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Bottom Invoice & CTA */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/5 bg-neutral-950/65">
                  
                  {/* Coupon Form */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2 mb-6">
                    <input 
                      type="text" 
                      placeholder="Coupon Code" 
                      value={enteredPromoCode}
                      onChange={(e) => setEnteredPromoCode(e.target.value)}
                      className="flex-grow px-3 py-2 bg-neutral-900 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 outline-none uppercase tracking-wider"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-extrabold text-xs uppercase rounded-xl border border-white/10 cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {promoError && <p className="text-red-500 text-[11px] mb-4 -mt-4">{promoError}</p>}
                  {isPromoApplied && (
                    <div className="flex items-center justify-between text-[11px] text-green-500 font-semibold mb-4 -mt-4">
                      <span>10% Off Applied (Code: LOBSFIRE10)</span>
                      <button 
                        type="button"
                        onClick={() => setIsPromoApplied(false)}
                        className="text-neutral-400 hover:text-white underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {/* Calculations */}
                  <div className="space-y-2 mb-6 text-xs sm:text-sm text-neutral-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    {isPromoApplied && (
                      <div className="flex justify-between text-green-500">
                        <span>Discount (10%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    {checkoutForm.deliveryType === 'delivery' && (
                      <div className="flex justify-between">
                        <span>Est. Delivery Fee</span>
                        <span className="text-white font-medium">${deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-white/5 pt-3 flex justify-between text-base sm:text-lg font-extrabold text-white">
                      <span className="uppercase tracking-wider">Total</span>
                      <span className="text-amber-400">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Actions */}
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center font-extrabold uppercase text-xs sm:text-sm tracking-widest rounded-xl hover:from-orange-500 hover:to-amber-400 transition-all cursor-pointer shadow-lg"
                    id="go-to-checkout-btn"
                  >
                    Proceed To Checkout
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}


      {/* INTERACTIVE CHECKOUT MODAL POPUP */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto" id="checkout-modal">
          <div className="bg-[#0C0D12] border border-white/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8" onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button 
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-wider">Place Your Roast Order</h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">Specify your preference, details, and finalize.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              
              {/* Service Toggle */}
              <div className="grid grid-cols-2 gap-2 bg-neutral-950 p-1 border border-white/5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setCheckoutForm({...checkoutForm, deliveryType: 'delivery'})}
                  className={`py-2 text-center text-xs sm:text-sm font-extrabold uppercase rounded-lg transition-colors cursor-pointer ${
                    checkoutForm.deliveryType === 'delivery' 
                      ? 'bg-orange-600 text-white' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  🚚 Delivery ($3.99)
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutForm({...checkoutForm, deliveryType: 'pickup'})}
                  className={`py-2 text-center text-xs sm:text-sm font-extrabold uppercase rounded-lg transition-colors cursor-pointer ${
                    checkoutForm.deliveryType === 'pickup' 
                      ? 'bg-orange-600 text-white' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  🐔 Pickup (Free)
                </button>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                    placeholder="E.g. Chef Vance" 
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 focus:border-orange-500 rounded-xl text-white placeholder-neutral-500 outline-none text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                    placeholder="E.g. (555) 019-2834" 
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 focus:border-orange-500 rounded-xl text-white placeholder-neutral-500 outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Address (conditional on delivery) */}
              {checkoutForm.deliveryType === 'delivery' && (
                <div className="animate-fadeIn">
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Delivery Address *</label>
                  <input 
                    type="text" 
                    required={checkoutForm.deliveryType === 'delivery'}
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                    placeholder="E.g. 104 Flame Boulevard, Apt 3C" 
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 focus:border-orange-500 rounded-xl text-white placeholder-neutral-500 outline-none text-xs sm:text-sm"
                  />
                </div>
              )}

              {/* Cooking / Delivery Instructions */}
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Special Roast Instructions</label>
                <textarea 
                  value={checkoutForm.instructions}
                  onChange={(e) => setCheckoutForm({...checkoutForm, instructions: e.target.value})}
                  placeholder="E.g. Extra peri-peri dipping sauce, charred well, leave at front gate." 
                  rows={2}
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 focus:border-orange-500 rounded-xl text-white placeholder-neutral-500 outline-none text-xs sm:text-sm resize-none"
                ></textarea>
              </div>

              {/* Platform Selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Fulfill Order Via</label>
                <select 
                  value={checkoutForm.platform}
                  onChange={(e) => setCheckoutForm({...checkoutForm, platform: e.target.value as any})}
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 focus:border-orange-500 rounded-xl text-white outline-none text-xs sm:text-sm"
                >
                  <option value="direct">🔥 Lobs Direct Delivery (30 mins - Best Rate)</option>
                  <option value="ubereats">🛵 Uber Eats Partner</option>
                  <option value="doordash">🚘 DoorDash Partner</option>
                  <option value="grubhub">🚲 Grubhub Partner</option>
                </select>
              </div>

              {/* Brief Invoice */}
              <div className="bg-neutral-950 p-4 rounded-2xl border border-white/5 text-xs text-neutral-400 space-y-1">
                <div className="flex justify-between">
                  <span>Ordered Items:</span>
                  <span className="text-white font-medium">{cart.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                </div>
                <div className="flex justify-between">
                  <span>Grand Total:</span>
                  <span className="text-amber-400 font-extrabold">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center font-extrabold uppercase text-xs sm:text-sm tracking-widest rounded-xl hover:from-orange-500 hover:to-amber-400 transition-colors cursor-pointer shadow-lg mt-4"
              >
                Confirm & Place Roast Order 🔥
              </button>

            </form>
          </div>
        </div>
      )}


      {/* INTERACTIVE SIMULATED LIVE ORDER PROGRESS MODAL */}
      {isOrderConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto" id="order-confirmed-modal">
          <div className="bg-[#0C0D12] border-2 border-orange-600/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="text-center mb-8 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-orange-600/10 border-2 border-orange-500/30 flex items-center justify-center mb-4 text-orange-500">
                <CheckCircle className="w-10 h-10 animate-pulse" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wider">Order Confirmed!</h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">Lobs Kitchen is sparking up the grill. Follow along below!</p>
            </div>

            {/* Tracking Progress Simulation Box */}
            <div className="bg-neutral-900/60 rounded-2xl p-6 border border-white/5 space-y-6 mb-8">
              
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-neutral-400">Order ID: <strong className="text-white">#LGC-9283</strong></span>
                <span className="text-orange-500 font-extrabold animate-pulse uppercase tracking-wider">LIVE STATUS</span>
              </div>

              {/* Progress Steps Indicator */}
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-neutral-800 -z-10">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-1000" 
                    style={{ width: `${((orderTrackingStep - 1) / 3) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-center">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      orderTrackingStep >= 1 ? 'bg-orange-600 border-orange-500 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                    }`}>
                      1
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-white mt-2">Received</span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      orderTrackingStep >= 2 ? 'bg-orange-600 border-orange-500 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                    }`}>
                      2
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-white mt-2">Grilling</span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      orderTrackingStep >= 3 ? 'bg-orange-600 border-orange-500 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                    }`}>
                      3
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-white mt-2">On the Way</span>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      orderTrackingStep >= 4 ? 'bg-orange-600 border-orange-500 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                    }`}>
                      4
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-white mt-2">Arrived</span>
                  </div>
                </div>
              </div>

              {/* Descriptive Status line */}
              <div className="border-t border-white/5 pt-4 text-center">
                <p className="text-white text-sm sm:text-base font-extrabold flex items-center justify-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                  {orderTrackingStep === 1 && 'Order received! Our grill chef is checking the logs.'}
                  {orderTrackingStep === 2 && 'Your chicken is sizzling over burning charcoal now! Searing on the spice.'}
                  {orderTrackingStep === 3 && 'Order packed in thermal-sealed cell bags and out for hot delivery!'}
                  {orderTrackingStep === 4 && 'Piping hot Lobs Grill Chicken is delivered/ready for pickup! Enjoy!'}
                </p>
                <p className="text-neutral-400 text-xs mt-1">
                  {orderTrackingStep < 4 ? 'Status updates live every 10 seconds. Keep this screen open!' : 'Thank you for choosing Lobs Grill Chicken!'}
                </p>
              </div>

            </div>

            {/* Receipt Summary */}
            <div className="bg-neutral-950 p-5 rounded-2xl border border-white/5 mb-8 text-xs sm:text-sm text-neutral-400 max-h-40 overflow-y-auto space-y-2">
              <span className="text-[10px] font-extrabold tracking-widest uppercase block mb-1 text-white">RECEIPT SUMMARY</span>
              {cart.map((c) => (
                <div key={c.id} className="flex justify-between">
                  <span>{c.name} x{c.quantity}</span>
                  <span className="text-white font-medium">${(c.price * c.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-white/5 pt-2 flex justify-between text-white font-bold">
                <span>Grand Total Paid</span>
                <span className="text-amber-400">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Back to Site Button */}
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  clearCart();
                  setIsOrderConfirmed(false);
                }}
                className="flex-grow py-3 bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-white font-extrabold uppercase text-xs sm:text-sm tracking-wider rounded-xl cursor-pointer text-center"
              >
                Close Tracking & Reset Cart
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
