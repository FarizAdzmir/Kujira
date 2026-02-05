import { useEffect, useRef } from "react"
import MenuCard from "./MenuCard"

interface MenuItem {
  japanese: string
  name: string
  description: string
  price: string
  image: string
  alt: string
}

const menuItems: MenuItem[] = [
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

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll(".reveal")
            reveals.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("revealed")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="menu" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Header */}
      <div
        ref={headerRef}
        className="relative z-20 mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-8 pb-8 pt-32 md:flex-row md:items-end"
      >
        <div className="max-w-[600px]">
          <span className="reveal mb-4 flex translate-y-10 items-center gap-4 font-heading text-xs font-normal uppercase tracking-[0.3em] text-[#c9a962] opacity-0 transition-all duration-1000">
            <span className="h-px w-10 bg-[#c9a962]" aria-hidden="true" />
            Signature Selection
          </span>
          <h2 className="reveal translate-y-10 font-heading text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.1] tracking-tight text-[#f5f0e6] opacity-0 transition-all duration-1000 delay-100">
            Omakase Highlights
          </h2>
          <p className="reveal mt-4 max-w-md translate-y-10 font-body text-base font-light leading-relaxed text-[#8a8a8a] opacity-0 transition-all duration-1000 delay-200">
            Each piece tells a story of tradition, craftsmanship, and the
            finest ingredients sourced from Japan's legendary markets.
          </p>
        </div>

        <a
          href="#"
          className="reveal group flex translate-y-10 items-center gap-2 font-heading text-sm font-normal uppercase tracking-[0.15em] text-[#f5f0e6] opacity-0 transition-all duration-1000 delay-300 hover:text-[#c9a962]"
        >
          View Full Menu
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Stacking Cards Container */}
      <div className="relative">
        {menuItems.map((item, index) => (
          <MenuCard
            key={item.name}
            {...item}
            index={index}
            total={menuItems.length}
          />
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="h-[20vh]" />
    </section>
  )
}
