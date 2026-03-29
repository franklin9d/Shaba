import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView as useInViewObserver } from 'react-intersection-observer';
import {
  Menu, X, Users, Target, Award, Heart,
  Clock, MapPin, Phone, Mail, ChevronDown,
  Star, Shield, Zap, Globe, Handshake,
  FileText, Calendar, MessageCircle, ArrowLeft,
  Send, ExternalLink, ChevronUp, Play,
  Sparkles, BookOpen, Building2, GraduationCap
} from 'lucide-react';

// ============================================
// REAL DATA - Social Media & Contact
// ============================================
const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=61560308016426',
  facebookMain: 'https://www.facebook.com/ALforaten2021',
  x: 'https://x.com/shababalfaratin',
  xMain: 'https://x.com/alforaten2021',
  instagram: 'https://www.instagram.com/shabab_alfaratin/',
  instagramMain: 'https://www.instagram.com/alforaten2021/',
};

const CONTACT_INFO = {
  phone: '+964 777 567 1955',
  phoneClean: '+9647775671955',
  whatsapp: '9647775671955',
  address: 'بغداد، العراق',
  email: 'info@alforaten.iq',
};

// ============================================
// Custom Cursor Component
// ============================================
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-foratin-gold/50 pointer-events-none z-[9999] hidden lg:block mix-blend-difference"
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
    />
  );
};

// ============================================
// SVG Icons for Social Media
// ============================================
const FacebookIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const XIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TelegramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

// ============================================
// Particle Background
// ============================================
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['rgba(13,79,139,', 'rgba(16,185,129,', 'rgba(245,158,11,'];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `${p.color}${(1 - dist / 150) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

// ============================================
// Section Wrapper with Animations
// ============================================
const AnimatedSection = ({ children, className = '', id = '' }: {
  children: React.ReactNode; className?: string; id?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.section>
  );
};

// ============================================
// Navigation Component
// ============================================
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'principles', 'youth', 'activities', 'gallery', 'contact'];
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'about', label: 'عن التيار' },
    { id: 'principles', label: 'مبادئنا' },
    { id: 'youth', label: 'شبابنا' },
    { id: 'activities', label: 'أنشطتنا' },
    { id: 'contact', label: 'تواصل معنا' },
  ];

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-l from-foratin-gold via-foratin-green to-foratin-blue z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.nav
        className={`fixed top-1 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-2xl shadow-foratin-blue/10 py-2'
            : 'bg-transparent py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/images/logo.png"
                alt="شعار شباب تيار الفراتين"
                className="w-12 h-auto md:w-14 drop-shadow-lg"
              />
              <div className="hidden sm:block">
                <h1 className={`text-lg font-bold leading-tight ${isScrolled ? 'text-foratin-blue' : 'text-white'}`}>
                  شباب تيار الفراتين
                </h1>
                <p className={`text-[10px] tracking-wider ${isScrolled ? 'text-foratin-green' : 'text-white/80'}`}>
                  مواطنة .. وسطية .. عدالة
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-white'
                      : `${isScrolled ? 'text-gray-700 hover:text-foratin-blue' : 'text-white/90 hover:text-white'}`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-l from-foratin-blue to-foratin-blueDark rounded-xl shadow-lg shadow-foratin-blue/30"
                      layoutId="activeNav"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <motion.a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-foratin-green to-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-foratin-green/30 hover:shadow-foratin-green/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <WhatsAppIcon className="w-4 h-4" />
              سجّل معنا
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl ${isScrolled ? 'text-foratin-blue bg-foratin-blue/10' : 'text-white bg-white/10'}`}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="lg:hidden mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl shadow-2xl p-4 space-y-1 border border-gray-100">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-right px-4 py-3 rounded-xl font-medium transition-all ${
                        activeSection === item.id
                          ? 'bg-gradient-to-l from-foratin-blue to-foratin-blueDark text-white shadow-md'
                          : 'text-gray-700 hover:bg-foratin-blue/5'
                      }`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <motion.a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-l from-foratin-green to-emerald-600 text-white rounded-xl font-bold mt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    سجّل الآن
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

