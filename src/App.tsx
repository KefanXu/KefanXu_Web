import { useState, useEffect, useRef } from 'react';
import { NeuKnob } from './components/NeuKnob';
import { Home } from './components/Home';
import { Research } from './components/Research';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { RetroLCDSection } from './components/RetroLCDSection';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useSmoothScroll, getLenis } from './hooks/useSmoothScroll';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'research' | 'projects'>('home');
  const [activeNavId, setActiveNavId] = useState<NavId>('about');
  const [isResearchDetailOpen, setIsResearchDetailOpen] = useState(false);
  
  // Initialize Lenis smooth scroll
  useSmoothScroll();

  // Scroll-linked background parallax
  const { scrollY } = useScroll();
  const blueGlowY = useTransform(scrollY, [0, 1000], [0, 280]);
  const blueGlowX = useTransform(scrollY, [0, 1000], [0, 80]);
  const tealGlowY = useTransform(scrollY, [0, 1000], [0, -260]);
  const tealGlowX = useTransform(scrollY, [0, 1000], [0, -80]);
  const glowOpacity = useTransform(scrollY, [0, 500, 1500], [0.15, 0.02, 0.15]);

  // Ref to track if we are currently scrolling via a click (auto-scrolling)
  const isAutoScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Scroll to section handler — supports main sections + sub-sections
  type NavId = 'home' | 'research' | 'projects' | 'about' | 'focus' | 'methodology' | 'overview' | 'papers' | 'ducss' | 'sedentary' | 'pecss' | 'caregiving-reddit' | 'reflective-iteration' | 'historical-planning';

  const scrollToSection = (id: NavId) => {
    // Map sub-section IDs → DOM element IDs + parent tab
    const domIdMap: Record<NavId, { domId: string; tab: 'home' | 'research' | 'projects' }> = {
      home:                  { domId: 'home',                   tab: 'home' },
      about:                 { domId: 'about',                  tab: 'home' },
      methodology:           { domId: 'methodology',            tab: 'home' },
      research:              { domId: 'investigating-life',     tab: 'research' },
      focus:                 { domId: 'investigating-life',     tab: 'research' },
      overview:              { domId: 'ecological-lens',        tab: 'research' },
      papers:                { domId: 'publications',          tab: 'research' },
      projects:              { domId: 'projects',               tab: 'projects' },
      ducss:                 { domId: 'ducss',                  tab: 'projects' },
      sedentary:             { domId: 'sedentary',              tab: 'projects' },
      pecss:                 { domId: 'pecss',                  tab: 'projects' },
      'caregiving-reddit':   { domId: 'caregiving-reddit',      tab: 'projects' },
      'reflective-iteration':{ domId: 'reflective-iteration',   tab: 'projects' },
      'historical-planning': { domId: 'historical-planning',    tab: 'projects' },
    };

    const { domId, tab } = domIdMap[id];

    // Disable scroll spy temporarily
    isAutoScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    const element = document.getElementById(domId);
    
    if (element) {
      const lenis = getLenis();
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      if (lenis) {
        lenis.scrollTo(offsetPosition, { offset: 0 });
      } else {
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }

      setActiveTab(tab);
      
      // Re-enable scroll spy after scrolling finishes
      scrollTimeout.current = setTimeout(() => {
        isAutoScrolling.current = false;
      }, 1500);
    } else {
      isAutoScrolling.current = false;
    }
  };

  // Quick lookup: sub-section ID → parent tab
  const domTabMap: Record<string, 'home' | 'research' | 'projects'> = {
    home: 'home', about: 'home', methodology: 'home',
    research: 'research', focus: 'research', overview: 'research', papers: 'research',
    projects: 'projects', ducss: 'projects', sedentary: 'projects', pecss: 'projects',
    'caregiving-reddit': 'projects', 'reflective-iteration': 'projects', 'historical-planning': 'projects',
  };

  // Scroll Spy to update active tab + active nav item
  useEffect(() => {
    // domId → NavId reverse map
    const reversed: Record<string, NavId> = {
      home: 'home',
      about: 'about',
      methodology: 'methodology',
      'investigating-life': 'focus',
      'ecological-lens': 'overview',
      publications: 'papers',
      projects: 'projects',
      ducss: 'ducss',
      sedentary: 'sedentary',
      pecss: 'pecss',
      'caregiving-reddit': 'caregiving-reddit',
      'reflective-iteration': 'reflective-iteration',
      'historical-planning': 'historical-planning',
    };
    // Ordered top→bottom as they appear on the page
    const sectionIdsInOrder = [
      'home',
      'about',
      'methodology',
      'investigating-life',
      'ecological-lens',
      'publications',
      'projects',
      'ducss',
      'sedentary',
      'pecss',
      'caregiving-reddit',
      'reflective-iteration',
      'historical-planning',
    ];

    const handleScroll = () => {
      if (isAutoScrolling.current) return;

      const offset = 300;
      let activeNav: NavId = 'about';

      for (let i = sectionIdsInOrder.length - 1; i >= 0; i--) {
        const domId = sectionIdsInOrder[i];
        const element = document.getElementById(domId);
        if (element && element.getBoundingClientRect().top <= offset) {
          activeNav = reversed[domId];
          break;
        }
      }

      setActiveNavId(activeNav);
      setActiveTab(domTabMap[activeNav] || 'home');
    };

    window.addEventListener('scroll', handleScroll);
    // Fire once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300 font-sans selection:bg-blue-500/30 flex flex-col overflow-x-hidden">
      
      {/* Background Grid & Noise */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
        {/* Ambient Glows */}
        <motion.div
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500 rounded-full blur-[60px]"
          style={{
            y: blueGlowY,
            x: blueGlowX,
            opacity: glowOpacity,
            WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 30%, transparent 75%)',
          }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500 rounded-full blur-[60px]"
          style={{
            y: tealGlowY,
            x: tealGlowX,
            opacity: glowOpacity,
            WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 30%, transparent 75%)',
          }}
        />
      </div>

      {/* Name — top-left */}
      <AnimatePresence>
        {!isResearchDetailOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-6 left-6 z-50"
          >
            <span className="font-mono text-sm font-bold tracking-[0.15em] text-text-light/70 dark:text-text-dark/70">
              KEFAN XU
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Side Vertical Nav */}
      <AnimatePresence>
        {!isResearchDetailOpen && (
          <motion.nav 
            initial={{ opacity: 0, x: -40, y: '-50%' }}
            animate={{ opacity: 1, x: 0, y: '-50%' }}
            exit={{ opacity: 0, x: -40, y: '-50%' }}
            className="fixed top-1/2 left-0 min-[1190px]:left-6 z-50"
          >
            {/* Pill with border — attached to left edge with inverse curves below 1190px */}
            {/* Outer wrapper: holds the border so the mask doesn't cut it */}
            <div className="min-[1190px]:hidden relative"
              style={{
                borderRadius: '0 24px 24px 0',
                border: '1px solid',
                borderColor: 'rgba(255,255,255,0.2)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
              }}
            >
              {/* Inner: background + inverse-curve mask; border is on the parent so it stays intact */}
              <div className="flex flex-col items-center gap-8 px-3.5 py-5 sm:px-4 sm:py-6
                bg-bg-light/70 dark:bg-bg-dark/70 backdrop-blur-xl 
                shadow-lg shadow-black/5 dark:shadow-black/20"
                style={{
                  borderRadius: '0 24px 24px 0',
                  WebkitMaskImage: `radial-gradient(circle 10px at 0px 10px, transparent 10px, black 11px), radial-gradient(circle 10px at 0px calc(100% - 10px), transparent 10px, black 11px)`,
                  maskImage: `radial-gradient(circle 10px at 0px 10px, transparent 10px, black 11px), radial-gradient(circle 10px at 0px calc(100% - 10px), transparent 10px, black 11px)`,
                }}
              >
                {[
                  {
                    id: 'home' as NavId,
                    label: 'HOME',
                    subs: [
                      { id: 'about' as NavId, label: 'About' },
                      { id: 'methodology' as NavId, label: 'Methods' },
                    ],
                  },
                  {
                    id: 'research' as NavId,
                    label: 'RESEARCH',
                    subs: [
                      { id: 'focus' as NavId, label: 'Focus' },
                      { id: 'overview' as NavId, label: 'Overview' },
                      { id: 'papers' as NavId, label: 'Publication' },
                    ],
                  },
                  {
                    id: 'projects' as NavId,
                    label: 'PROJECTS',
                    subs: [
                      { id: 'ducss' as NavId, label: 'DUCSS' },
                      { id: 'sedentary' as NavId, label: 'Trackya' },
                      { id: 'pecss' as NavId, label: 'PECSS' },
                      { id: 'caregiving-reddit' as NavId, label: 'Caregiving' },
                      { id: 'reflective-iteration' as NavId, label: 'Planneregy' },
                      { id: 'historical-planning' as NavId, label: 'Physicify' },
                    ],
                  },
                ].map(({ id, label }, i, arr) => {
                  const isActive = activeTab === domTabMap[id];
                  return (
                    <div key={id} className="flex flex-col items-center">
                      <button
                        onClick={() => scrollToSection(id)}
                        className={`px-2 py-1 rounded-md font-mono font-semibold transition-all duration-200 select-none text-[11px] tracking-[0.12em] text-center
                          ${isActive
                            ? 'text-blue-500 dark:text-blue-400'
                            : 'text-text-light/50 dark:text-text-dark/50 hover:text-blue-500/70 dark:hover:text-blue-400/70'
                          }
                        `}
                      >
                        {label}
                      </button>
                      {i < arr.length - 1 && (
                        <div className="mt-5 w-8 h-px bg-text-light/10 dark:bg-text-dark/10" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop (≥1190px): transparent, left-aligned, with sub-categories */}
            <motion.div
              className="hidden min-[1190px]:flex flex-col items-start gap-5"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
              }}
            >
              {[
                { id: 'home' as NavId, label: 'HOME', subs: [
                  { id: 'about' as NavId, label: 'About' },
                  { id: 'methodology' as NavId, label: 'Methods' },
                ]},
                { id: 'research' as NavId, label: 'RESEARCH', subs: [
                  { id: 'focus' as NavId, label: 'Focus' },
                  { id: 'overview' as NavId, label: 'Overview' },
                  { id: 'papers' as NavId, label: 'Publication' },
                ]},
                { id: 'projects' as NavId, label: 'PROJECTS', subs: [
                  { id: 'ducss' as NavId, label: 'DUCSS' },
                  { id: 'sedentary' as NavId, label: 'Trackya' },
                  { id: 'pecss' as NavId, label: 'PECSS' },
                  { id: 'caregiving-reddit' as NavId, label: 'Caregiving' },
                  { id: 'reflective-iteration' as NavId, label: 'Planneregy' },
                  { id: 'historical-planning' as NavId, label: 'Physicify' },
                ]},
              ].flatMap(({ id, label, subs }, i, arr) => {
                const items: { id: NavId; label: string; isSub: boolean }[] = [
                  { id, label, isSub: false },
                  ...subs.map(s => ({ ...s, isSub: true })),
                ];
                if (i < arr.length - 1) items.push({ id: `_gap_${i}` as NavId, label: '', isSub: false });
                return items;
              }).map((item) => {
                if (item.id.startsWith('_gap_')) {
                  return <div key={item.id} className="h-3" />;
                }
                const isActive = activeNavId === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    variants={{
                      hidden: { opacity: 0, x: -16, filter: 'blur(4px)' },
                      visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className={`rounded-md font-mono font-semibold transition-all duration-200 select-none text-left
                      ${item.isSub
                        ? `pl-3 text-[11px] tracking-[0.10em] ${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-text-light/30 dark:text-text-dark/30 hover:text-blue-500/60 dark:hover:text-blue-400/60'}`
                        : `text-[13px] tracking-[0.12em] ${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-text-light/50 dark:text-text-dark/50 hover:text-blue-500/70 dark:hover:text-blue-400/70'}`
                      }
                    `}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Theme Knob — bottom-left corner */}
      <AnimatePresence>
        {!isResearchDetailOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 left-6 z-50 hidden md:flex items-center"
          >
            <NeuKnob />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 pt-8 pb-20 flex-grow relative z-10 flex flex-col gap-24">
        
        {/* Sections */}
        <section id="home" className="scroll-mt-32">
           <Home />
        </section>

        <section id="research" className="scroll-mt-32">
           <Research setIsDetailOpen={setIsResearchDetailOpen} />
        </section>

        <section id="projects" className="scroll-mt-32">
           <Projects />
        </section>

      </main>

      <Footer />
      <RetroLCDSection />
    </div>
  );
}

export default App;
