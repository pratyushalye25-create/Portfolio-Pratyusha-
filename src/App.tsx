import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useAnimationFrame,
  AnimatePresence,
} from 'motion/react';
import { ArrowRight, MoveUpRight, Heart, Mail, Linkedin, Github } from 'lucide-react';
// @ts-ignore
import heroImage from './assets/images/regenerated_image_1779168578260.jpg';

const COLORS = {
  dark: '#0C0C0C',
  light: '#D7E2EA',
};

// --- DATA ---

const MARQUEE_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const SERVICES_DATA = [
  { num: '01', name: 'Full Stack Development', desc: 'Crafting robust web applications with Python, Django, and React.js, focusing on scalability, security, and seamless user authentication.' },
  { num: '02', name: 'UI/UX Design', desc: 'Designing user-centered digital experiences using Figma and Canva, merging aesthetic appeal with functional design principles.' },
  { num: '03', name: 'AI & Machine Learning', desc: 'Developing intelligent systems, including recommendation engines and predictive models, leveraging modern ML techniques.' },
  { num: '04', name: 'Conversational AI', desc: 'Building advanced chatbots with custom GUIs and personalized response systems to enhance user engagement.' },
  { num: '05', name: 'Network Engineering', desc: 'Designing scalable network infrastructures covering PAN to WAN architectures with a focus on topology and protocols.' },
];

const PROJECTS_DATA = [
  {
    num: '01',
    name: 'E-Commerce Platform',
    category: 'Full Stack',
    img1: 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    img2: 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    img3: 'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
    desc: 'Developed a full-stack shopping platform using HTML, CSS, JavaScript, and Django.'
  },
  {
    num: '02',
    name: 'AI Learning Tic-Tac-Toe',
    category: 'AI / Python',
    img1: 'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
    img2: 'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
    img3: 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
    desc: 'Intelligent game engine with adaptive AI that learns from human player strategies.'
  },
  {
    num: '03',
    name: 'Rule-Based Chatbot',
    category: 'NLP / Python',
    img1: 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
    img2: 'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
    img3: 'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
    desc: 'Conversational AI chatbot with a custom GUI and personalized response system.'
  },
  {
    num: '04',
    name: 'Recommendation System',
    category: 'Machine Learning',
    img1: 'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
    img2: 'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
    img3: 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
    desc: 'Content-based recommendation engine using ML to deliver personalized suggestions.'
  },
  {
    num: '05',
    name: 'Network Architecture Design',
    category: 'Networking',
    img1: 'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
    img2: 'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
    img3: 'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
    desc: 'Designed scalable network infrastructure covering PAN to WAN architectures.'
  },
  {
    num: '06',
    name: 'GenAI Course',
    category: 'Education / AI',
    img1: 'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
    img2: 'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
    img3: 'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
    link: 'https://mirror-pgvl.vercel.app',
    desc: 'Teaching Generative AI and building professional-grade AI applications.'
  },
];

const CERTS_DATA = [
  'Google: 5-Day AI Agent Intensive (Kaggle × Google)',
  'Gemini Certified Student — Google',
  'Generative AI Studio — Google Cloud',
  'AI Certification — Codsoft',
  'AI in Marketing — Simplilearn/Skillup',
  'Python Programming — Great Learning',
  'React.js Certificate',
  'Python & R Badges — Kaggle',
  'Master Canva Tools & Canva AI Design',
  'Excel Dashboard — Microsoft',
  'Cybersecurity Awareness — HP Life',
  'Smart India Hackathon 2025 — College Shortlist',
  'Full Stack Development Training — Ardent Computech Pvt. Ltd.',
];


// --- COMPONENTS ---

