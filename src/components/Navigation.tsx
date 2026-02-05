import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"

const navLinks = [
  { id: "philosophy", label: "Philosophy" },
  { id: "menu", label: "Menu" },
  { id: "experience", label: "Experience" },
  { id: "chef", label: "Our Chef" },
]

export default function Navigation() {
  const [isHidden, setIsHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const lastY = lastScrollYRef.current

      if (currentScrollY > window.innerHeight) {
        setIsHidden(currentScrollY > lastY)
      } else {
        setIsHidden(false)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  return (
    <>
      <motion.nav
        className="nav"
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isHidden ? -100 : 0,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href="#"
          className="nav__logo"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          <span aria-hidden="true">鯨</span>{" "}
          <span className="nav__logo-en">Kujira</span>
        </a>

        <ul className="nav__links">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={`#${link.id}`}
                className="nav__link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.id)
                }}
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.a
          href="#reservation"
          className="nav__cta"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection("reservation")
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Reserve
        </motion.a>

        <button
          className={`nav__menu-btn ${mobileMenuOpen ? "active" : ""}`}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu open"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="mobile-menu__links">
              {[...navLinks, { id: "reservation", label: "Reserve a Table" }].map(
                (link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      delay: 0.05 + i * 0.06,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={`#${link.id}`}
                      className={`mobile-menu__link ${link.id === "reservation" ? "mobile-menu__link--cta" : ""}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(link.id)
                      }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
