export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <span className="footer__kanji" aria-hidden="true">鯨</span>
      <div className="footer__container">
        <div className="footer__brand">
          <div className="footer__logo">鯨</div>
          <div className="footer__logo-en">Kujira</div>
          <p className="footer__tagline">
            Where tradition meets mastery. An intimate omakase experience in the heart of the city.
          </p>
        </div>
        
        <div className="footer__col">
          <h4 className="footer__col-title">Navigate</h4>
          <ul className="footer__links">
            <li>
              <a href="#philosophy" className="footer__link" onClick={(e) => { e.preventDefault(); scrollToSection('philosophy'); }}>
                Philosophy
              </a>
            </li>
            <li>
              <a href="#menu" className="footer__link" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }}>
                Menu
              </a>
            </li>
            <li>
              <a href="#experience" className="footer__link" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}>
                Experience
              </a>
            </li>
            <li>
              <a href="#chef" className="footer__link" onClick={(e) => { e.preventDefault(); scrollToSection('chef'); }}>
                Our Chef
              </a>
            </li>
          </ul>
        </div>
        
        <div className="footer__col">
          <h4 className="footer__col-title">Contact</h4>
          <p className="footer__contact-item">
            123 Sakura Lane<br />
            Downtown, NY 10001
          </p>
          <p className="footer__contact-item">+1 (212) 555-0123</p>
          <p className="footer__contact-item">hello@kujira.com</p>
        </div>
        
        <div className="footer__col">
          <h4 className="footer__col-title">Hours</h4>
          <p className="footer__contact-item">
            Tuesday — Saturday<br />
            6:00 PM — 10:00 PM
          </p>
          <p className="footer__contact-item">Closed Sunday & Monday</p>
          <div className="footer__social">
            <a href="#" className="footer__social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className="footer__social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <p className="footer__copyright">&copy; {currentYear} Kujira. All rights reserved.</p>
        <div className="footer__legal">
          <a href="#" className="footer__legal-link">Privacy Policy</a>
          <a href="#" className="footer__legal-link">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
