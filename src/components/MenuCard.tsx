"use client"

import { useTransform, useScroll, motion } from "framer-motion"
import type { MotionValue } from "framer-motion"
import { useRef } from "react"
import styles from "./MenuCard.module.scss"

interface MenuCardProps {
  japanese: string
  name: string
  description: string
  price: string
  image: string
  alt: string
  index: number
  total: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}

export default function MenuCard({
  japanese,
  name,
  description,
  price,
  image,
  alt,
  index,
  progress,
  range,
  targetScale,
}: MenuCardProps) {
  const container = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        className={styles.card}
        style={{
          backgroundColor: "#1a1a1a",
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
      >
        {/* Index badge */}
        <span className={styles.indexBadge}>
          {String(index + 1).padStart(2, "0")}
        </span>

        <h2>{name}</h2>

        <div className={styles.body}>
          <div className={styles.description}>
            <span className={styles.japanese}>{japanese}</span>
            <div className={styles.divider} />
            <p>{description}</p>

            <div className={styles.footer}>
              <div>
                <span className={styles.price}>{price}</span>
                <span className={styles.priceLabel}>per piece</span>
              </div>
              <span className={styles.link}>
                <a href="#menu">See more</a>
                <svg
                  width="22"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                    fill="#f5f0e6"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <motion.div className={styles.inner} style={{ scale: imageScale }}>
              <img src={image} alt={alt} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
