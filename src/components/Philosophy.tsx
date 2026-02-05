import { motion } from "motion/react"
import {
  fadeUp,
  fadeLeft,
  lineGrow,
  staggerContainer,
  slowReveal,
  gentleEase,
  defaultViewport,
} from "@/lib/animations"

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative min-h-screen flex items-center py-32 px-8 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <motion.div
        className="relative z-20 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center"
        variants={staggerContainer(0.15, 0)}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        {/* Left - Image */}
        <motion.div
          className="relative"
          variants={fadeLeft}
          transition={slowReveal}
        >
          {/* Kanji background */}
          <motion.span
            className="font-japanese text-[clamp(8rem,20vw,16rem)] font-light text-[#c9a962] opacity-15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none"
            style={{ writingMode: "vertical-rl" }}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.3 }}
            whileInView={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            匠
          </motion.span>

          {/* Image frame with gold border offset */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.div
              className="absolute -top-5 -right-5 w-full h-full border border-[#c9a962] z-[1]"
              aria-hidden="true"
              initial={{ opacity: 0, x: 20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            />
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <img
                src="/images/menu/chef-hands.jpeg"
                alt="Master chef preparing sushi"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right - Content */}
        <motion.div
          className="lg:pl-16"
          variants={staggerContainer(0.12, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {/* Label */}
          <motion.span
            className="font-heading text-xs font-normal tracking-[0.3em] uppercase text-[#c9a962] mb-4 flex items-center gap-4"
            variants={fadeUp}
            transition={gentleEase}
          >
            <motion.span
              className="w-10 h-px bg-[#c9a962] inline-block"
              aria-hidden="true"
              variants={lineGrow}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            Our Philosophy
          </motion.span>

          {/* Heading */}
          <motion.h2
            className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.1] tracking-tight text-[#f5f0e6] mb-8"
            variants={fadeUp}
            transition={slowReveal}
          >
            Where Tradition
            <br />
            Meets <em className="italic text-[#c9a962]">Mastery</em>
          </motion.h2>

          {/* Paragraphs */}
          <motion.p
            className="font-body text-base font-light leading-relaxed text-[#d4cfc5] mb-6 max-w-[480px]"
            variants={fadeUp}
            transition={gentleEase}
          >
            At Kujira, we believe sushi is more than food—it&apos;s an art form
            passed down through generations. Each piece tells a story of the
            sea, the seasons, and the skilled hands that craft it.
          </motion.p>

          <motion.p
            className="font-body text-base font-light leading-relaxed text-[#d4cfc5] mb-8 max-w-[480px]"
            variants={fadeUp}
            transition={gentleEase}
          >
            Our commitment to sourcing the finest ingredients from Tokyo&apos;s
            Tsukiji Market ensures every bite transports you to the heart of
            Japan.
          </motion.p>

          {/* Signature */}
          <motion.span
            className="font-japanese text-xl text-[#c9a962] tracking-[0.2em]"
            variants={fadeUp}
            transition={gentleEase}
          >
            — 山田 健太郎
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  )
}
