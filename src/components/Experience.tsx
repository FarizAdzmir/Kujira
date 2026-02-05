import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, type MouseEvent } from "react"
import {
  fadeUp,
  fadeUpScale,
  clipReveal,
  staggerContainer,
  slowReveal,
  gentleEase,
  defaultViewport,
} from "@/lib/animations"

const experienceItems = [
  {
    id: 1,
    icon: "鮮",
    title: "Daily Fresh",
    description:
      "Fish flown in daily from Tokyo's renowned Tsukiji Market, ensuring peak freshness and authentic flavors.",
  },
  {
    id: 2,
    icon: "匠",
    title: "Master Crafted",
    description:
      "Our itamae trained for over 15 years in Tokyo, bringing time-honored techniques to every creation.",
  },
  {
    id: 3,
    icon: "心",
    title: "Heartfelt Service",
    description:
      "Intimate 12-seat counter experience where hospitality meets artistry in perfect harmony.",
  },
]

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof experienceItems)[number]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Smooth 3D tilt with spring physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  })

  // Icon float follows mouse
  const iconX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 15,
  })
  const iconY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 15,
  })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="experience__item"
      variants={fadeUpScale}
      transition={{
        ...slowReveal,
        delay: 0.15 * index,
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        borderColor: "rgba(201, 169, 98, 0.35)",
        transition: { duration: 0.3 },
      }}
    >
      <motion.span
        className="experience__icon"
        style={{ x: iconX, y: iconY }}
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.3 + index * 0.12,
          duration: 0.8,
          type: "spring",
          stiffness: 120,
          damping: 12,
        }}
        viewport={{ once: true }}
      >
        {item.icon}
      </motion.span>
      <h3 className="experience__item-title">{item.title}</h3>
      <p className="experience__item-text">{item.description}</p>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <motion.div
        className="experience__container"
        variants={staggerContainer(0.12, 0)}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        <div className="experience__header">
          <motion.span
            className="experience__label"
            variants={clipReveal}
            transition={gentleEase}
          >
            The Kujira Way
          </motion.span>
          <motion.h2
            className="experience__title"
            variants={fadeUp}
            transition={slowReveal}
          >
            An Unforgettable Experience
          </motion.h2>
        </div>

        <motion.div
          className="experience__grid"
          variants={staggerContainer(0.15, 0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {experienceItems.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