// ============================================
// Hero Section
// ============================================
const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.9]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#041e42] via-foratin-blueDark to-[#0a3d6b]">
        <ParticleField />
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        {/* Animated Circles */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)' }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 200" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="white"
            d="M0,128L60,122.7C120,117,240,107,360,112C480,117,600,139,720,144C840,149,960,139,1080,122.7C1200,107,1320,85,1380,74.7L1440,64L1440,200L1380,200C1320,200,1200,200,1080,200C960,200,840,200,720,200C600,200,480,200,360,200C240,200,120,200,60,200L0,200Z"
          />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center text-white"
        style={{ y, opacity, scale }}
      >
        {/* Logo */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.4, duration: 1.5 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-foratin-gold/30 to-foratin-green/30 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <img
                src="/images/logo.png"
                alt="شعار شباب تيار الفراتين"
                className="w-36 h-auto md:w-48 lg:w-56 drop-shadow-2xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4">
            <motion.span
              className="block text-5xl md:text-6xl lg:text-8xl mb-3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              شباب
            </motion.span>
            <motion.span
              className="bg-gradient-to-l from-foratin-goldLight via-foratin-gold to-yellow-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              تيار الفراتين
            </motion.span>
          </h1>
        </motion.div>

        {/* Slogan */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div className="h-px w-16 bg-gradient-to-l from-foratin-gold to-transparent" />
          <p className="text-lg md:text-xl text-foratin-goldLight font-medium tracking-wide">
            مواطنة .. وسطية .. عدالة
          </p>
          <div className="h-px w-16 bg-gradient-to-r from-foratin-gold to-transparent" />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          تنظيم سياسي وطني عراقي قلبه نابض بحب العراق والوطن والمواطن
          <br className="hidden md:block" />
          قاعدته الشعبية شبابية تسعى لبناء عراق أفضل
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          {[
            { number: 2021, label: 'سنة التأسيس', suffix: '' },
            { number: 18, label: 'محافظة عراقية', suffix: '+' },
            { number: 100, label: 'مجلس بلدي', suffix: '+' },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-foratin-gold group-hover:text-foratin-goldLight transition-colors">
                <CountUp end={stat.number} duration={2.5} delay={1.5} suffix={stat.suffix} />
              </div>
              <div className="text-white/70 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
        >
          <motion.a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، أريد التسجيل في شباب تيار الفراتين')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-gradient-to-l from-foratin-green to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-foratin-green/30 hover:shadow-foratin-green/50 transition-all flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <WhatsAppIcon className="w-6 h-6" />
            سجّل الآن
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </motion.a>
          <motion.button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-4 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-foratin-blue transition-all flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            تعرّف علينا
            <ChevronDown className="animate-bounce" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-7 h-11 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-3 bg-white/80 rounded-full"
            animate={{ opacity: [1, 0], y: [0, 10] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// About Section
// ============================================
const AboutSection = () => {
  return (
    <AnimatedSection id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-foratin-blue/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-foratin-green/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-foratin-blue/10 text-foratin-blue rounded-full font-medium text-sm mb-4">
            تعرّف علينا
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
            عن <span className="text-gradient">تيار الفراتين</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-l from-foratin-blue via-foratin-green to-foratin-gold mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-foratin-blue via-foratin-blueDark to-foratin-green rounded-3xl p-1 shadow-2xl shadow-foratin-blue/20">
              <div className="bg-white rounded-3xl p-8 md:p-10">
                <div className="flex justify-center mb-6">
                  <img
                    src="/images/logo.png"
                    alt="شعار تيار الفراتين"
                    className="w-44 h-auto md:w-52 drop-shadow-xl"
                  />
                </div>
                <div className="text-center">
                  <div className="inline-block px-4 py-1 bg-foratin-gold/10 text-foratin-gold rounded-full text-sm font-medium mb-3">
                    الأمين العام
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">محمد شياع السوداني</h3>
                  <p className="text-foratin-green font-medium">رئيس مجلس الوزراء العراقي</p>
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            <motion.div
              className="absolute -top-4 -right-4 bg-gradient-to-br from-foratin-gold to-yellow-500 text-white p-4 rounded-2xl shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Calendar className="w-7 h-7" />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 bg-gradient-to-br from-foratin-green to-emerald-500 text-white p-4 rounded-2xl shadow-xl"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <Star className="w-7 h-7" />
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div className="space-y-5">
            {[
              {
                icon: Clock,
                title: 'التأسيس',
                text: 'تأسس تيار الفراتين في 19 يناير 2021 على يد رئيس مجلس الوزراء محمد شياع السوداني، كحركة سياسية عراقية صميمية تهدف إلى تصحيح مسار عمل الدولة والوقوف بوجه الفساد.',
                color: 'foratin-blue',
              },
              {
                icon: Users,
                title: 'العمود الفقري',
                text: 'يمثل الشباب العمود الفقري لتيار الفراتين، فهم الشريحة الأكثر نشاطاً وحماساً والركيزة الأساسية في بناء عراق جديد خالٍ من الفساد والمحاصصة.',
                color: 'foratin-green',
              },
              {
                icon: Target,
                title: 'رؤيتنا',
                text: 'عراق موحد يعيش فيه جميع العراقيين بحرية وكرامة وعدالة، حيث تكون الدولة حاضنة للجميع وتسعى لبناء مستقبل زاهر للأجيال القادمة.',
                color: 'foratin-gold',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group glass rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-foratin-blue/20"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ x: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`bg-${item.color}/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-7 h-7 text-${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// ============================================
// Principles Section
// ============================================
const PrinciplesSection = () => {
  const principles = [
    { icon: Shield, title: 'الوطنية', description: 'الالتزام بوحدة العراق وسيادته واستقلاله، وحماية مكتسبات الشعب العراقي', gradient: 'from-blue-600 to-foratin-blue' },
    { icon: Handshake, title: 'العدالة', description: 'تحقيق العدالة الاجتماعية والمساواة بين جميع العراقيين بغض النظر عن الانتماء', gradient: 'from-emerald-500 to-foratin-green' },
    { icon: Zap, title: 'الإعمار', description: 'إعادة بناء العراق وتأهيل البنية التحتية لتحقيق التنمية المستدامة', gradient: 'from-amber-500 to-foratin-gold' },
    { icon: Globe, title: 'الشفافية', description: 'العمل بمبدأ الحوكمة الرشيدة ومكافحة الفساد بكل أشكاله', gradient: 'from-foratin-blue to-cyan-500' },
    { icon: Heart, title: 'التضامن', description: 'الوقوف مع المحتاجين ودعم الفئات المهمشة في المجتمع', gradient: 'from-rose-500 to-pink-500' },
    { icon: Award, title: 'التميز', description: 'السعي نحو الأفضل وتقديم خدمات متميزة تليق بالمواطن العراقي', gradient: 'from-foratin-gold to-orange-500' },
  ];

  return (
    <AnimatedSection id="principles" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230D4F8B' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container mx-auto px-4 relative">
        <motion.div className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-foratin-green/10 text-foratin-green rounded-full font-medium text-sm mb-4">
            قيمنا ومبادئنا
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
            المبادئ <span className="text-gradient">التي نؤمن بها</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-l from-foratin-blue via-foratin-green to-foratin-gold mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${principle.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`bg-gradient-to-br ${principle.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:shadow-lg transition-all duration-300`}>
                  <principle.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-white mb-3 transition-colors">{principle.title}</h3>
                <p className="text-gray-600 group-hover:text-white/90 leading-relaxed transition-colors">{principle.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// ============================================
// Youth Section
// ============================================
const YouthSection = () => {
  const [statsRef, statsInView] = useInViewObserver({ triggerOnce: true, threshold: 0.3 });

  const youthStats = [
    { number: 70, suffix: '%', label: 'من هم دون 35 سنة', icon: Users },
    { number: 50, suffix: '+', label: 'مجلس شبيبي', icon: Building2 },
    { number: 5000, suffix: '+', label: 'شباب منتسب', icon: Heart },
  ];

  const programs = [
    { title: 'برنامج القيادات الشابة', description: 'تأهيل وتطوير قيادات شابة قادرة على تحمل المسؤولية والمشاركة الفعالة في بناء مؤسسات الدولة', icon: Star },
    { title: 'برامج التدريب المهني', description: 'توفير فرص تدريب وتأهيل مهني للشباب في مختلف التخصصات لسوق العمل', icon: GraduationCap },
    { title: 'المبادرات التطوعية', description: 'تشجيع الشباب على المشاركة في الأعمال التطوعية وخدمة المجتمع', icon: Sparkles },
    { title: 'منتديات الحوار', description: 'خلق منصات للحوار والنقاش حول القضايا الوطنية والتحديات المعاصرة', icon: MessageCircle },
  ];

  return (
    <AnimatedSection id="youth" className="py-24 bg-gradient-to-br from-[#041e42] via-foratin-blueDark to-[#0a3d6b] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 border border-white/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 border border-white/5 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-lg rounded-full font-medium text-sm mb-4 border border-white/20">
            القوة الدافعة
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            شباب <span className="text-foratin-gold">الفراتين</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            الشباب هم عماد تيار الفراتين وحماته، وهم القوة الدافعة نحو عراق جديد
          </p>
          <div className="w-24 h-1.5 bg-foratin-gold mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16" ref={statsRef}>
          {youthStats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-foratin-gold/30 transition-all duration-500"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="bg-foratin-gold/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-foratin-gold" />
              </div>
              <div className="text-5xl font-black text-foratin-gold mb-2">
                {statsInView ? (
                  <CountUp end={stat.number} duration={2.5} suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <div className="text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Registration CTA */}
        <motion.div
          className="bg-gradient-to-l from-foratin-gold/20 to-foratin-green/20 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">انضم إلى شباب تيار الفراتين</h3>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            سجّل الآن وكن جزءاً من مسيرة بناء العراق الجديد. تواصل معنا عبر واتساب أو اتصل مباشرة
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <motion.a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، أريد التسجيل في شباب تيار الفراتين')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-l from-green-600 to-green-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-green-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <WhatsAppIcon className="w-6 h-6" />
              تواصل عبر واتساب
            </motion.a>
            <motion.a
              href={`tel:${CONTACT_INFO.phoneClean}`}
              className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-foratin-blue transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-6 h-6" />
              <span dir="ltr">{CONTACT_INFO.phone}</span>
            </motion.a>
          </div>
          <p className="text-foratin-goldLight text-sm">
            رقم التسجيل المباشر:
            <a href={`tel:${CONTACT_INFO.phoneClean}`} className="font-bold mr-2 hover:underline" dir="ltr">
              {CONTACT_INFO.phone}
            </a>
          </p>
        </motion.div>

        {/* Programs */}
        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              className="group flex items-start gap-5 p-7 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-foratin-gold/30 transition-all duration-500"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-gradient-to-br from-foratin-gold to-yellow-500 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <program.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-foratin-gold transition-colors">{program.title}</h3>
                <p className="text-white/70 leading-relaxed">{program.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// ============================================
// Activities Section
// ============================================
const ActivitiesSection = () => {
  const activities = [
    { title: 'حملة الإعمار الوطنية', description: 'حملة وطنية شاملة لإعمار المناطق المتضررة ودعم العوائل والأسر المحتاجة', date: '2024', icon: Building2, gradient: 'from-foratin-blue to-blue-600' },
    { title: 'المؤتمر الشبابي السنوي', description: 'انعقاد المؤتمر السنوي للشباب لمناقشة التحديات ووضع الخطط المستقبلية', date: 'يناير 2024', icon: Users, gradient: 'from-foratin-green to-emerald-600' },
    { title: 'برامج محو الأمية', description: 'مبادرة لمحو الأمية في المناطق المحرومة وتوفير فرص التعليم للجميع', date: 'مستمر', icon: BookOpen, gradient: 'from-foratin-gold to-orange-500' },
    { title: 'حملات التوعية الصحية', description: 'توفير الرعاية الصحية والوعي الصحي في المجتمعات المحلية', date: 'ربع سنوي', icon: Heart, gradient: 'from-rose-500 to-pink-500' },
    { title: 'دعم ذوي الاحتياجات', description: 'برامج دعم شاملة لذوي الاحتياجات الخاصة والأيتام', date: 'مستمر', icon: Handshake, gradient: 'from-purple-500 to-violet-500' },
    { title: 'البرنامج الاقتصادي', description: 'الاقتصاد الشاب - برنامج دعم المشاريع الصغيرة والمتوسطة للشباب', date: '2025', icon: Target, gradient: 'from-cyan-500 to-teal-500' },
  ];

  return (
    <AnimatedSection id="activities" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-foratin-gold/10 text-foratin-gold rounded-full font-medium text-sm mb-4">
            إنجازاتنا وأنشطتنا
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
            نشاطات <span className="text-gradient">متنوعة ومتميزة</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-l from-foratin-blue via-foratin-green to-foratin-gold mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              className="group relative bg-white p-7 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`bg-gradient-to-br ${activity.gradient} p-3.5 rounded-2xl group-hover:scale-110 transition-transform shadow-lg`}>
                  <activity.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                  {activity.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{activity.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{activity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// ============================================
// Contact Section
// ============================================
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build WhatsApp message
    const message = `السلام عليكم، أريد التسجيل في شباب تيار الفراتين%0A%0Aالاسم: ${formData.name}%0Aالهاتف: ${formData.phone}%0Aالمحافظة: ${formData.city}%0Aالرسالة: ${formData.message}`;
    
    setTimeout(() => {
      window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, '_blank');
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: '', phone: '', city: '', message: '' });
    }, 800);
  };

  const socialLinks = [
    { icon: FacebookIcon, label: 'فيسبوك', href: SOCIAL_LINKS.facebook, color: 'hover:bg-blue-600' },
    { icon: XIcon, label: 'منصة X', href: SOCIAL_LINKS.x, color: 'hover:bg-gray-800' },
    { icon: InstagramIcon, label: 'انستغرام', href: SOCIAL_LINKS.instagram, color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500' },
    { icon: WhatsAppIcon, label: 'واتساب', href: `https://wa.me/${CONTACT_INFO.whatsapp}`, color: 'hover:bg-green-600' },
  ];

  return (
    <AnimatedSection id="contact" className="py-24 bg-gradient-to-br from-gray-900 via-[#0a1628] to-foratin-blueDark text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div className="text-center mb-16">
          <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur rounded-full font-medium text-sm mb-4 border border-white/20">
            نحن هنا من أجلك
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            تواصل <span className="text-foratin-gold">معنا</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            سجّل معنا أو تواصل لأي استفسار - نحن هنا لخدمتك
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info - 2 columns */}
          <div className="lg:col-span-2 space-y-5">
            {/* Phone / Registration */}
            <motion.a
              href={`tel:${CONTACT_INFO.phoneClean}`}
              className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-foratin-green/30 transition-all group"
              whileHover={{ x: -5 }}
            >
              <div className="bg-gradient-to-br from-foratin-green to-emerald-500 p-3.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold mb-1 text-lg">رقم التسجيل</h3>
                <p className="text-foratin-goldLight font-bold text-lg" dir="ltr">{CONTACT_INFO.phone}</p>
                <p className="text-white/50 text-xs mt-1">اتصل أو أرسل واتساب للتسجيل</p>
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، أريد التسجيل في شباب تيار الفراتين')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-green-500/30 transition-all group"
              whileHover={{ x: -5 }}
            >
              <div className="bg-gradient-to-br from-green-600 to-green-500 p-3.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold mb-1 text-lg">واتساب</h3>
                <p className="text-white/70">تواصل مباشر عبر واتساب</p>
                <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  متوفرون الآن
                </p>
              </div>
            </motion.a>

            {/* Address */}
            <motion.div
              className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
              whileHover={{ x: -5 }}
            >
              <div className="bg-gradient-to-br from-foratin-gold to-yellow-500 p-3.5 rounded-xl shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold mb-1 text-lg">العنوان</h3>
                <p className="text-white/70">{CONTACT_INFO.address}</p>
              </div>
            </motion.div>

            {/* Social Media */}
            <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <h3 className="font-bold mb-4 text-lg text-center">تابعنا على منصات التواصل</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 ${social.color} transition-all duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>

              {/* Additional: Main Foratin accounts */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/50 text-xs mb-3 text-center">الصفحات الرسمية لتيار الفراتين</p>
                <div className="flex justify-center gap-3">
                  <a href={SOCIAL_LINKS.facebookMain} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl hover:bg-blue-600 transition-all" title="فيسبوك تيار الفراتين">
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a href={SOCIAL_LINKS.xMain} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl hover:bg-gray-700 transition-all" title="X تيار الفراتين">
                    <XIcon className="w-4 h-4" />
                  </a>
                  <a href={SOCIAL_LINKS.instagramMain} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl hover:bg-pink-600 transition-all" title="انستغرام تيار الفراتين">
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - 3 columns */}
          <motion.div
            className="lg:col-span-3 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">نموذج التسجيل والتواصل</h3>
              <p className="text-white/50 text-sm">سيتم إرسال بياناتك عبر واتساب مباشرة</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">الاسم الكامل</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-foratin-gold/50 focus:ring-2 focus:ring-foratin-gold/20 transition-all"
                    placeholder="الاسم الثلاثي"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">رقم الهاتف</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-foratin-gold/50 focus:ring-2 focus:ring-foratin-gold/20 transition-all"
                    placeholder="07XX XXX XXXX"
                    required
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">المحافظة</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-foratin-gold/50 focus:ring-2 focus:ring-foratin-gold/20 transition-all appearance-none"
                  required
                >
                  <option value="" className="bg-gray-900">اختر محافظتك</option>
                  {['بغداد', 'البصرة', 'نينوى', 'أربيل', 'النجف', 'كربلاء', 'ذي قار', 'بابل', 'ديالى', 'الأنبار', 'كركوك', 'صلاح الدين', 'واسط', 'ميسان', 'المثنى', 'القادسية', 'دهوك', 'السليمانية'].map(city => (
                    <option key={city} value={city} className="bg-gray-900">{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">رسالتك (اختياري)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-foratin-gold/50 focus:ring-2 focus:ring-foratin-gold/20 transition-all resize-none"
                  placeholder="اكتب رسالتك أو استفسارك..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 font-bold text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                  submitted
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-l from-foratin-gold to-yellow-500 text-gray-900 hover:shadow-2xl hover:shadow-foratin-gold/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
                ) : submitted ? (
                  <>تم بنجاح ✓</>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    أرسل عبر واتساب
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// ============================================
// Floating WhatsApp Button
// ============================================
const FloatingWhatsApp = () => {
  return (
    <motion.a
      href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، أريد التسجيل في شباب تيار الفراتين')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 hover:bg-green-600 transition-all"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
      title="تواصل عبر واتساب"
    >
      <WhatsAppIcon className="w-7 h-7" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
    </motion.a>
  );
};

// ============================================
// Scroll to Top Button
// ============================================
const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-foratin-blue text-white p-3 rounded-full shadow-2xl shadow-foratin-blue/30 hover:bg-foratin-blueDark transition-all"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ============================================
// Footer
// ============================================
const Footer = () => {
  const socialLinks = [
    { icon: FacebookIcon, href: SOCIAL_LINKS.facebook, label: 'فيسبوك' },
    { icon: XIcon, href: SOCIAL_LINKS.x, label: 'X' },
    { icon: InstagramIcon, href: SOCIAL_LINKS.instagram, label: 'انستغرام' },
    { icon: WhatsAppIcon, href: `https://wa.me/${CONTACT_INFO.whatsapp}`, label: 'واتساب' },
  ];

  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="text-center md:text-right">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <img src="/images/logo.png" alt="شعار تيار الفراتين" className="w-14 h-auto" />
              <div>
                <h3 className="text-xl font-bold">شباب تيار الفراتين</h3>
                <p className="text-gray-500 text-xs">مواطنة .. وسطية .. عدالة</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              تنظيم سياسي وطني عراقي قلبه نابض بحب العراق والوطن والمواطن. قاعدته الشعبية شبابية.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-bold text-lg mb-4 text-foratin-gold">روابط سريعة</h4>
            <div className="space-y-2">
              {[
                { label: 'عن التيار', id: 'about' },
                { label: 'مبادئنا', id: 'principles' },
                { label: 'شبابنا', id: 'youth' },
                { label: 'أنشطتنا', id: 'activities' },
                { label: 'تواصل معنا', id: 'contact' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block mx-auto text-gray-400 hover:text-foratin-gold transition-colors text-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-4 text-foratin-gold">تواصل معنا</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <a href={`tel:${CONTACT_INFO.phoneClean}`} className="block hover:text-white transition-colors" dir="ltr">
                {CONTACT_INFO.phone}
              </a>
              <p>{CONTACT_INFO.address}</p>
            </div>

            <div className="flex justify-center md:justify-start gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 p-2.5 rounded-xl hover:bg-foratin-blue transition-all duration-300 hover:scale-110"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} جميع الحقوق محفوظة لشباب تيار الفراتين
            </p>
            <div className="flex items-center gap-2 text-gray-600 text-xs">
              <span>🇮🇶</span>
              <span>صُنع بحب في العراق</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// Loading Screen
// ============================================
const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-gradient-to-br from-[#041e42] to-foratin-blueDark flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="text-center">
        <motion.img
          src="/images/logo.png"
          alt="شعار شباب تيار الفراتين"
          className="w-32 h-auto mx-auto mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-l from-foratin-gold to-foratin-green rounded-full"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: '50%' }}
          />
        </motion.div>
        <motion.p
          className="text-white/50 text-sm mt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          جارِ التحميل...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// ============================================
// Main App Component
// ============================================
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" dir="rtl">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <Navigation />
          <HeroSection />
          <AboutSection />
          <PrinciplesSection />
          <YouthSection />
          <ActivitiesSection />
          <ContactSection />
          <Footer />
          <FloatingWhatsApp />
          <ScrollToTop />
        </>
      )}
    </div>
  );
}

export default App;
