import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import {
  fadeUp,
  fadeRight,
  staggerContainer,
  slowReveal,
  gentleEase,
  defaultViewport,
} from "@/lib/animations"

export default function Chef() {
  const sectionRef = useRef<HTMLElement>(null)

  // Parallax for the chef image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1])

  return (
    <section
      ref={sectionRef}
      id="chef"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#141414] to-[#0a0a0a] py-16 md:py-0"
    >
      {/* Chef image with parallax */}
      <motion.div
        className="absolute -top-[10%] left-0 z-[1] h-[120%] w-[60%]"
        style={{ y: imageY, scale: imageScale }}
      >
        <motion.img
          src="/images/chef.jpeg"
          alt="Master Chef Kentaro Yamada"
          className="h-full w-full object-cover opacity-70 grayscale-[40%]"
          initial={{ opacity: 0, scale: 1.15 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.1 }}
        />
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_right,rgba(10,10,10,0)_0%,rgba(10,10,10,0.8)_40%,#0a0a0a_70%)]" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1400px] justify-end px-8 py-32">
        <motion.div
          className="max-w-[500px] border border-[rgba(201,169,98,0.2)] bg-[rgba(10,10,10,0.6)] p-8 backdrop-blur-sm md:p-16"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          transition={slowReveal}
          viewport={defaultViewport}
        >
          <motion.div
            variants={staggerContainer(0.12, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            <motion.span
              className="mb-8 block font-heading text-xs font-normal uppercase tracking-[0.3em] text-[#c9a962]"
              variants={fadeUp}
              transition={gentleEase}
            >
              Master Chef
            </motion.span>

            <motion.blockquote
              className="relative mb-10"
              variants={fadeUp}
              transition={slowReveal}
            >
              {/* Decorative opening quote */}
              <motion.span
                className="absolute -left-2 -top-4 font-heading text-6xl leading-none text-[#c9a962] opacity-40 md:-left-6 md:-top-6 md:text-7xl"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 0.4, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                &ldquo;
              </motion.span>

              <p className="font-heading text-xl font-light italic leading-[1.8] tracking-wide text-[#f5f0e6] md:text-2xl">
                Sushi is not about the fish.
              </p>
              <p className="mt-4 font-heading text-base font-light leading-[1.9] text-[#d4cfc5] md:text-lg">
                It&apos;s about the moment of harmony between nature, technique,
                and the guest&apos;s anticipation.
              </p>

              {/* Decorative closing quote */}
              <motion.span
                className="absolute -bottom-6 right-0 font-heading text-6xl leading-none text-[#c9a962] opacity-40 md:-bottom-8 md:text-7xl"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 0.4, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                &rdquo;
              </motion.span>
            </motion.blockquote>

            <motion.div className="space-y-2" variants={fadeUp} transition={gentleEase}>
              <p className="font-heading text-base font-normal text-[#f5f0e6]">
                Kentaro Yamada
              </p>
              <p className="font-body text-sm font-light text-[#d4cfc5]">
                Head Itamae, 20 Years Experience
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative kanji */}
        <motion.span
          className="absolute bottom-8 right-8 font-japanese text-[8rem] font-light leading-none text-[#c9a962] opacity-10"
          initial={{ opacity: 0, rotate: 15, scale: 0.8 }}
          whileInView={{ opacity: 0.1, rotate: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          aria-hidden="true"
        >
          職
        </motion.span>
      </div>
    </section>
  )
}
