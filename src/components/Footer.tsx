import { motion } from "framer-motion"
import {
  fadeUp,
  staggerContainer,
  gentleEase,
  earlyViewport,
} from "@/lib/animations"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="footer" role="contentinfo">
      {/* Background kanji */}
      <motion.span
        className="footer__kanji"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        鯨
      </motion.span>

      <motion.div
        className="footer__container"
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        whileInView="visible"
        viewport={earlyViewport}
      >
        {/* Brand column */}
        <motion.div className="footer__brand" variants={fadeUp} transition={gentleEase}>
          <div className="footer__logo">鯨</div>
          <div className="footer__logo-en">Kujira</div>
          <p className="footer__tagline">
            Where tradition meets mastery. An intimate omakase experience in the
            heart of the city.
          </p>
        </motion.div>

        {/* Navigate column */}
        <motion.div className="footer__col" variants={fadeUp} transition={gentleEase}>
          <h4 className="footer__col-title">Navigate</h4>
          <ul className="footer__links">
            {["philosophy", "menu", "experience", "chef"].map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="footer__link"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(id)
                  }}
                >
                  {id === "chef" ? "Our Chef" : id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact column */}
        <motion.div className="footer__col" variants={fadeUp} transition={gentleEase}>
          <h4 className="footer__col-title">Contact</h4>
          <p className="footer__contact-item">
            123 Sakura Lane
            <br />
            Downtown, NY 10001
          </p>
          <p className="footer__contact-item">+1 (212) 555-0123</p>
          <p className="footer__contact-item">hello@kujira.com</p>
        </motion.div>

        {/* Hours column */}
        <motion.div className="footer__col" variants={fadeUp} transition={gentleEase}>
          <h4 className="footer__col-title">Hours</h4>
          <p className="footer__contact-item">
            Tuesday — Saturday
            <br />
            6:00 PM — 10:00 PM
          </p>
          <p className="footer__contact-item">Closed Sunday & Monday</p>
          <div className="footer__social">
            <motion.a
              href="#"
              className="footer__social-link"
              aria-label="Instagram"
              whileHover={{ y: -3, color: "#c9a962" }}
              transition={{ duration: 0.2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </motion.a>
            <motion.a
              href="#"
              className="footer__social-link"
              aria-label="Facebook"
              whileHover={{ y: -3, color: "#c9a962" }}
              transition={{ duration: 0.2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        className="footer__bottom"
        variants={staggerContainer(0.1, 0.3)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          className="footer__copyright"
          variants={fadeUp}
          transition={gentleEase}
        >
          &copy; {currentYear} Kujira. All rights reserved.
        </motion.p>
        <motion.div
          className="footer__legal"
          variants={fadeUp}
          transition={gentleEase}
        >
          <a href="#" className="footer__legal-link">
            Privacy Policy
          </a>
          <a href="#" className="footer__legal-link">
            Terms of Service
          </a>
        </motion.div>
      </motion.div>
    </footer>
  )
}