const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: any;
}> = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '', as = 'div' }) => {
  const MotionComponent = (motion as any)[as] || motion.div;
  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

const Magnet: React.FC<{
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}> = ({ children, padding = 150, strength = 3, className = '' }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

    if (dist < padding + width / 2) {
      setPosition({
        x: (e.clientX - centerX) / strength,
        y: (e.clientY - centerY) / strength,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 200,
        mass: 1,
      }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  return (
    <p ref={containerRef} className={`relative flex flex-wrap justify-center ${className}`}>
      {text.split('').map((char, i) => {
        const start = i / text.length;
        const end = start + 1 / text.length;
        return <Char key={i} progress={scrollYProgress} range={[start, end]}>{char}</Char>;
      })}
    </p>
  );
};

const Char: React.FC<{ children: string; progress: any; range: [number, number] }> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative">
      <span className="opacity-0">{children === ' ' ? '\u00A0' : children}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {children === ' ' ? '\u00A0' : children}
      </motion.span>
    </span>
  );
};

const ContactButton = () => (
  <button
    className="contact-btn-gradient contact-btn-shadow ring-2 ring-white ring-offset-[-3px] rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 transition-transform hover:scale-105 active:scale-95 group"
    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
  >
    <span className="text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base">
      Contact Me
    </span>
  </button>
);

const LiveProjectButton = ({ url, className = '' }: { url?: string; className?: string }) => (
  <button 
    onClick={() => url && window.open(url, '_blank')}
    className={`live-btn border-2 border-brand-light transition-all duration-300 hover:bg-brand-light/10 text-brand-light rounded-full px-5 py-2 sm:px-8 sm:py-3 group flex items-center justify-center gap-1.5 sm:gap-2 shrink-0 ${className}`}
  >
    <span className="font-medium uppercase tracking-widest text-[11px] sm:text-xs md:text-sm">
      Live Project
    </span>
    <MoveUpRight className="w-3.5 h-3.5 sm:w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
  </button>
);

const WordReveal: React.FC<{ text: string; className?: string; delay?: number; stagger?: number }> = ({ text, className = '', delay = 0, stagger = 0.1 }) => {
  const words = text.split(' ');
  return (
    <div className={`${className} flex flex-wrap justify-center gap-x-4 gap-y-2`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * stagger, duration: 0.4, ease: "easeOut" }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// --- SECTIONS ---

const Hero = () => {
  const [interaction, setInteraction] = useState<'none' | 'hi'>('none');

  const handleInteraction = () => {
    if (interaction === 'none') {
      setInteraction('hi');
      setTimeout(() => setInteraction('none'), 2000);
    } else {
      setInteraction('none');
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 z-50">
        <FadeIn delay={0} y={-20}>
          <div className="flex gap-4 md:gap-8">
            <a href="#about" className="text-brand-light font-medium uppercase tracking-wider text-sm md:text-lg hover:opacity-70 transition-opacity">About</a>
            <a href="#services" className="text-brand-light font-medium uppercase tracking-wider text-sm md:text-lg hover:opacity-70 transition-opacity">Services</a>
          </div>
        </FadeIn>
        <FadeIn delay={0.1} y={-20}>
          <div className="flex gap-4 md:gap-8">
            <a href="#projects" className="text-brand-light font-medium uppercase tracking-wider text-sm md:text-lg hover:opacity-70 transition-opacity">Projects</a>
            <a href="#contact" className="text-brand-light font-medium uppercase tracking-wider text-sm md:text-lg hover:opacity-70 transition-opacity">Contact</a>
          </div>
        </FadeIn>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center z-10 pt-4 sm:pt-8 pb-32">
        {/* Title Section */}
        <div className="w-full px-4 text-center mb-6 sm:mb-10">
          <FadeIn delay={0.15} y={40} className="w-full flex justify-center">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.85] text-[clamp(1.8rem,8.5vw,5.5rem)] opacity-80 break-words max-w-4xl mx-auto text-center">
              Hi, i&apos;m pratyusha
            </h1>
          </FadeIn>
        </div>

        {/* Avatar Section */}
        <div className="relative flex flex-col items-center">
          <FadeIn delay={0.6} y={30} className="relative cursor-pointer mb-10" as="div">
            <AnimatePresence>
              {interaction === 'hi' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 20, x: 80 }}
                  animate={{ opacity: 1, scale: 1.2, y: -100, x: 120 }}
                  exit={{ opacity: 0, scale: 0.5, y: -150 }}
                  className="absolute z-40 bg-white text-brand-dark px-6 py-2 rounded-2xl rounded-bl-none font-black uppercase tracking-tighter text-2xl shadow-2xl pointer-events-none"
                >
                  Hi! 👋
                </motion.div>
              )}
            </AnimatePresence>

            <Magnet padding={200} strength={6} className="relative z-30">
              <motion.div
                onClick={handleInteraction}
                className="w-[190px] xs:w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] relative group perspective-1000"
                animate={
                  interaction === 'hi' 
                    ? { y: [0, -30, 0], rotateY: 360 } 
                    : { y: 0, scale: 1.1, rotateY: 0 }
                }
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.15, rotateY: 15 }}
                whileTap={{ scale: 0.9, rotateY: -15 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.3)] bg-gradient-to-b from-white/10 to-transparent">
                  <img
                    src={heroImage}
                    alt="Pratyusha Avatar"
                    className="w-full h-full object-cover object-top scale-110 group-hover:scale-125 transition-transform duration-500"
                  />
                </div>
                
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-20px] border-2 border-dashed border-white/10 rounded-full pointer-events-none"
                />
              </motion.div>
            </Magnet>
          </FadeIn>

          {/* Description Section BELOW Avatar */}
          <div className="max-w-[320px] sm:max-w-xl md:max-w-3xl text-center px-4">
            <WordReveal 
              delay={1.2}
              stagger={0.4}
              text="a bca student driven by crafting striking and unforgettable projects"
              className="text-brand-light font-light uppercase leading-relaxed text-lg sm:text-xl md:text-[25px]"
            />
          </div>
        </div>
      </div>

      {/* Footer info & Buttons */}
      <div className="absolute bottom-8 right-6 md:right-10 z-20">
        <FadeIn delay={1.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

const MarqueeRow = ({ images, rotate, velocity }: { images: string[]; rotate: number; velocity: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [offsetDelta, setOffsetDelta] = useState(0);

  useEffect(() => {
    return scrollY.on('change', (y) => {
      if (containerRef.current) {
        const top = containerRef.current.offsetTop;
        const height = containerRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        const delta = (y - top + viewportHeight) * 0.3;
        setOffsetDelta(delta * (velocity > 0 ? 1 : -1));
      }
    });
  }, [scrollY, velocity]);

  return (
    <div ref={containerRef} className="flex gap-3 overflow-hidden select-none" style={{ willChange: 'transform' }}>
      <motion.div
        ref={rowRef}
        style={{ x: offsetDelta - 200 }}
        className="flex gap-3 whitespace-nowrap"
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Marquee"
            loading="lazy"
            className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0"
          />
        ))}
        {/* Repeating for seamless feel if needed, but doubled might be enough given the logic */}
        {images.map((src, i) => (
          <img
            key={`r-${i}`}
            src={src}
            alt="Marquee"
            loading="lazy"
            className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0"
          />
        ))}
      </motion.div>
    </div>
  );
};

