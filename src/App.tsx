import { useState, useCallback, useRef, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Menu from './components/Menu';
import Experience from './components/Experience';
import Chef from './components/Chef';
import Reservation from './components/Reservation';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);

  // Always start at the top on page load / refresh - BEFORE anything renders
  useEffect(() => {
    // Set scroll restoration to manual
    window.history.scrollRestoration = 'manual';
    
    // Force scroll to top aggressively
    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    forceScrollToTop();
    
    // Additional failsafe
    const timeoutId = setTimeout(forceScrollToTop, 50);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const handleLoadComplete = useCallback((images: HTMLImageElement[]) => {
    preloadedImagesRef.current = images;
    setIsLoading(false);
    setIsLoaded(true);
    
    // Enable smooth scrolling after page is fully loaded and positioned
    setTimeout(() => {
      document.documentElement.classList.add('loaded');
    }, 100);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <div className="grain" aria-hidden="true" />
      
      <Navigation />
      
      <main id="main-content">
        <Hero isLoaded={isLoaded} preloadedImages={preloadedImagesRef.current} />
        
        <div className="main-content">
          <div className="background-kanji" aria-hidden="true">
            <div className="background-kanji__text">
              寿司の芸術鮮度匠心技美味極上職人魂伝統革新四季折々海の恵み一期一会真心込めて繊細な技巧
            </div>
          </div>
          
          <Philosophy />
          <Menu />
          <Experience />
          <Chef />
          <Reservation />
        </div>
        
        <Footer />
      </main>
    </>
  );
}

export default App;
