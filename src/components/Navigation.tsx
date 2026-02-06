import { useState, useEffect, useRef, useCallback } from 'react';

export default function Navigation() {
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastY = lastScrollYRef.current;

      if (currentScrollY > window.innerHeight) {
        setIsHidden(currentScrollY > lastY);
      } else {
        setIsHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <nav className={`nav ${isHidden ? 'hidden' : ''}`} role="navigation" aria-label="Main navigation">
        <a href="#" className="nav__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span aria-hidden="true">鯨</span> <span className="nav__logo-en">Kujira</span>
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

        <button
          className={`nav__menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <ul className="mobile-menu__links">
          <li>
            <a href="#philosophy" className="mobile-menu__link" onClick={(e) => { e.preventDefault(); scrollToSection('philosophy'); }}>
              Philosophy
            </a>
          </li>
          <li>
            <a href="#menu" className="mobile-menu__link" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }}>
              Menu
            </a>
          </li>
          <li>
            <a href="#experience" className="mobile-menu__link" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}>
              Experience
            </a>
          </li>
          <li>
            <a href="#chef" className="mobile-menu__link" onClick={(e) => { e.preventDefault(); scrollToSection('chef'); }}>
              Our Chef
            </a>
          </li>
          <li>
            <a href="#reservation" className="mobile-menu__link mobile-menu__link--cta" onClick={(e) => { e.preventDefault(); scrollToSection('reservation'); }}>
              Reserve a Table
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