const Marquee = () => {
  const row1 = [...MARQUEE_IMAGES.slice(0, 11), ...MARQUEE_IMAGES.slice(0, 11), ...MARQUEE_IMAGES.slice(0, 11)];
  const row2 = [...MARQUEE_IMAGES.slice(11), ...MARQUEE_IMAGES.slice(11), ...MARQUEE_IMAGES.slice(11)];

  return (
    <section className="bg-brand-dark pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3">
      <MarqueeRow images={row1} rotate={0} velocity={1} />
      <MarqueeRow images={row2} rotate={0} velocity={-1} />
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-brand-dark">
      {/* Decorative Corner Elements */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[4%] w-[120px] sm:w-[210px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" className="w-full h-auto opacity-70" alt="moon" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[10%] w-[100px] sm:w-[180px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" className="w-full h-auto opacity-70" alt="3d" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[4%] w-[120px] sm:w-[210px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" className="w-full h-auto opacity-70" alt="lego" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[10%] w-[130px] sm:w-[220px]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" className="w-full h-auto opacity-70" alt="group" />
      </FadeIn>

      <div className="flex flex-col items-center gap-10 sm:gap-16 max-w-[800px] z-10">
        <FadeIn y={40} className="w-full">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">About me</h2>
        </FadeIn>

        <AnimatedText
          text="BCA student from MID, West Bengal — passionate about bridging the gap between development and design. I build full-stack web applications with Python, Django & React.js while developing my eye for UI/UX through Figma and Canva. I love creating AI-powered applications and user-centered digital experiences. Let's build something incredible together!"
          className="text-brand-light font-medium text-center leading-relaxed max-w-[560px] text-[25px]"
        />

        <FadeIn y={30} className="mt-8">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="bg-white rounded-t-[40px] sm:rounded-t-[60px] px-5 sm:px-10 py-20 sm:py-32">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-28">Services</h2>
        
        <div className="flex flex-col">
          {SERVICES_DATA.map((service, i) => (
            <FadeIn key={i} delay={i * 0.1} y={40} className="border-t border-[#0C0C0C]/15 py-8 sm:py-12 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16">
              <span className="font-black text-[#0C0C0C] text-[clamp(3rem,10vw,140px)] leading-none">{service.num}</span>
              <div className="flex flex-col gap-2 text-center md:text-left">
                <h3 className="font-medium uppercase text-[#0C0C0C] text-[21.2px]">{service.name}</h3>
                <p className="font-light text-[#0C0C0C]/60 leading-relaxed max-w-2xl text-[15.6px]">
                  {service.desc}
                </p>
              </div>
            </FadeIn>
          ))}
          <div className="border-t border-[#0C0C0C]/15" />
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, i, total }: any) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - 1 - i) * 0.03]);

  return (
    <div className="relative h-[65vh] xs:h-[70vh] sm:h-[76vh] md:h-[80vh] sticky top-16 xs:top-20 sm:top-24 md:top-28 w-full flex items-center justify-center">
      <motion.div
        ref={container}
        style={{ scale, top: `${i * 12}px` }}
        className="w-full h-full bg-brand-dark border-2 border-brand-light rounded-[30px] sm:rounded-[40px] md:rounded-[50px] p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6"
      >
        <div className="flex justify-between items-end overflow-hidden px-1 sm:px-2 shrink-0">
          <div className="flex items-end gap-3 sm:gap-6">
            <span className="font-black text-[clamp(2.5rem,8vw,100px)] leading-none translate-y-1 sm:translate-y-2">{project.num}</span>
            <div className="flex flex-col pb-1 sm:pb-2">
              <span className="text-brand-light uppercase tracking-widest text-[clamp(0.55rem,1vw,0.85rem)] opacity-60 font-light mb-0.5 sm:mb-1">{project.category}</span>
              <div className="flex items-center gap-3">
                <h3 className="text-brand-light uppercase font-semibold text-[clamp(0.95rem,2vw,1.9rem)] leading-tight">{project.name}</h3>
                {project.link && (
                  <button 
                    onClick={() => window.open(project.link, '_blank')}
                    className="sm:hidden bg-brand-light text-brand-dark px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-tighter hover:scale-105 transition-transform"
                  >
                    Live
                  </button>
                )}
              </div>
              <p className="text-brand-light/50 text-[10px] sm:text-xs max-w-[180px] sm:max-w-xs leading-tight hidden xs:block">{project.desc}</p>
            </div>
          </div>
          <div className="pb-1 sm:pb-3 shrink-0">
            {project.link ? (
              <LiveProjectButton url={project.link} />
            ) : (
              <button disabled className="opacity-30 cursor-not-allowed border-2 border-brand-light/50 text-brand-light/50 rounded-full px-5 py-2 sm:px-8 sm:py-3 flex items-center gap-1.5 sm:gap-2">
                <span className="font-medium uppercase tracking-widest text-[11px] sm:text-xs md:text-sm">Coming Soon</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-3 sm:gap-6 flex-1 h-full min-h-0">
          <div className="w-[40%] flex flex-col gap-3 sm:gap-6">
             <div className="h-[45%] rounded-[20px] sm:rounded-[30px] overflow-hidden">
                <img src={project.img1} alt="p1" className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" />
             </div>
             <div className="h-[55%] rounded-[20px] sm:rounded-[30px] overflow-hidden">
                <img src={project.img2} alt="p2" className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" />
             </div>
          </div>
          <div className="w-[60%] rounded-[20px] sm:rounded-[30px] overflow-hidden">
            <img src={project.img3} alt="p3" className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="bg-brand-dark rounded-t-[40px] sm:rounded-t-[60px] -mt-10 sm:-mt-14 z-10 relative pt-20 px-5 sm:px-10">
      <div className="flex flex-col items-center justify-center py-16 sm:py-24">
        <FadeIn>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.5rem,10vw,8.5rem)] tracking-widest leading-none">
            Projects
          </h2>
        </FadeIn>
      </div>
      <div className="flex flex-col gap-12 max-w-6xl mx-auto pb-44">
        {PROJECTS_DATA.map((p, i) => (
          <ProjectCard key={i} project={p} i={i} total={PROJECTS_DATA.length} />
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-10 text-center bg-brand-dark">
      <FadeIn>
        <h2 className="hero-heading font-black uppercase text-[clamp(3rem,12vw,160px)] mb-8">Contact</h2>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="text-brand-light/60 text-lg mb-12 max-w-xl mx-auto">
          I&apos;m currently open to new and exciting opportunities. If you have a project in mind or just want to say hi, feel free to reach out!
        </p>
      </FadeIn>
      <FadeIn delay={0.3} className="flex justify-center gap-6">
        <a href="mailto:pratyushalye25@gmail.com" className="text-brand-light hover:text-white transition-colors">
          <Mail size={32} />
        </a>
        <a href="https://linkedin.com/in/pratyusha-lye-523060277" target="_blank" rel="noopener noreferrer" className="text-brand-light hover:text-white transition-colors">
          <Linkedin size={32} />
        </a>
        <a href="https://github.com/Pratyusha1025" target="_blank" rel="noopener noreferrer" className="text-brand-light hover:text-white transition-colors">
          <Github size={32} />
        </a>
      </FadeIn>
      <FadeIn delay={0.5} className="mt-20 opacity-30 text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2">
        <span>Made with</span>
        <Heart size={14} className="text-red-500 fill-red-500" />
        <span>by Pratyusha &copy; 2025</span>
      </FadeIn>
    </section>
  );
};

const Certifications = () => {
  return (
    <section id="certs" className="bg-white rounded-[40px] sm:rounded-[60px] mx-5 sm:mx-10 py-20 px-5 sm:px-10 relative z-20 -mt-10 mb-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(2.5rem,8vw,120px)] mb-16">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTS_DATA.map((cert, i) => (
            <FadeIn key={i} delay={i * 0.05} y={20} className="bg-brand-light/20 p-6 rounded-2xl border border-brand-dark/5 hover:border-brand-dark/20 transition-all group overflow-hidden">
              <div className="flex items-start gap-4 h-full">
                <div className="bg-brand-dark text-brand-light w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-transform group-hover:scale-110">
                  {i + 1}
                </div>
                <p className="text-brand-dark/80 font-medium text-sm sm:text-base leading-snug">
                  {cert}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="w-full">
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Projects />
      <Certifications />
      <Contact />
    </div>
  );
}
