import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > window.innerHeight) {
        if (currentScrollY > lastScrollY) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`nav ${isHidden ? 'hidden' : ''}`}>
      <a href="#" className="nav__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        鯨 <span className="nav__logo-en">Kujira</span>
      </a>
      
      <ul className="nav__links">
        <li>
          <a href="#philosophy" className="nav__link" onClick={(e) => { e.preventDefault(); scrollToSection('philosophy'); }}>
            Philosophy
          </a>
        </li>
        <li>
          <a href="#menu" className="nav__link" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }}>
            Menu
          </a>
        </li>
        <li>
          <a href="#experience" className="nav__link" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}>
            Experience
          </a>
        </li>
        <li>
          <a href="#chef" className="nav__link" onClick={(e) => { e.preventDefault(); scrollToSection('chef'); }}>
            Our Chef
          </a>
        </li>
      </ul>
      
      <a 
        href="#reservation" 
        className="nav__cta" 
        onClick={(e) => { e.preventDefault(); scrollToSection('reservation'); }}
      >
        Reserve
      </a>
      
      <button className="nav__menu-btn" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
