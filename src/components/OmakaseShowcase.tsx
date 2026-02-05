import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./OmakaseShowcase.scss"

gsap.registerPlugin(ScrollTrigger)

interface ShowcaseItem {
  japanese: string
  name: string
  description: string
  price: string
  image: string
  alt: string
}

const showcaseItems: ShowcaseItem[] = [
  {
    japanese: "大トロ",
    name: "Otoro",
    description:
      "Premium fatty bluefin tuna belly, the crown jewel of omakase. Its rich marbling creates an unparalleled melt-in-your-mouth texture with deep, buttery umami that lingers gracefully.",
    price: "$48",
    image: "/images/menu/otoro.jpeg",
    alt: "Otoro - Premium fatty tuna",
  },
  {
    japanese: "雲丹",
    name: "Uni",
    description:
      "Hokkaido sea urchin, harvested from the pristine waters of northern Japan. Each piece offers a briny sweetness with a creamy, custard-like finish that embodies the essence of the sea.",
    price: "$36",
    image: "/images/menu/uni.jpeg",
    alt: "Uni - Hokkaido sea urchin",
  },
  {
    japanese: "和牛",
    name: "A5 Wagyu",
    description:
      "Exquisitely seared Miyazaki wagyu beef, graded A5 for its exceptional marbling. Served with truffle ponzu, each bite reveals layers of rich, beefy flavor and silken texture.",
    price: "$32",
    image: "/images/menu/wagyu.jpeg",
    alt: "A5 Wagyu - Seared Miyazaki beef",
  },
  {
    japanese: "いくら",
    name: "Ikura",
    description:
      "Glistening salmon roe marinated in our house dashi and soy blend. These jewel-like pearls burst with oceanic brininess, releasing waves of umami with each delicate pop.",
    price: "$28",
    image: "/images/menu/otoro.jpeg",
    alt: "Ikura - Marinated salmon roe",
  },
  {
    japanese: "帆立",
    name: "Hotate",
    description:
      "Hand-dived Hokkaido scallop, pristine and sweet. Lightly torched to caramelize the edges while preserving its tender, almost creamy center. A symphony of subtle sweetness.",
    price: "$30",
    image: "/images/menu/uni.jpeg",
    alt: "Hotate - Hokkaido scallop",
  },
  {
    japanese: "甘海老",
    name: "Amaebi",
    description:
      "Sweet shrimp from the cold depths of Hokkaido waters. Served raw to showcase its natural sweetness and delicate, almost ethereal texture that dissolves on the palate.",
    price: "$28",
    image: "/images/menu/amaebi.jpeg",
    alt: "Amaebi - Sweet shrimp",
  },
  {
    japanese: "小鰭",
    name: "Kohada",
    description:
      "Gizzard shad, the true mark of an itamae's skill. Cured with salt and rice vinegar to achieve perfect balance—its silvery skin glistening, flavor complex and refined.",
    price: "$22",
    image: "/images/menu/wagyu.jpeg",
    alt: "Kohada - Gizzard shad",
  },
  {
    japanese: "穴子",
    name: "Anago",
    description:
      "Conger eel, slowly simmered until impossibly tender, then finished with our house-made sweet soy glaze. Its delicate flesh and subtle sweetness represent the pinnacle of Edomae tradition.",
    price: "$24",
    image: "/images/menu/anago.jpeg",
    alt: "Anago - Conger eel",
  },
]

// Individual Card Component
function ShowcaseCard({
  item,
  index,
  total,
}: {
  item: ShowcaseItem
  index: number
  total: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const inner = innerRef.current
    const img = imageRef.current

    if (!card || !inner || !img) return

    const targetScale = 1 - (total - 1 - index) * 0.05

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        scale: targetScale,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.fromTo(
        img,
        { scale: 2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      )
    }, card)

    return () => ctx.revert()
  }, [index, total])

  return (
    <div ref={cardRef} className="omakase-showcase__card-wrapper">
      <div
        ref={innerRef}
        className="omakase-showcase__card"
        data-index={index}
      >
        <div className="omakase-showcase__card-image-section">
          <img
            ref={imageRef}
            src={item.image}
            alt={item.alt}
            className="omakase-showcase__card-image"
          />
          <div className="omakase-showcase__card-overlay-gradient" />
          <div className="omakase-showcase__card-overlay-bottom" />
        </div>

        <div className="omakase-showcase__card-content">
          <div className="omakase-showcase__card-content-overlay" />
          <div className="omakase-showcase__card-content-inner">
            <span className="omakase-showcase__card-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="omakase-showcase__card-japanese">
              {item.japanese}
            </span>
            <h3 className="omakase-showcase__card-name">{item.name}</h3>
            <div className="omakase-showcase__card-divider" />
            <p className="omakase-showcase__card-description">
              {item.description}
            </p>
            <div className="omakase-showcase__card-price-container">
              <span className="omakase-showcase__card-price">{item.price}</span>
              <span className="omakase-showcase__card-price-label">
                per piece
              </span>
            </div>
          </div>
        </div>

        <div className="omakase-showcase__card-border" />
      </div>
    </div>
  )
}

// Main Component
export default function OmakaseShowcase() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
          }
        })
      },
      { threshold: 0.3 }
    )

    if (headerRef.current) {
      const children = headerRef.current.querySelectorAll(
        ".omakase-showcase__header-label, .omakase-showcase__header-title, .omakase-showcase__header-subtitle, .omakase-showcase__header-link"
      )
      children.forEach((child) => observer.observe(child))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="omakase-showcase" className="omakase-showcase">
      <div ref={headerRef} className="omakase-showcase__header">
        <div className="omakase-showcase__header-content">
          <span className="omakase-showcase__header-label">
            <span className="omakase-showcase__header-label-line" />
            Signature Selection
          </span>
          <h2 className="omakase-showcase__header-title">
            Omakase Highlights
          </h2>
          <p className="omakase-showcase__header-subtitle">
            Each piece tells a story of tradition, craftsmanship, and the
            finest ingredients sourced from Japan's legendary markets.
          </p>
        </div>

        <a href="#" className="omakase-showcase__header-link">
          View Full Menu
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="omakase-showcase__header-link-icon"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="omakase-showcase__cards">
        {showcaseItems.map((item, index) => (
          <ShowcaseCard
            key={item.name}
            item={item}
            index={index}
            total={showcaseItems.length}
          />
        ))}
      </div>

      <div className="omakase-showcase__spacer" />
    </section>
  )
}
