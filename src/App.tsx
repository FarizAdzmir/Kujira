import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ParallaxMenu from './components/ParallaxMenu';
import Experience from './components/Experience';
import Chef from './components/Chef';
import Reservation from './components/Reservation';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setIsLoaded(true);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}

      <div className="grain" />

      <Navigation />

      <main>
        <Hero isLoaded={isLoaded} />

        <div className="main-content">
          <div className="background-kanji" aria-hidden="true">
            <div className="background-kanji__text">
              寿司の芸術鮮度匠心技美味極上職人魂伝統革新四季折々海の恵み一期一会真心込めて繊細な技巧
            </div>
          </div>

          <Philosophy />
          <ParallaxMenu />
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
