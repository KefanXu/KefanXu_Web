import { useState, useEffect, useRef } from 'react';
import { NeuKnob } from './components/NeuKnob';
import { Home } from './components/Home';
import { Research } from './components/Research';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { NeuSwitch } from './components/NeuSwitch';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, Database, LayoutDashboard, Menu, X, Cpu } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'research' | 'projects'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResearchDetailOpen, setIsResearchDetailOpen] = useState(false);
  
  // Ref to track if we are currently scrolling via a click (auto-scrolling)
  const isAutoScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Scroll to section handler
  const scrollToSection = (id: 'home' | 'research' | 'projects') => {
    // Disable scroll spy temporarily
    isAutoScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    // Map 'research' to the 'investigating-life' section in Home.tsx
    const targetId = id === 'research' ? 'investigating-life' : id;
    const element = document.getElementById(targetId);
    
    if (element) {
      // Offset for fixed header
      const offset = 100; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveTab(id);
      
      // Re-enable scroll spy after scrolling finishes (approximate duration)
      scrollTimeout.current = setTimeout(() => {
        isAutoScrolling.current = false;
      }, 1000);
    } else {
       // If target not found, re-enable spy immediately
       isAutoScrolling.current = false;
    }
  };

  // Scroll Spy to update active tab
  useEffect(() => {
    const handleScroll = () => {
      // If we are auto-scrolling (clicked a link), ignore scroll events to prevent tab jitter
      if (isAutoScrolling.current) return;

      // Priority check (bottom to top)
      const sections = [
        { id: 'projects', tab: 'projects' },
        { id: 'research', tab: 'research' },
        { id: 'investigating-life', tab: 'research' }, // Map this section to research tab
        { id: 'home', tab: 'home' }
      ];
      
      const offset = 300; // Buffer zone

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is above the threshold (scrolled past or current)
          if (rect.top <= offset) {
            setActiveTab(section.tab as any);
            return; // Found the active section (most specific/lowest visible)
          }
        }
      }
      
      // Default to home if nothing matches (e.g. very top)
      setActiveTab('home');
    };

    window.addEventListener('scroll', handleScroll);
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
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Top System Bar (Medical Style) */}
      <AnimatePresence>
        {!isResearchDetailOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md border-b border-text-light/5 dark:border-text-dark/5 shadow-sm overflow-hidden"
          >
            
            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

            {/* Main Nav */}
            <div className="container mx-auto px-4 h-20 flex justify-between items-center gap-4 relative z-10">
              
              {/* Brand */}
              <div 
                className="flex items-center gap-3 cursor-pointer group" 
                onClick={() => scrollToSection('home')}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-widest uppercase">Kefan Xu</span>
                  <span className="text-[9px] font-mono text-text-light/50 dark:text-text-dark/50 tracking-wider">PhD Student</span>
                </div>
              </div>

              {/* Desktop Nav Items */}
              <div className="hidden md:flex flex-1 max-w-md justify-center">
                 <NeuSwitch 
                   variant="segment"
                   options={[
                     { id: 'home', label: 'Home' },
                     { id: 'research', label: 'Research' },
                     { id: 'projects', label: 'Projects' }
                   ]}
                   activeId={activeTab}
                   onChange={(id) => scrollToSection(id as 'home' | 'research' | 'projects')}
                   className="w-full"
                 />
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-3">
                <NeuKnob />
                {/* Mobile Menu Toggle */}
                <button 
                  className="md:hidden p-2 rounded-lg bg-black/5 dark:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="md:hidden border-t border-text-light/5 dark:border-text-dark/5 bg-bg-light dark:bg-bg-dark overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    {[
                      { id: 'home', label: 'Home', icon: LayoutDashboard },
                      { id: 'research', label: 'Research', icon: Database },
                      { id: 'projects', label: 'Projects', icon: Cpu }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Slight delay to allow menu to start closing and ensure scroll triggers reliably on mobile
                          setTimeout(() => {
                            scrollToSection(item.id as any);
                          }, 100);
                        }}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl font-mono text-sm uppercase tracking-wider transition-all duration-200
                          ${activeTab === item.id 
                            ? 'bg-bg-light dark:bg-bg-dark text-blue-500 dark:text-blue-400 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_#1d1e22,inset_-3px_-3px_6px_#393c44]' 
                            : 'bg-bg-light dark:bg-bg-dark text-text-light/60 dark:text-text-dark/60 shadow-[5px_5px_10px_rgba(163,177,198,0.3),-5px_-5px_10px_rgba(255,255,255,0.6)] dark:shadow-[5px_5px_10px_#1d1e22,-5px_-5px_10px_#393c44] hover:text-blue-500 dark:hover:text-blue-400'}
                        `}
                      >
                        <item.icon size={18} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 pt-28 pb-20 flex-grow relative z-10 flex flex-col gap-24">
        
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
    </div>
  );
}

export default App;
