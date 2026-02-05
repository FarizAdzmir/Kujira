import { useState } from "react"
import { motion } from "motion/react"
import {
  fadeUp,
  fadeUpScale,
  clipReveal,
  staggerContainer,
  slowReveal,
  gentleEase,
  defaultViewport,
} from "@/lib/animations"

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    partySize: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(
      "Thank you for your reservation request! We will contact you shortly."
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // Shared input animation variant
  const inputVariant = {
    hidden: { opacity: 0, y: 20, x: -10 },
    visible: { opacity: 1, y: 0, x: 0 },
  }

  return (
    <section className="reservation" id="reservation">
      <motion.div
        className="reservation__container"
        variants={staggerContainer(0.1, 0)}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        {/* Decorative kanji */}
        <motion.div
          className="reservation__kanji"
          initial={{ opacity: 0, scale: 2.5, rotate: 45 }}
          whileInView={{ opacity: 0.08, scale: 1, rotate: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          aria-hidden="true"
        >
          予約
        </motion.div>

        <motion.span
          className="reservation__label"
          variants={clipReveal}
          transition={gentleEase}
        >
          Reserve Your Seat
        </motion.span>

        <motion.h2
          className="reservation__title"
          variants={fadeUpScale}
          transition={slowReveal}
        >
          Begin Your Journey
        </motion.h2>

        <motion.p
          className="reservation__subtitle"
          variants={fadeUp}
          transition={gentleEase}
        >
          Our intimate 12-seat counter fills quickly. Reserve your omakase
          experience and discover why Kujira has been called &quot;a
          transcendent journey through Japanese culinary art.&quot;
        </motion.p>

        <motion.form
          className="reservation__form"
          onSubmit={handleSubmit}
          noValidate
          variants={staggerContainer(0.07, 0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="reservation__row">
            <motion.div className="reservation__field" variants={inputVariant} transition={gentleEase}>
              <label htmlFor="res-name" className="sr-only">
                Your Name
              </label>
              <input
                id="res-name"
                type="text"
                className="reservation__input"
                placeholder="Your Name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </motion.div>
            <motion.div className="reservation__field" variants={inputVariant} transition={gentleEase}>
              <label htmlFor="res-email" className="sr-only">
                Email Address
              </label>
              <input
                id="res-email"
                type="email"
                className="reservation__input"
                placeholder="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>
          </div>

          <div className="reservation__row">
            <motion.div className="reservation__field" variants={inputVariant} transition={gentleEase}>
              <label htmlFor="res-date" className="sr-only">
                Reservation Date
              </label>
              <input
                id="res-date"
                type="date"
                className="reservation__input"
                name="date"
                aria-label="Reservation date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </motion.div>
            <motion.div className="reservation__field" variants={inputVariant} transition={gentleEase}>
              <label htmlFor="res-party" className="sr-only">
                Party Size
              </label>
              <select
                id="res-party"
                className="reservation__input"
                name="partySize"
                aria-label="Party size"
                value={formData.partySize}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Party Size
                </option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </motion.div>
          </div>

          <motion.div className="reservation__field" variants={inputVariant} transition={gentleEase}>
            <label htmlFor="res-phone" className="sr-only">
              Phone Number
            </label>
            <input
              id="res-phone"
              type="tel"
              className="reservation__input"
              placeholder="Phone Number"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </motion.div>

          <motion.button
            type="submit"
            className="reservation__button"
            variants={inputVariant}
            transition={gentleEase}
            whileHover={{ scale: 1.03, boxShadow: "0 6px 24px rgba(201, 169, 98, 0.3)" }}
            whileTap={{ scale: 0.97 }}
          >
            Request Reservation
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  )
}
