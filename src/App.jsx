import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import {
  Download,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  CheckCircle2,
  ChevronRight,
  Send,
  Copy,
  Check,
  Terminal,
  Cpu,
  Flame,
  ArrowUpRight,
  Layers,
  Menu,
  X,
  Compass,
  BookOpen,
  Languages
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const heroRef = useRef(null);
  const heroPhotoRef = useRef(null);
  const heroNameRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroStatsRef = useRef(null);
  const heroCtaRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const languagesRef = useRef(null);
  const contactRef = useRef(null);

  // GSAP Context Lifecycle
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Stagger Entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(heroPhotoRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.9,
      })
      .from(heroNameRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
      }, '-=0.6')
      .from(heroTitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
      }, '-=0.6')
      .from(heroStatsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
      }, '-=0.5')
      .from(heroCtaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
      }, '-=0.4');

      // 2. About section reveal
      gsap.from('.about-content', {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
      });

      // 3. Experience Timeline cards animation
      const expCards = gsap.utils.toArray('.exp-card');
      expCards.forEach((card, index) => {
        const isEven = index % 2 === 0;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          x: isEven ? -60 : 60,
          duration: 0.9,
          ease: 'power3.out',
        });
      });

      // Dot pulse animation
      const expDots = gsap.utils.toArray('.exp-dot');
      expDots.forEach((dot) => {
        gsap.from(dot, {
          scrollTrigger: {
            trigger: dot,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(2)',
        });
      });

      // 4. Skills Dashboard Gauges
      const skillGauges = gsap.utils.toArray('.skill-circle-progress');
      skillGauges.forEach((gauge) => {
        const targetPercent = parseFloat(gauge.getAttribute('data-percent') || '0');
        const circumference = 2 * Math.PI * 42; // r=42
        const targetOffset = circumference - (circumference * targetPercent) / 100;

        gsap.fromTo(
          gauge,
          { strokeDashoffset: circumference },
          {
            scrollTrigger: {
              trigger: gauge,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            strokeDashoffset: targetOffset,
            duration: 1.5,
            ease: 'power2.out',
          }
        );
      });

      // Skill numbers counter
      const skillNumbers = gsap.utils.toArray('.skill-counter');
      skillNumbers.forEach((el) => {
        const targetVal = parseInt(el.getAttribute('data-value') || '0', 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetVal,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + '%';
          },
        });
      });

      // 5. Education Cards
      gsap.from('.edu-card', {
        scrollTrigger: {
          trigger: educationRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      });

      // 6. Contact Section Icons
      gsap.from('.contact-item', {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      });
    });

    // Navbar Scroll Listener
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Micro-interaction: Confetti & Copy
  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('Mouhamethkebe123@gmail.com');
    setCopied(true);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#D4A843', '#F5DB8B', '#FFFFFF'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCV = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#D4A843', '#F5DB8B', '#FFFFFF'],
    });

    // Generate dynamic printable CV blob
    const cvContent = `=====================================================
MOUHAMETH KÉBÉ — CURRICULUM VITAE
Étudiant en Licence Informatique | Entrepreneur Digital & Créateur de SaaS
Email: Mouhamethkebe123@gmail.com | Localisation: Thiès, Sénégal
=====================================================

PROFIL PROFESSIONNEL:
Étudiant en Licence Informatique à l'Université Iba Der Thiam de Thiès (UIDT)
et titulaire d'un Baccalauréat Scientifique (Série S).
Entrepreneur digital passionné par l'écosystème SaaS. Mon parcours d'exception,
débuté par l'enseignement coranique traditionnel (Daara) et poursuivi dans
les filières scientifiques et informatiques, m'a doté d'une discipline de fer,
d'une remarquable rigueur mentale et d'une capacité d'assimilation technologique accélérée.

EXPÉRIENCES CLÉS:
1. 2024 - Présent | Entrepreneur Digital & Développeur SaaS (Indépendant)
   - Conception, architecture et lancement d'applications SaaS web complètes.
   - Gestion de produit de l'idée initiale jusqu'à la mise en ligne et l'acquisition.
2. 2024 - 2025 | Créateur de Solution SaaS Digitale & Automatisation
   - Développement d'une plateforme d'optimisation et de suivi des ventes pour commerçants.
   - Implémentation d'interfaces utilisateur modernes, réactives et performantes.
3. Parcours Fondateur | Transition d'Excellence : Du Daara au Bac S
   - Années d'apprentissage coranique exigeant : maîtrise de la mémorisation et de la discipline.
   - Transition réussie vers l'enseignement scientifique sanctionné par le Baccalauréat Série S.

COMPÉTENCES MAJEURES:
- Développement SaaS & Applications Web Modernes (Full-Stack, React, JavaScript, APIs)
- Gestion de Projet & Product Management (Idéation, prototypage, déploiement)
- Logique & Résolution de Problèmes Complexes (Formation scientifique)
- Autonomie & Veille Technologique Rapide
- Discipline, Rigueur & Résilience Continue

FORMATION:
- 2026 - En cours: Licence en Informatique — Université Iba Der Thiam de Thiès (UIDT)
- 2026: Baccalauréat Scientifique Série S
- 2023: Brevet de Fin d'Études Moyennes (BFEM)
- Cycle Préparatoire: Enseignement Coranique au Daara (Mémorisation et rigueur morale)

LANGUES:
- Wolof (Maternelle) | Français (Courant) | Arabe (Intermédiaire) | Anglais (Intermédiaire technique)
=====================================================`;

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CV_Mouhameth_Kebe.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen bg-charcoal-900 text-cream-100 selection:bg-gold-500 selection:text-charcoal-950">
      
      {/* ======================================================== */}
      {/* A. NAVBAR — "La Signature Flottante" */}
      {/* ======================================================== */}
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 transition-all duration-300">
        <nav
          className={`w-full max-w-5xl rounded-full px-5 py-3 transition-all duration-500 flex items-center justify-between border ${
            navScrolled
              ? 'bg-charcoal-900/85 backdrop-blur-xl border-gold-500/25 shadow-2xl shadow-black/80'
              : 'bg-charcoal-950/40 backdrop-blur-md border-white/10'
          }`}
        >
          {/* Logo / Monogram */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-charcoal-800 border border-gold-500/40 flex items-center justify-center text-gold-400 font-serif font-bold text-lg tracking-wider group-hover:scale-105 transition-transform duration-300">
              MK
            </div>
            <div className="hidden sm:block text-left">
              <span className="block font-semibold text-sm tracking-tight text-cream-100 group-hover:text-gold-400 transition-colors">
                Mouhameth Kébé
              </span>
              <span className="block text-[11px] font-mono text-gold-400/80 -mt-0.5">
                SaaS Builder & IT Student
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="#about" className="link-lift text-cream-200 hover:text-gold-400 transition-colors">
              À propos
            </a>
            <a href="#experience" className="link-lift text-cream-200 hover:text-gold-400 transition-colors">
              Expérience
            </a>
            <a href="#skills" className="link-lift text-cream-200 hover:text-gold-400 transition-colors">
              Compétences
            </a>
            <a href="#education" className="link-lift text-cream-200 hover:text-gold-400 transition-colors">
              Formation
            </a>
            <a href="#contact" className="link-lift text-cream-200 hover:text-gold-400 transition-colors">
              Contact
            </a>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadCV}
              className="magnetic-btn hidden sm:inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-charcoal-950 px-4 py-2 rounded-full font-semibold text-xs tracking-wide uppercase transition-all shadow-md shadow-gold-500/20"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Télécharger CV</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-charcoal-800/80 flex items-center justify-center text-cream-100 hover:text-gold-400 border border-charcoal-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-4 right-4 bg-charcoal-950/95 backdrop-blur-2xl border border-gold-500/30 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-center z-50">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-cream-100 hover:text-gold-400"
            >
              À propos
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-cream-100 hover:text-gold-400"
            >
              Expérience
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-cream-100 hover:text-gold-400"
            >
              Compétences
            </a>
            <a
              href="#education"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-cream-100 hover:text-gold-400"
            >
              Formation
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-cream-100 hover:text-gold-400"
            >
              Contact
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownloadCV();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 text-charcoal-950 py-3 rounded-full font-semibold text-sm uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              Télécharger CV
            </button>
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* B. SECTION HERO — "La Première Impression" */}
      {/* ======================================================== */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
      >
        {/* Cinematic Backdrop Glow & Texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[140px] opacity-70" />
          <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-charcoal-700/30 rounded-full blur-[120px]" />
          
          {/* Subtle architectural grid lines */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #D4A843 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center z-10">
          
          {/* Photo de profil placeholder haut de gamme avec initiales & badge */}
          <div ref={heroPhotoRef} className="relative mb-8 group">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-[2px] bg-gradient-to-tr from-gold-600 via-gold-400 to-cream-100 shadow-2xl shadow-gold-500/20">
              <div className="w-full h-full rounded-full bg-charcoal-850 flex flex-col items-center justify-center overflow-hidden relative">
                {/* Monogram profile avatar */}
                <span className="font-serif text-4xl sm:text-5xl font-extrabold text-gold-400 tracking-wider">
                  MK
                </span>
                <span className="text-[10px] font-mono tracking-widest text-cream-300 uppercase mt-1">
                  Thiès • SN
                </span>

                {/* Subtle shine hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-gold-500/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Glowing online status badge */}
            <div className="absolute bottom-1 right-1 flex items-center gap-1.5 bg-charcoal-950/90 border border-gold-500/40 rounded-full px-2.5 py-1 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono font-medium text-emerald-400 tracking-tight">Actif</span>
            </div>
          </div>

          {/* Nom Massif */}
          <h1
            ref={heroNameRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-cream-100 mb-4 leading-none"
          >
            MOUHAMETH <span className="text-gold-gradient">KÉBÉ</span>
          </h1>

          {/* Titre Professionnel en Serif Italique */}
          <p
            ref={heroTitleRef}
            className="font-serif italic text-xl sm:text-3xl md:text-4xl text-gold-400/90 font-medium max-w-2xl mx-auto mb-7"
          >
            Entrepreneur Digital & Créateur de Solutions SaaS
          </p>

          {/* Stats en Monospace */}
          <div
            ref={heroStatsRef}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono text-xs sm:text-sm text-cream-200/80 mb-10 px-4 py-2.5 rounded-full bg-charcoal-800/60 border border-charcoal-700/80 backdrop-blur-md"
          >
            <span className="flex items-center gap-1.5 text-gold-300">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Licence Informatique UIDT
            </span>
            <span className="text-gold-500/50 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 text-cream-100">
              <Code2 className="w-3.5 h-3.5 text-gold-400" />
              SaaS & Web Applications
            </span>
            <span className="text-gold-500/50 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 text-cream-300">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              Thiès, Sénégal
            </span>
          </div>

          {/* CTA Buttons */}
          <div ref={heroCtaRef} className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleDownloadCV}
              className="magnetic-btn inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 px-7 py-3.5 rounded-full font-bold text-sm tracking-wide uppercase transition-all shadow-xl shadow-gold-500/20"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Télécharger mon CV</span>
            </button>

            <a
              href="#contact"
              className="magnetic-btn inline-flex items-center gap-2 bg-charcoal-850/80 hover:bg-charcoal-800 text-cream-100 border border-charcoal-700 hover:border-gold-500/50 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all"
            >
              <span>Me contacter</span>
              <ArrowUpRight className="w-4 h-4 text-gold-400" />
            </a>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-300/40 text-[11px] font-mono">
          <span className="tracking-widest uppercase">Faire défiler</span>
          <div className="w-5 h-9 rounded-full border border-cream-300/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-gold-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* C. À PROPOS — "Le Manifeste Personnel" */}
      {/* ======================================================== */}
      <section id="about" ref={aboutRef} className="py-24 sm:py-32 px-6 lg:px-12 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="bg-cream-100 text-charcoal-950 rounded-[2.5rem] p-8 sm:p-14 lg:p-20 shadow-2xl relative overflow-hidden">
            {/* Subtle decorative watermark */}
            <div className="absolute -right-8 -bottom-10 select-none pointer-events-none font-serif text-[180px] font-black text-charcoal-900/[0.03] leading-none">
              MK
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
              
              {/* Left Column: Dramatic Title */}
              <div className="about-content lg:col-span-5">
                <span className="font-mono text-xs uppercase tracking-widest text-gold-600 font-bold block mb-3">
                  // 01. Le Manifeste Personnel
                </span>
                <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 leading-tight">
                  Discipline, Science & Ambition Logicielle.
                </h2>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-12 h-1 bg-gold-500 rounded-full" />
                  <span className="text-xs font-mono text-charcoal-700 tracking-wider">
                    DE LA RIGUEUR AU CODE
                  </span>
                </div>
              </div>

              {/* Vertical Accent Line (Desktop) */}
              <div className="hidden lg:block lg:col-span-1 h-full min-h-[300px] border-r-2 border-gold-500/30 self-stretch my-2" />

              {/* Right Column: User Bio & Story */}
              <div className="about-content lg:col-span-6 flex flex-col gap-6 text-charcoal-850 text-base sm:text-lg leading-relaxed">
                <p className="font-medium text-charcoal-950 text-lg sm:text-xl leading-relaxed">
                  Je suis <strong className="text-charcoal-950 font-bold">Mouhameth Kébé</strong>, étudiant en Licence Informatique à l’Université Iba Der Thiam de Thiès (UIDT) et entrepreneur digital spécialisé dans la conception et le déploiement de produits SaaS.
                </p>

                <p>
                  Mon parcours se distingue par une trajectoire atypique et formatrice : après des années d'enseignement coranique intensif au <span className="text-charcoal-950 font-semibold underline decoration-gold-500 decoration-2 underline-offset-4">Daara</span> — qui ont enraciné en moi une discipline inébranlable, une mémorisation précise et une résistance à l’effort prolongé —, j’ai effectué une transition vers l’enseignement scientifique jusqu’à l'obtention du Baccalauréat Scientifique (Série S).
                </p>

                <p>
                  Aujourd'hui, j'applique cette double culture — rigueur spirituelle et logique mathématique — à l'univers technologique. Je ne me contente pas de coder des lignes ; je bâtis des applications logicielles complètes, scalables et centrées sur les besoins réels des utilisateurs et des entreprises.
                </p>

                {/* Highlights pill grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-charcoal-300/60 font-mono text-xs">
                  <div className="p-3 bg-white/70 rounded-xl border border-charcoal-200">
                    <span className="block text-gold-700 font-bold text-lg">100%</span>
                    <span className="text-charcoal-700">Dévouement & Rigueur</span>
                  </div>
                  <div className="p-3 bg-white/70 rounded-xl border border-charcoal-200">
                    <span className="block text-gold-700 font-bold text-lg">SaaS</span>
                    <span className="text-charcoal-700">Architecture Produit</span>
                  </div>
                  <div className="p-3 bg-white/70 rounded-xl border border-charcoal-200 col-span-2 sm:col-span-1">
                    <span className="block text-gold-700 font-bold text-lg">UIDT</span>
                    <span className="text-charcoal-700">Licence Informatique</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* D. EXPÉRIENCE — "La Timeline Vivante" */}
      {/* ======================================================== */}
      <section id="experience" ref={experienceRef} className="py-24 sm:py-32 px-6 max-w-6xl mx-auto relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-2">
            // 02. Parcours & Réalisations
          </span>
          <h2 className="font-serif italic text-4xl sm:text-5xl text-cream-100">
            La Timeline Vivante
          </h2>
          <p className="text-cream-300/80 text-sm sm:text-base mt-3">
            Chaque étape a façonné mes compétences entrepreneuriales et mon expertise technique.
          </p>
        </div>

        {/* Central Vertical Line */}
        <div className="relative">
          {/* Timeline Center Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-gold-500/80 via-gold-400/40 to-transparent" />

          <div className="flex flex-col gap-12 sm:gap-16">
            
            {/* Card 1: Entrepreneur SaaS Indépendant */}
            <div className="relative flex flex-col md:flex-row items-center">
              
              {/* Dot */}
              <div className="exp-dot absolute left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gold-500 border-4 border-charcoal-900 shadow-lg shadow-gold-500/50 z-20 flex items-center justify-center" />

              {/* Card Left */}
              <div className="exp-card w-full md:w-[46%] ml-12 md:ml-0 md:mr-auto pl-0 md:pr-8">
                <div className="card-prestige bg-charcoal-850 rounded-[2rem] p-7 sm:p-9 border border-charcoal-700/80 hover:border-gold-500/40 relative">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-gold-400 font-semibold bg-gold-500/10 border border-gold-500/20 px-3 py-1 rounded-full">
                      2024 — AUJOURD'HUI
                    </span>
                    <span className="text-[11px] font-mono text-cream-300/60 uppercase">
                      Projet Actif
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-cream-100 mb-1">
                    Entrepreneur Digital & Créateur de SaaS
                  </h3>
                  <p className="text-gold-400/90 text-sm font-medium mb-4">
                    Indépendant & Fondateur
                  </p>

                  <p className="text-cream-200/90 text-sm leading-relaxed mb-5">
                    Conception, architecture et déploiement d’applications logicielles SaaS modernes. Gestion de projet intégrale de bout en bout : identification d’opportunités, élaboration du cahier des charges, développement full-stack, intégration d'APIs et préparation du lancement commercial.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-[11px] font-mono bg-charcoal-800 text-cream-200 px-2.5 py-1 rounded-lg border border-charcoal-700">
                      SaaS Architecture
                    </span>
                    <span className="text-[11px] font-mono bg-charcoal-800 text-cream-200 px-2.5 py-1 rounded-lg border border-charcoal-700">
                      Full-Stack Dev
                    </span>
                    <span className="text-[11px] font-mono bg-charcoal-800 text-cream-200 px-2.5 py-1 rounded-lg border border-charcoal-700">
                      Gestion de Projet A à Z
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Plateforme SaaS Commerciale */}
            <div className="relative flex flex-col md:flex-row items-center">
              
              {/* Dot */}
              <div className="exp-dot absolute left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gold-500 border-4 border-charcoal-900 shadow-lg shadow-gold-500/50 z-20 flex items-center justify-center" />

              {/* Card Right */}
              <div className="exp-card w-full md:w-[46%] ml-12 md:ml-auto pr-0 md:pl-8">
                <div className="card-prestige bg-charcoal-850 rounded-[2rem] p-7 sm:p-9 border border-charcoal-700/80 hover:border-gold-500/40 relative">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-gold-400 font-semibold bg-gold-500/10 border border-gold-500/20 px-3 py-1 rounded-full">
                      2024 — 2025
                    </span>
                    <span className="text-[11px] font-mono text-cream-300/60 uppercase">
                      Produit SaaS
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-cream-100 mb-1">
                    Conception de Solution SaaS d'Automatisation
                  </h3>
                  <p className="text-gold-400/90 text-sm font-medium mb-4">
                    Plateforme Digitale de Gestion
                  </p>

                  <p className="text-cream-200/90 text-sm leading-relaxed mb-5">
                    Création d’une solution SaaS visant à accompagner les entrepreneurs et commerçants dans le pilotage et l'automatisation de leurs ventes. Conception d'un tableau de bord de métriques intuitif, optimisation des flux de commandes et structuration des bases de données.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-[11px] font-mono bg-charcoal-800 text-cream-200 px-2.5 py-1 rounded-lg border border-charcoal-700">
                      Product Design
                    </span>
                    <span className="text-[11px] font-mono bg-charcoal-800 text-cream-200 px-2.5 py-1 rounded-lg border border-charcoal-700">
                      Business Analytics
                    </span>
                    <span className="text-[11px] font-mono bg-charcoal-800 text-cream-200 px-2.5 py-1 rounded-lg border border-charcoal-700">
                      UX Réactive
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Du Daara au Bac S */}
            <div className="relative flex flex-col md:flex-row items-center">
              
              {/* Dot */}
              <div className="exp-dot absolute left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gold-500 border-4 border-charcoal-900 shadow-lg shadow-gold-500/50 z-20 flex items-center justify-center" />

              {/* Card Left */}
              <div className="exp-card w-full md:w-[46%] ml-12 md:ml-0 md:mr-auto pl-0 md:pr-8">
                <div className="card-prestige bg-charcoal-850 rounded-[2rem] p-7 sm:p-9 border border-charcoal-700/80 hover:border-gold-500/40 relative">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-gold-400 font-semibold bg-gold-500/10 border border-gold-500/20 px-3 py-1 rounded-full">
                      FONDATION ÉDUCATIVE
                    </span>
                    <span className="text-[11px] font-mono text-cream-300/60 uppercase">
                      Parcours d'Excellence
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-cream-100 mb-1">
                    Transition Réussie : Du Daara au Bac Scientifique (S)
                  </h3>
                  <p className="text-gold-400/90 text-sm font-medium mb-4">
                    Discipline Fondatrice & Réorientation Réussie
                  </p>

                  <p className="text-cream-200/90 text-sm leading-relaxed mb-5">
                    Années d'immersion dans l'enseignement coranique traditionnel, cultivant une concentration soutenue, la mémorisation méthodique et l'humilité du travail rigoureux. Passerelle réussie vers le système éducatif général jusqu'à décrocher le baccalauréat scientifique, tremplin vers l'informatique.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-[11px] font-mono bg-charcoal-800 text-cream-200 px-2.5 py-1 rounded-lg border border-charcoal-700">
                      Discipline Absolue
                    </span>
                    <span className="text-[11px] font-mono bg-charcoal-800 text-cream-200 px-2.5 py-1 rounded-lg border border-charcoal-700">
                      Mémoire & Concentration
                    </span>
                    <span className="text-[11px] font-mono bg-charcoal-800 text-cream-200 px-2.5 py-1 rounded-lg border border-charcoal-700">
                      Rigueur Scientifique
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* E. COMPÉTENCES — "Le Tableau de Bord" */}
      {/* ======================================================== */}
      <section id="skills" ref={skillsRef} className="py-24 sm:py-32 px-6 bg-charcoal-950/60 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-2">
              // 03. Le Tableau de Bord
            </span>
            <h2 className="font-serif italic text-4xl sm:text-5xl text-cream-100">
              Grille de Maîtrise
            </h2>
            <p className="text-cream-300/80 text-sm sm:text-base mt-3">
              Indicateurs précis de mes 5 compétences clés, mesurés par la pratique terrain et la formation.
            </p>
          </div>

          {/* Grille de Maîtrise avec anneaux SVG circulaires animés */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Skill 1 */}
            <div className="card-prestige bg-charcoal-850/90 rounded-[2.2rem] p-7 border border-charcoal-700/80 hover:border-gold-500/50 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-gold-400 uppercase tracking-wider">
                  Ingénierie Web
                </span>
                <Code2 className="w-5 h-5 text-gold-400" />
              </div>

              <div className="flex items-center gap-6 my-2">
                {/* SVG Gauge */}
                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="#1E1E26"
                      strokeWidth="8"
                    />
                    <circle
                      className="skill-circle-progress"
                      data-percent="92"
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="#D4A843"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 42}
                      strokeDashoffset={2 * Math.PI * 42}
                    />
                  </svg>
                  <span className="skill-counter absolute text-lg font-mono font-bold text-cream-100" data-value="92">
                    0%
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-cream-100 leading-snug">
                    Développement de SaaS & Apps Web
                  </h3>
                  <p className="text-xs text-cream-300/70 mt-1">
                    Conception full-stack, logique d'affaires, API, interfaces responsives.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-charcoal-700/60 flex items-center justify-between text-[11px] font-mono text-gold-300/80">
                <span>Frontend & Logiciel</span>
                <span>Niveau Avancé</span>
              </div>
            </div>

            {/* Skill 2 */}
            <div className="card-prestige bg-charcoal-850/90 rounded-[2.2rem] p-7 border border-charcoal-700/80 hover:border-gold-500/50 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-gold-400 uppercase tracking-wider">
                  Product Management
                </span>
                <Layers className="w-5 h-5 text-gold-400" />
              </div>

              <div className="flex items-center gap-6 my-2">
                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="#1E1E26"
                      strokeWidth="8"
                    />
                    <circle
                      className="skill-circle-progress"
                      data-percent="88"
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="#D4A843"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 42}
                      strokeDashoffset={2 * Math.PI * 42}
                    />
                  </svg>
                  <span className="skill-counter absolute text-lg font-mono font-bold text-cream-100" data-value="88">
                    0%
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-cream-100 leading-snug">
                    Gestion de Projet : De l'Idée au Lancement
                  </h3>
                  <p className="text-xs text-cream-300/70 mt-1">
                    Vision produit, roadmap, validation utilisateur, go-to-market.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-charcoal-700/60 flex items-center justify-between text-[11px] font-mono text-gold-300/80">
                <span>Cycle Produit</span>
                <span>Opérationnel</span>
              </div>
            </div>

            {/* Skill 3 */}
            <div className="card-prestige bg-charcoal-850/90 rounded-[2.2rem] p-7 border border-charcoal-700/80 hover:border-gold-500/50 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-gold-400 uppercase tracking-wider">
                  Esprit Analytique
                </span>
                <Cpu className="w-5 h-5 text-gold-400" />
              </div>

              <div className="flex items-center gap-6 my-2">
                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="#1E1E26"
                      strokeWidth="8"
                    />
                    <circle
                      className="skill-circle-progress"
                      data-percent="90"
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="#D4A843"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 42}
                      strokeDashoffset={2 * Math.PI * 42}
                    />
                  </svg>
                  <span className="skill-counter absolute text-lg font-mono font-bold text-cream-100" data-value="90">
                    0%
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-cream-100 leading-snug">
                    Logique & Résolution de Problèmes
                  </h3>
                  <p className="text-xs text-cream-300/70 mt-1">
                    Raisonnement algorithmique et socle mathématique scientifique (Bac S).
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-charcoal-700/60 flex items-center justify-between text-[11px] font-mono text-gold-300/80">
                <span>Rigueur Scientifique</span>
                <span>Structure Mentale</span>
              </div>
            </div>

            {/* Skill 4 */}
            <div className="card-prestige bg-charcoal-850/90 rounded-[2.2rem] p-7 border border-charcoal-700/80 hover:border-gold-500/50 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-gold-400 uppercase tracking-wider">
                  Agilité & Veille
                </span>
                <Compass className="w-5 h-5 text-gold-400" />
              </div>

              <div className="flex items-center gap-6 my-2">
                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="#1E1E26"
                      strokeWidth="8"
                    />
                    <circle
                      className="skill-circle-progress"
                      data-percent="95"
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="#D4A843"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 42}
                      strokeDashoffset={2 * Math.PI * 42}
                    />
                  </svg>
                  <span className="skill-counter absolute text-lg font-mono font-bold text-cream-100" data-value="95">
                    0%
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-cream-100 leading-snug">
                    Autonomie & Apprentissage Rapide
                  </h3>
                  <p className="text-xs text-cream-300/70 mt-1">
                    Assimilation express des nouvelles technologies, frameworks et outils IA.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-charcoal-700/60 flex items-center justify-between text-[11px] font-mono text-gold-300/80">
                <span>Capacité d'Adaptation</span>
                <span>Continue</span>
              </div>
            </div>

            {/* Skill 5 */}
            <div className="card-prestige bg-charcoal-850/90 rounded-[2.2rem] p-7 border border-charcoal-700/80 hover:border-gold-500/50 flex flex-col justify-between sm:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-gold-400 uppercase tracking-wider">
                  Force Mentale & Éthique
                </span>
                <Flame className="w-5 h-5 text-gold-400" />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 my-2">
                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="#1E1E26"
                      strokeWidth="8"
                    />
                    <circle
                      className="skill-circle-progress"
                      data-percent="98"
                      cx="50"
                      cy="50"
                      r="42"
                      fill="transparent"
                      stroke="#D4A843"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 42}
                      strokeDashoffset={2 * Math.PI * 42}
                    />
                  </svg>
                  <span className="skill-counter absolute text-lg font-mono font-bold text-cream-100" data-value="98">
                    0%
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-cream-100 leading-snug">
                    Discipline, Persévérance & Rigueur Inébranlable
                  </h3>
                  <p className="text-xs sm:text-sm text-cream-300/80 mt-1.5 leading-relaxed">
                    Héritage direct de la formation au Daara : concentration soutenue, résilience face aux obstacles techniques et volonté acharnée d'achever chaque engagement avec perfection.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-charcoal-700/60 flex items-center justify-between text-[11px] font-mono text-gold-300/80">
                <span>Valeur Cardinale</span>
                <span>Excellence Personnelle</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* F. FORMATION — "Les Fondations" */}
      {/* ======================================================== */}
      <section id="education" ref={educationRef} className="py-24 sm:py-32 px-6 max-w-5xl mx-auto relative">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-2">
            // 04. Les Fondations
          </span>
          <h2 className="font-serif italic text-4xl sm:text-5xl text-cream-100">
            Formation & Diplômes
          </h2>
          <p className="text-cream-300/80 text-sm sm:text-base mt-3">
            Un socle académique d'excellence alliant sciences modernes et tradition séculaire.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          
          {/* Card 1 */}
          <div className="edu-card card-prestige bg-charcoal-850 rounded-[2rem] p-6 sm:p-8 border border-charcoal-700/80 hover:border-gold-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 flex-shrink-0 mt-1 sm:mt-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-gold-400 font-semibold block mb-1">
                  2026 — EN COURS
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-cream-100">
                  Licence en Informatique
                </h3>
                <p className="text-cream-300/80 text-sm mt-0.5">
                  Université Iba Der Thiam de Thiès (UIDT), Sénégal
                </p>
              </div>
            </div>
            <div className="sm:text-right font-mono text-xs text-gold-300 bg-charcoal-800 px-3 py-1.5 rounded-full border border-charcoal-700 self-start sm:self-center">
              Algorithmes • Génie Logiciel
            </div>
          </div>

          {/* Card 2 */}
          <div className="edu-card card-prestige bg-charcoal-850 rounded-[2rem] p-6 sm:p-8 border border-charcoal-700/80 hover:border-gold-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 flex-shrink-0 mt-1 sm:mt-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-gold-400 font-semibold block mb-1">
                  2026
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-cream-100">
                  Baccalauréat Scientifique (Série S)
                </h3>
                <p className="text-cream-300/80 text-sm mt-0.5">
                  Enseignement Secondaire Général Scientifique
                </p>
              </div>
            </div>
            <div className="sm:text-right font-mono text-xs text-gold-300 bg-charcoal-800 px-3 py-1.5 rounded-full border border-charcoal-700 self-start sm:self-center">
              Mathématiques • Physique-Chimie
            </div>
          </div>

          {/* Card 3 */}
          <div className="edu-card card-prestige bg-charcoal-850 rounded-[2rem] p-6 sm:p-8 border border-charcoal-700/80 hover:border-gold-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 flex-shrink-0 mt-1 sm:mt-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-gold-400 font-semibold block mb-1">
                  2023
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-cream-100">
                  Brevet de Fin d’Études Moyennes (BFEM)
                </h3>
                <p className="text-cream-300/80 text-sm mt-0.5">
                  Cycle Moyen Fondamental
                </p>
              </div>
            </div>
            <div className="sm:text-right font-mono text-xs text-gold-300 bg-charcoal-800 px-3 py-1.5 rounded-full border border-charcoal-700 self-start sm:self-center">
              Mention de Réussite
            </div>
          </div>

          {/* Card 4 - Daara */}
          <div className="edu-card card-prestige bg-charcoal-850 rounded-[2rem] p-6 sm:p-8 border border-charcoal-700/80 hover:border-gold-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 flex-shrink-0 mt-1 sm:mt-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-gold-400 font-semibold block mb-1">
                  PARCOURS TRADITIONNEL FONDAMENTAL
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-cream-100">
                  Enseignement Coranique au Daara
                </h3>
                <p className="text-cream-300/80 text-sm mt-0.5">
                  Daara d'Excellence — Mémorisation intégrale, discipline de fer & rectitude morale
                </p>
              </div>
            </div>
            <div className="sm:text-right font-mono text-xs text-gold-300 bg-charcoal-800 px-3 py-1.5 rounded-full border border-charcoal-700 self-start sm:self-center">
              Maîtrise & Discipline
            </div>
          </div>

        </div>

        {/* Section Langues intégrée */}
        <div className="mt-16 pt-12 border-t border-charcoal-800">
          <div className="flex items-center gap-2 mb-6">
            <Languages className="w-5 h-5 text-gold-400" />
            <h3 className="font-serif italic text-2xl text-cream-100">
              Langues & Communication
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-charcoal-850 p-5 rounded-2xl border border-charcoal-800 text-center">
              <span className="block font-bold text-cream-100 text-lg">Wolof</span>
              <span className="text-xs font-mono text-gold-400">Langue maternelle</span>
            </div>
            <div className="bg-charcoal-850 p-5 rounded-2xl border border-charcoal-800 text-center">
              <span className="block font-bold text-cream-100 text-lg">Français</span>
              <span className="text-xs font-mono text-gold-400">Courant / Pro</span>
            </div>
            <div className="bg-charcoal-850 p-5 rounded-2xl border border-charcoal-800 text-center">
              <span className="block font-bold text-cream-100 text-lg">Arabe</span>
              <span className="text-xs font-mono text-gold-400">Intermédiaire (Daara)</span>
            </div>
            <div className="bg-charcoal-850 p-5 rounded-2xl border border-charcoal-800 text-center">
              <span className="block font-bold text-cream-100 text-lg">Anglais</span>
              <span className="text-xs font-mono text-gold-400">Intermédiaire tech</span>
            </div>
          </div>
        </div>

      </section>

      {/* ======================================================== */}
      {/* G. CONTACT — "Le Pont" */}
      {/* ======================================================== */}
      <section id="contact" ref={contactRef} className="py-24 sm:py-32 px-6 relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          
          <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-3">
            // 05. Entrons en Contact
          </span>

          <h2 className="font-serif italic text-4xl sm:text-6xl text-cream-100 mb-6">
            Bâtissons quelque chose de grand.
          </h2>

          <p className="text-cream-200/80 text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Vous cherchez un profil rigoureux capable de concevoir, développer et lancer des produits SaaS ou d'intégrer vos équipes logicielles ?
          </p>

          {/* Interactive Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            
            {/* Email with copy micro-interaction */}
            <div className="contact-item bg-charcoal-850 rounded-[2rem] p-6 border border-charcoal-700 hover:border-gold-500/50 flex flex-col items-center text-center transition-all">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-cream-300 uppercase mb-1">Email Direct</span>
              <span className="text-sm font-semibold text-cream-100 break-all mb-4">
                Mouhamethkebe123@gmail.com
              </span>
              <button
                onClick={handleCopyEmail}
                className="magnetic-btn w-full mt-auto inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-950 text-gold-400 text-xs font-mono transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copié dans le presse-papier !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier l'email</span>
                  </>
                )}
              </button>
            </div>

            {/* Localisation */}
            <div className="contact-item bg-charcoal-850 rounded-[2rem] p-6 border border-charcoal-700 hover:border-gold-500/50 flex flex-col items-center text-center transition-all">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-cream-300 uppercase mb-1">Localisation</span>
              <span className="text-sm font-semibold text-cream-100 mb-1">
                Thiès, Sénégal
              </span>
              <p className="text-xs text-cream-300/70 mt-auto pt-4 font-mono">
                Disponible en présentiel & remote mondial
              </p>
            </div>

            {/* Disponibilité & Téléchargement */}
            <div className="contact-item bg-charcoal-850 rounded-[2rem] p-6 border border-charcoal-700 hover:border-gold-500/50 flex flex-col items-center text-center transition-all">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-3">
                <Send className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-cream-300 uppercase mb-1">Disponibilité</span>
              <span className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Ouvert aux opportunités
              </span>
              <a
                href="mailto:Mouhamethkebe123@gmail.com?subject=Prise%20de%20contact%20-%20Mouhameth%20Kebe&body=Bonjour%20Mouhameth,"
                className="magnetic-btn w-full mt-auto inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gold-500 text-charcoal-950 font-bold text-xs font-mono hover:bg-gold-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>M'envoyer un mail</span>
              </a>
            </div>

          </div>

          {/* Main Action Button */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:Mouhamethkebe123@gmail.com"
              className="magnetic-btn inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all shadow-xl shadow-gold-500/25"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>Démarrer une conversation</span>
            </a>

            <button
              onClick={handleDownloadCV}
              className="magnetic-btn inline-flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 border border-charcoal-600 px-8 py-4 rounded-full font-semibold text-sm transition-all"
            >
              <Download className="w-4 h-4 text-gold-400" />
              <span>Télécharger le CV complet</span>
            </button>
          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* H. PIED DE PAGE */}
      {/* ======================================================== */}
      <footer className="bg-charcoal-950 rounded-t-[3.5rem] border-t border-charcoal-800/80 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="font-serif font-bold text-gold-400 text-lg">Mouhameth Kébé</span>
              <span className="text-charcoal-600">•</span>
              <span className="text-xs font-mono text-cream-300/60">Portfolio & Vitrine Personnelle</span>
            </div>
            <p className="text-xs text-cream-300/50">
              Fait avec passion & le vibe coding • © 2026 Tous droits réservés
            </p>
          </div>

          <div className="flex items-center gap-3 bg-charcoal-900 border border-charcoal-800 px-4 py-2 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs text-cream-200">
              En ligne — Thiès, Sénégal
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}

