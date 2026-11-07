import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, ArrowRight, ArrowLeft, Globe, 
  Hexagon, Triangle, Circle, Square, 
  CheckCircle2, ChevronRight, ChevronLeft,
  Mail, Phone, MapPin, Instagram, Linkedin, Twitter
} from 'lucide-react';

// --- DATA & CONTENT ---

const translations = {
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', work: 'Work', process: 'Process', contact: 'Contact', quote: 'GET A QUOTE' },
    hero: {
      label: 'INTEGRATED MARKETING AGENCY',
      title1: 'WE BUILD BRANDS.',
      title2: 'WE CREATE EXPERIENCES.',
      title3: 'WE DRIVE GROWTH.',
      sub: 'An integrated marketing agency combining strategy, creativity, technology, and media to help ambitious businesses grow, compete and lead.',
      cta1: 'START A PROJECT',
      cta2: 'EXPLORE OUR WORK'
    },
    trust: 'Trusted by ambitious businesses globally',
    about: {
      title: 'WE DON\'T JUST MARKET BUSINESSES. WE BUILD THE SYSTEMS THAT HELP THEM GROW.',
      p1: 'ARQON is a premium full-service marketing and consulting agency. We believe that true growth happens at the intersection of rigorous strategy and bold creativity.',
      p2: 'We don\'t believe in isolated campaigns. We build cohesive digital ecosystems that transform how brands communicate, operate, and scale in modern markets.',
      stats: [
        { label: 'Years Experience', value: 12 },
        { label: 'Global Clients', value: 150 },
        { label: 'Industry Awards', value: 45 }
      ]
    },
    services: {
      label: 'OUR EXPERTISE',
      title: 'Integrated Solutions',
      items: [
        {
          id: 'strategy',
          title: 'Strategy & Consulting',
          desc: 'Data-driven blueprints for market dominance. We align your brand objectives with commercial reality.',
          caps: ['Market Research', 'Brand Positioning', 'Go-To-Market Strategy', 'Business Consulting'],
          img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'
        },
        {
          id: 'branding',
          title: 'Branding & Identity',
          desc: 'Crafting distinctive brand identities that command attention and build lasting emotional connections.',
          caps: ['Naming & Strategy', 'Visual Identity', 'Brand Guidelines', 'Rebranding'],
          img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80'
        },
        {
          id: 'digital',
          title: 'Digital Marketing',
          desc: 'Performance-focused digital campaigns designed to maximize ROI and scale customer acquisition.',
          caps: ['Performance Marketing', 'SEO / SEM', 'Social Media Management', 'Conversion Optimization'],
          img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
        },
        {
          id: 'creative',
          title: 'Creative Production',
          desc: 'Cinematic visuals and compelling narratives that bring your brand story to life across all touchpoints.',
          caps: ['Commercial Videography', 'Photography', 'Motion Graphics', 'Campaign Concepts'],
          img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80'
        },
        {
          id: 'realestate',
          title: 'Real Estate Marketing',
          desc: 'Specialized marketing systems for property developers, focusing on premium lead generation and project launches.',
          caps: ['Property Branding', 'Lead Generation Systems', '3D Visualizations', 'Launch Campaigns'],
          img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
        }
      ]
    },
    portfolio: {
      label: 'SELECTED WORK',
      title: 'Work That Speaks Louder Than Promises.',
      filters: ['All', 'Branding', 'Digital', 'Creative', 'Real Estate'],
      projects: [
        { id: 1, title: 'Aura Residences', category: 'Real Estate', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', size: 'large' },
        { id: 2, title: 'Nova Tech Launch', category: 'Digital', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', size: 'small' },
        { id: 3, title: 'Lumina Identity', category: 'Branding', img: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=800&q=80', size: 'small' },
        { id: 4, title: 'Apex Automotive', category: 'Creative', img: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80', size: 'medium' },
        { id: 5, title: 'Zenith Finance', category: 'Branding', img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80', size: 'small' }
      ]
    },
    process: {
      label: 'METHODOLOGY',
      title: 'From Idea To Impact.',
      steps: [
        { num: '01', title: 'Discover', desc: 'Deep dive into your business, market, and audience.' },
        { num: '02', title: 'Define', desc: 'Establish clear objectives, KPIs, and brand positioning.' },
        { num: '03', title: 'Strategize', desc: 'Develop the blueprint for creative and media execution.' },
        { num: '04', title: 'Create', desc: 'Produce high-end assets and campaign materials.' },
        { num: '05', title: 'Launch', desc: 'Deploy campaigns across selected digital ecosystems.' },
        { num: '06', title: 'Optimize', desc: 'Analyze data and refine for maximum performance.' }
      ]
    },
    contact: {
      label: 'START A PROJECT',
      title: 'Let\'s Build What\'s Next.',
      form: {
        next: 'Next Step',
        prev: 'Back',
        submit: 'Submit Request',
        step1: { title: 'Tell us about yourself', name: 'Full Name', email: 'Email Address' },
        step2: { title: 'What do you need?', hint: 'Select all that apply' },
        step3: { title: 'Estimated Budget', options: ['Under $10k', '$10k - $25k', '$25k - $50k', '$50k+'] },
        step4: { title: 'Review & Submit', success: 'Request Received. We will contact you shortly.' }
      }
    },
    footer: {
      tagline: 'Strategy. Creativity. Technology. Growth.',
      subscribe: 'Subscribe to our insights',
      rights: '© 2026 ARQON. All rights reserved.'
    }
  },
  ar: {
    nav: { home: 'الرئيسية', about: 'من نحن', services: 'خدماتنا', work: 'أعمالنا', process: 'منهجيتنا', contact: 'اتصل بنا', quote: 'اطلب عرض سعر' },
    hero: {
      label: 'وكالة تسويق متكاملة',
      title1: 'نبني العلامات التجارية.',
      title2: 'نصنع التجارب.',
      title3: 'ندفع عجلة النمو.',
      sub: 'وكالة تسويق متكاملة تجمع بين الاستراتيجية والإبداع والتكنولوجيا والوسائط لمساعدة الشركات الطموحة على النمو والمنافسة والريادة.',
      cta1: 'ابدأ مشروعاً',
      cta2: 'استكشف أعمالنا'
    },
    trust: 'محل ثقة الشركات الطموحة عالمياً',
    about: {
      title: 'نحن لا نسوق للشركات فحسب. نحن نبني الأنظمة التي تساعدها على النمو.',
      p1: 'أركون هي وكالة تسويق واستشارات متكاملة ورائدة. نحن نؤمن بأن النمو الحقيقي يحدث عند تقاطع الاستراتيجية الدقيقة والإبداع الجريء.',
      p2: 'نحن لا نؤمن بالحملات المعزولة. نحن نبني أنظمة رقمية متماسكة تغير طريقة تواصل العلامات التجارية وعملها وتوسعها في الأسواق الحديثة.',
      stats: [
        { label: 'سنوات الخبرة', value: 12 },
        { label: 'عملاء عالميون', value: 150 },
        { label: 'جوائز الصناعة', value: 45 }
      ]
    },
    services: {
      label: 'خبراتنا',
      title: 'حلول متكاملة',
      items: [
        {
          id: 'strategy',
          title: 'الاستراتيجية والاستشارات',
          desc: 'مخططات مبنية على البيانات للسيطرة على السوق. نحن نوائم أهداف علامتك التجارية مع الواقع التجاري.',
          caps: ['أبحاث السوق', 'تحديد مكانة العلامة', 'استراتيجية دخول السوق', 'استشارات الأعمال'],
          img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'
        },
        {
          id: 'branding',
          title: 'العلامات التجارية والهوية',
          desc: 'صياغة هويات مميزة للعلامات التجارية تلفت الانتباه وتبني روابط عاطفية دائمة.',
          caps: ['التسمية والاستراتيجية', 'الهوية البصرية', 'إرشادات العلامة', 'إعادة صياغة العلامة'],
          img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80'
        },
        {
          id: 'digital',
          title: 'التسويق الرقمي',
          desc: 'حملات رقمية تركز على الأداء مصممة لزيادة العائد على الاستثمار وتوسيع نطاق اكتساب العملاء.',
          caps: ['تسويق الأداء', 'تحسين محركات البحث', 'إدارة وسائل التواصل', 'تحسين التحويل'],
          img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
        },
        {
          id: 'creative',
          title: 'الإنتاج الإبداعي',
          desc: 'مرئيات سينمائية وروايات مقنعة تبث الحياة في قصة علامتك التجارية عبر جميع نقاط الاتصال.',
          caps: ['تصوير الفيديو التجاري', 'التصوير الفوتوغرافي', 'الرسوم المتحركة', 'مفاهيم الحملات'],
          img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80'
        },
        {
          id: 'realestate',
          title: 'التسويق العقاري',
          desc: 'أنظمة تسويق متخصصة للمطورين العقاريين، تركز على توليد عملاء محتملين متميزين وإطلاق المشاريع.',
          caps: ['تسويق العقارات', 'أنظمة توليد العملاء', 'التصورات ثلاثية الأبعاد', 'حملات الإطلاق'],
          img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
        }
      ]
    },
    portfolio: {
      label: 'أعمال مختارة',
      title: 'أعمال تتحدث بصوت أعلى من الوعود.',
      filters: ['الكل', 'العلامات التجارية', 'الرقمي', 'الإبداعي', 'العقارات'],
      projects: [
        { id: 1, title: 'مساكن أورا', category: 'العقارات', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', size: 'large' },
        { id: 2, title: 'إطلاق نوفا تك', category: 'الرقمي', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', size: 'small' },
        { id: 3, title: 'هوية لومينا', category: 'العلامات التجارية', img: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=800&q=80', size: 'small' },
        { id: 4, title: 'أبيكس للسيارات', category: 'الإبداعي', img: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80', size: 'medium' },
        { id: 5, title: 'زينيث للتمويل', category: 'العلامات التجارية', img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80', size: 'small' }
      ]
    },
    process: {
      label: 'المنهجية',
      title: 'من الفكرة إلى التأثير.',
      steps: [
        { num: '01', title: 'الاكتشاف', desc: 'الغوص العميق في عملك وسوقك وجمهورك.' },
        { num: '02', title: 'التحديد', desc: 'وضع أهداف واضحة ومؤشرات أداء رئيسية وتحديد مكانة العلامة.' },
        { num: '03', title: 'الاستراتيجية', desc: 'تطوير المخطط للتنفيذ الإبداعي والإعلامي.' },
        { num: '04', title: 'الابتكار', desc: 'إنتاج أصول عالية الجودة ومواد الحملة.' },
        { num: '05', title: 'الإطلاق', desc: 'نشر الحملات عبر الأنظمة البيئية الرقمية المختارة.' },
        { num: '06', title: 'التحسين', desc: 'تحليل البيانات والتحسين لتحقيق أقصى أداء.' }
      ]
    },
    contact: {
      label: 'ابدأ مشروعاً',
      title: 'دعنا نبني ما هو قادم.',
      form: {
        next: 'الخطوة التالية',
        prev: 'رجوع',
        submit: 'إرسال الطلب',
        step1: { title: 'أخبرنا عن نفسك', name: 'الاسم الكامل', email: 'البريد الإلكتروني' },
        step2: { title: 'ما الذي تحتاجه؟', hint: 'اختر كل ما ينطبق' },
        step3: { title: 'الميزانية التقديرية', options: ['أقل من 10 آلاف', '10 - 25 ألف', '25 - 50 ألف', 'أكثر من 50 ألف'] },
        step4: { title: 'مراجعة وإرسال', success: 'تم استلام الطلب. سنتصل بك قريباً.' }
      }
    },
    footer: {
      tagline: 'استراتيجية. إبداع. تكنولوجيا. نمو.',
      subscribe: 'اشترك في رؤيتنا',
      rights: '© 2026 أركون. جميع الحقوق محفوظة.'
    }
  }
};

// --- CONTEXT ---
const LanguageContext = createContext();

// --- UTILS & SHARED COMPONENTS ---
const easing = [0.16, 1, 0.3, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easing } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const SectionHeader = ({ label, title, className = "" }) => {
  return (
    <motion.div 
      variants={fadeInUp} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }}
      className={`mb-16 md:mb-24 ${className}`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-[1px] bg-blue-600"></div>
        <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">{label}</span>
      </div>
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">{title}</h2>
    </motion.div>
  );
};

const Button = ({ children, variant = 'primary', onClick, type = 'button', className = "", icon = null }) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 group overflow-hidden relative";
  const variants = {
    primary: "bg-white text-[#050505] hover:bg-gray-200",
    secondary: "bg-transparent text-white border border-white/20 hover:bg-white hover:text-[#050505]",
    blue: "bg-blue-600 text-white hover:bg-blue-700"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="transform transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">{icon}</span>}
      </span>
    </button>
  );
};

const NumberCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = value / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [value, inView, duration]);

  return <span ref={nodeRef}>{count}</span>;
};

// --- MAIN SECTIONS ---

const Navbar = () => {
  const { lang, setLang, t } = useContext(LanguageContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.work, href: '#work' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#050505]/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <a href="#home" className="text-2xl font-bold tracking-tighter text-white z-50">
            ARQON<span className="text-blue-600">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-8">
              {navLinks.map((link, i) => (
                <a key={i} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="w-[1px] h-6 bg-white/20"></div>

            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'العربية' : 'EN'}
            </button>

            <Button variant="secondary" className="px-6 py-2.5 text-xs">
              {t.nav.quote}
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden z-50 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col justify-center px-6 pt-24"
          >
            <div className="flex flex-col gap-6 text-2xl font-semibold">
              {navLinks.map((link, i) => (
                <a key={i} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8">
              <button 
                onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 text-lg text-gray-300"
              >
                <Globe className="w-5 h-5" />
                {lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              </button>
              <Button onClick={() => { window.location.href='#contact'; setIsMobileMenuOpen(false); }}>
                {t.nav.quote}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { t, lang } = useContext(LanguageContext);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section id="home" className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80" 
          alt="Creative Agency" 
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
        />
      </motion.div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-4xl">
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
            <div className="w-8 h-[2px] bg-blue-600"></div>
            <span className="text-sm font-bold tracking-widest text-blue-500 uppercase">{t.hero.label}</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.1] mb-8">
            <motion.div variants={fadeInUp} className="overflow-hidden">
              <span className="block">{t.hero.title1}</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="overflow-hidden">
              <span className="block text-gray-400">{t.hero.title2}</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="overflow-hidden">
              <span className="block">{t.hero.title3}</span>
            </motion.div>
          </h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
            {t.hero.sub}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Button icon={lang === 'en' ? <ArrowRight className="w-4 h-4"/> : <ArrowLeft className="w-4 h-4"/>}>
              {t.hero.cta1}
            </Button>
            <Button variant="secondary">{t.hero.cta2}</Button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
      </div>
    </section>
  );
};

const TrustBar = () => {
  const { t } = useContext(LanguageContext);
  const icons = [Hexagon, Triangle, Circle, Square, Hexagon, Triangle];
  
  return (
    <div className="py-12 border-y border-white/5 bg-[#090B0E]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8">
          {t.trust}
        </p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {icons.map((Icon, i) => (
            <div key={i} className="flex items-center gap-2">
              <Icon className="w-8 h-8 text-gray-400" />
              <span className="text-xl font-bold text-gray-400 tracking-tighter">BRAND_{i+1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const { t } = useContext(LanguageContext);
  
  return (
    <section id="about" className="py-24 md:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
              {t.about.title}
            </h2>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              {t.about.p1}
            </p>
            <p className="text-lg text-gray-400 mb-12 leading-relaxed">
              {t.about.p2}
            </p>
            
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              {t.about.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <NumberCounter value={stat.value} /><span className="text-blue-600">+</span>
                  </div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative h-[600px] w-full group">
            <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80" 
              alt="Strategy meeting"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Design element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-blue-600/30 -z-10 hidden md:block"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-600 -z-10 hidden md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const { t, lang } = useContext(LanguageContext);
  const [activeService, setActiveService] = useState(t.services.items[0]);

  // Update active service if language changes to keep translation in sync
  useEffect(() => {
    const currentId = activeService.id;
    const updatedService = t.services.items.find(s => s.id === currentId);
    if(updatedService) setActiveService(updatedService);
  }, [lang, t]);

  return (
    <section id="services" className="py-24 md:py-32 bg-[#111419]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader label={t.services.label} title={t.services.title} />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 min-h-[600px]">
          {/* List */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {t.services.items.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveService(item)}
                className={`group flex items-center justify-between p-6 md:p-8 text-left transition-all duration-300 border-l-4 rtl:border-l-0 rtl:border-r-4 ${
                  activeService.id === item.id 
                    ? 'bg-[#1a1e26] border-blue-600' 
                    : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                <span className="text-xl md:text-2xl font-semibold text-white">
                  <span className="text-sm text-gray-500 mr-4 rtl:mr-0 rtl:ml-4 font-normal tracking-widest">
                    0{idx + 1}
                  </span>
                  {item.title}
                </span>
                <span className={`transform transition-transform ${activeService.id === item.id ? 'translate-x-2 rtl:-translate-x-2 text-blue-500' : 'text-gray-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1'}`}>
                   {lang === 'en' ? <ArrowRight className="w-5 h-5"/> : <ArrowLeft className="w-5 h-5"/>}
                </span>
              </button>
            ))}
          </div>

          {/* Details Pane */}
          <div className="lg:col-span-7 bg-[#090B0E] relative overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: easing }}
                className="flex-1 flex flex-col"
              >
                <div className="h-64 md:h-80 w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#090B0E]/40 z-10" />
                  <img 
                    src={activeService.img} 
                    alt={activeService.title}
                    className="w-full h-full object-cover mix-blend-luminosity opacity-60"
                  />
                </div>
                <div className="p-8 md:p-12 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-6">{activeService.title}</h3>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                      {activeService.desc}
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {activeService.caps.map((cap, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-300">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="secondary" className="w-fit self-start">
                    {lang === 'en' ? 'Learn More' : 'اعرف المزيد'}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const { t, lang } = useContext(LanguageContext);
  const [filter, setFilter] = useState(t.portfolio.filters[0]);

  // Keep filter in sync with language
  useEffect(() => {
    setFilter(t.portfolio.filters[0]);
  }, [lang, t]);

  const projects = t.portfolio.projects;
  const englishFilters = translations.en.portfolio.filters;
  
  // Mapping logic for filtering across languages
  const getFilterCategory = (activeFilterStr) => {
    const idx = t.portfolio.filters.indexOf(activeFilterStr);
    return englishFilters[idx]; // always use english base for logic if categories are hardcoded in english, BUT we used translated categories in data. Let's just use the translated string.
  };

  const filteredProjects = filter === t.portfolio.filters[0] 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="work" className="py-24 md:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader label={t.portfolio.label} title={t.portfolio.title} />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-16">
          {t.portfolio.filters.map((f, i) => (
            <button
              key={i}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                filter === f 
                  ? 'border-blue-600 bg-blue-600/10 text-white' 
                  : 'border-white/10 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className={`relative group overflow-hidden bg-[#111419] cursor-pointer ${
                  project.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
                  project.size === 'medium' ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                <div className="absolute inset-0 bg-[#050505]/40 z-10 transition-opacity duration-500 group-hover:bg-[#050505]/10" />
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-between">
                    {project.title}
                    <div className="w-10 h-10 rounded-full bg-white text-[#050505] flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-300 rtl:rotate-45 rtl:group-hover:rotate-0">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 flex justify-center">
          <Button variant="secondary">{lang === 'en' ? 'View All Projects' : 'عرض كل المشاريع'}</Button>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const { t } = useContext(LanguageContext);

  return (
    <section className="py-24 md:py-32 bg-[#111419] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader label={t.process.label} title={t.process.title} />

        <div className="relative mt-20">
          {/* Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {t.process.steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col relative"
              >
                <div className="text-4xl font-black text-transparent stroke-text mb-6 lg:mb-12">
                  {step.num}
                </div>
                {/* Node */}
                <div className="w-4 h-4 bg-blue-600 rounded-full mb-6 hidden lg:block border-4 border-[#111419]"></div>
                <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
      `}} />
    </section>
  );
};

const ContactForm = () => {
  const { t, lang } = useContext(LanguageContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', services: [], budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));
  
  const toggleService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service) 
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const formContent = t.contact.form;
  const servicesList = t.services.items.map(i => i.title);

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          
          <div>
            <SectionHeader label={t.contact.label} title={t.contact.title} className="mb-8" />
            <div className="space-y-8 text-gray-400 mt-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-blue-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-wider mb-1">Email</div>
                  <div className="text-white font-medium">hello@arqon.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-blue-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-wider mb-1">Phone</div>
                  <div className="text-white font-medium">+20 123 456 7890</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-blue-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-wider mb-1">Office</div>
                  <div className="text-white font-medium">Cairo, Egypt (Global Reach)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#111419] p-8 md:p-12 border border-white/5 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
              <motion.div 
                className="h-full bg-blue-600"
                initial={{ width: '25%' }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="mb-8 flex justify-between items-center text-sm font-bold tracking-widest uppercase text-gray-500">
              <span>Step {step} of 4</span>
              {step > 1 && !isSuccess && (
                <button onClick={handlePrev} className="hover:text-white transition-colors flex items-center gap-2">
                  {lang === 'en' ? <ChevronLeft className="w-4 h-4"/> : <ChevronRight className="w-4 h-4"/>}
                  {formContent.prev}
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key={`step${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}
                  className="space-y-8"
                >
                  {/* Step 1 */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-white mb-6">{formContent.step1.title}</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">{formContent.step1.name}</label>
                        <input 
                          required type="text" 
                          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-[#050505] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">{formContent.step1.email}</label>
                        <input 
                          required type="email" 
                          value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-[#050505] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{formContent.step2.title}</h3>
                      <p className="text-gray-500 text-sm mb-6">{formContent.step2.hint}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {servicesList.map((service, i) => (
                          <label key={i} className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${formData.services.includes(service) ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/10 text-gray-400 hover:border-white/30'}`}>
                            <div className={`w-5 h-5 flex items-center justify-center border ${formData.services.includes(service) ? 'border-blue-500 bg-blue-500' : 'border-gray-500'}`}>
                              {formData.services.includes(service) && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-sm font-medium">{service}</span>
                            <input 
                              type="checkbox" className="hidden"
                              checked={formData.services.includes(service)}
                              onChange={() => toggleService(service)}
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">{formContent.step3.title}</h3>
                      <div className="space-y-4">
                        {formContent.step3.options.map((opt, i) => (
                          <label key={i} className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${formData.budget === opt ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/10 text-gray-400 hover:border-white/30'}`}>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.budget === opt ? 'border-blue-500' : 'border-gray-500'}`}>
                                {formData.budget === opt && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                            </div>
                            <span className="font-medium">{opt}</span>
                            <input 
                              type="radio" name="budget" className="hidden"
                              checked={formData.budget === opt}
                              onChange={() => setFormData({...formData, budget: opt})}
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4 */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-white mb-6">{formContent.step4.title}</h3>
                      <div className="bg-[#050505] p-6 space-y-4 text-sm">
                        <div className="grid grid-cols-3 border-b border-white/10 pb-4">
                          <span className="text-gray-500">Name</span>
                          <span className="text-white col-span-2 font-medium">{formData.name || '-'}</span>
                        </div>
                        <div className="grid grid-cols-3 border-b border-white/10 pb-4">
                          <span className="text-gray-500">Email</span>
                          <span className="text-white col-span-2 font-medium">{formData.email || '-'}</span>
                        </div>
                        <div className="grid grid-cols-3 border-b border-white/10 pb-4">
                          <span className="text-gray-500">Services</span>
                          <span className="text-white col-span-2 font-medium">{formData.services.join(', ') || '-'}</span>
                        </div>
                        <div className="grid grid-cols-3">
                          <span className="text-gray-500">Budget</span>
                          <span className="text-white col-span-2 font-medium">{formData.budget || '-'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full"
                      icon={step < 4 ? (lang === 'en' ? <ArrowRight className="w-4 h-4"/> : <ArrowLeft className="w-4 h-4"/>) : null}
                      disabled={isSubmitting || (step === 1 && (!formData.name || !formData.email))}
                    >
                      {isSubmitting ? '...' : step < 4 ? formContent.next : formContent.submit}
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{formContent.step4.success}</h3>
                  <Button variant="secondary" onClick={() => {setStep(1); setIsSuccess(false); setFormData({name:'',email:'',services:[],budget:''})}} className="mt-8">
                    Start New Request
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useContext(LanguageContext);
  
  return (
    <footer className="bg-[#050505] pt-24 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div>
              <a href="#home" className="text-3xl font-bold tracking-tighter text-white block mb-6">
                ARQON<span className="text-blue-600">.</span>
              </a>
              <p className="text-gray-400 text-sm font-medium tracking-wide uppercase leading-relaxed max-w-xs">
                {t.footer.tagline}
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Navigation</h4>
            <ul className="space-y-4">
              {[t.nav.home, t.nav.about, t.nav.services, t.nav.work, t.nav.contact].map((link, i) => (
                <li key={i}><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Services</h4>
            <ul className="space-y-4">
              {t.services.items.map((s, i) => (
                <li key={i}><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{s.title}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">{t.footer.subscribe}</p>
            <form className="flex" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address"
                className="bg-[#111419] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-blue-500 w-full text-sm"
              />
              <button type="submit" className="bg-blue-600 px-4 flex items-center justify-center hover:bg-blue-700 transition-colors">
                 <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>{t.footer.rights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


// --- APP COMPONENT ---
export default function App() {
  const [lang, setLang] = useState('en');
  
  // Minimal CSS reset and base styles for the entire app
  useEffect(() => {
    document.body.style.backgroundColor = '#050505';
    document.body.style.color = '#ffffff';
    document.body.style.fontFamily = lang === 'en' 
      ? '"Inter", system-ui, -apple-system, sans-serif'
      : '"IBM Plex Sans Arabic", "Tajawal", system-ui, sans-serif';
  }, [lang]);

  const contextValue = {
    lang,
    setLang,
    t: translations[lang]
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      <div 
        dir={lang === 'ar' ? 'rtl' : 'ltr'} 
        className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden"
      >
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <About />
          <Services />
          <Portfolio />
          <Process />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}