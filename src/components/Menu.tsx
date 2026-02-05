import { useEffect, useRef } from "react"
import MenuCard from "./MenuCard"
import "./Menu.scss"

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
    japanese: "\u5927\u30C8\u30ED",
    name: "Otoro",
    description:
      "Premium fatty bluefin tuna belly, the crown jewel of omakase. Its rich marbling creates an unparalleled melt-in-your-mouth texture with deep, buttery umami that lingers gracefully.",
    price: "$48",
    image: "/images/menu/otoro.jpeg",
    alt: "Otoro - Premium fatty tuna",
  },
  {
    japanese: "\u96F2\u4E39",
    name: "Uni",
    description:
      "Hokkaido sea urchin, harvested from the pristine waters of northern Japan. Each piece offers a briny sweetness with a creamy, custard-like finish that embodies the essence of the sea.",
    price: "$36",
    image: "/images/menu/uni.jpeg",
    alt: "Uni - Hokkaido sea urchin",
  },
  {
    japanese: "\u548C\u725B",
    name: "A5 Wagyu",
    description:
      "Exquisitely seared Miyazaki wagyu beef, graded A5 for its exceptional marbling. Served with truffle ponzu, each bite reveals layers of rich, beefy flavor and silken texture.",
    price: "$32",
    image: "/images/menu/wagyu.jpeg",
    alt: "A5 Wagyu - Seared Miyazaki beef",
  },
  {
    japanese: "\u3044\u304F\u3089",
    name: "Ikura",
    description:
      "Glistening salmon roe marinated in our house dashi and soy blend. These jewel-like pearls burst with oceanic brininess, releasing waves of umami with each delicate pop.",
    price: "$28",
    image: "/images/menu/otoro.jpeg",
    alt: "Ikura - Marinated salmon roe",
  },
  {
    japanese: "\u5E06\u7ACB",
    name: "Hotate",
    description:
      "Hand-dived Hokkaido scallop, pristine and sweet. Lightly torched to caramelize the edges while preserving its tender, almost creamy center. A symphony of subtle sweetness.",
    price: "$30",
    image: "/images/menu/uni.jpeg",
    alt: "Hotate - Hokkaido scallop",
  },
  {
    japanese: "\u7518\u6D77\u8001",
    name: "Amaebi",
    description:
      "Sweet shrimp from the cold depths of Hokkaido waters. Served raw to showcase its natural sweetness and delicate, almost ethereal texture that dissolves on the palate.",
    price: "$28",
    image: "/images/menu/amaebi.jpeg",
    alt: "Amaebi - Sweet shrimp",
  },
  {
    japanese: "\u5C0F\u9C2D",
    name: "Kohada",
    description:
      "Gizzard shad, the true mark of an itamae's skill. Cured with salt and rice vinegar to achieve perfect balance\u2014its silvery skin glistening, flavor complex and refined.",
    price: "$22",
    image: "/images/menu/wagyu.jpeg",
    alt: "Kohada - Gizzard shad",
  },
  {
    japanese: "\u7A74\u5B50",
    name: "Anago",
    description:
      "Conger eel, slowly simmered until impossibly tender, then finished with our house-made sweet soy glaze. Its delicate flesh and subtle sweetness represent the pinnacle of Edomae tradition.",
    price: "$24",
    image: "/images/menu/anago.jpeg",
    alt: "Anago - Conger eel",
  },
]

export default function Menu() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const label = headerRef.current?.querySelector(".menu-parallax__label")
            const title = headerRef.current?.querySelector(".menu-parallax__title")
            const subtitle = headerRef.current?.querySelector(".menu-parallax__subtitle")
            const link = headerRef.current?.querySelector(".menu-parallax__link")

            label?.classList.add("revealed")
            title?.classList.add("revealed")
            subtitle?.classList.add("revealed")
            link?.classList.add("revealed")
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
    <section id="menu" className="menu-parallax">
      {/* Header */}
      <div ref={headerRef} className="menu-parallax__header">
        <div className="menu-parallax__header-content">
          <span className="menu-parallax__label">Signature Selection</span>
          <h2 className="menu-parallax__title">Omakase Highlights</h2>
          <p className="menu-parallax__subtitle">
            Each piece tells a story of tradition, craftsmanship, and the
            finest ingredients sourced from Japan's legendary markets.
          </p>
        </div>

        <a href="#" className="menu-parallax__link">
          View Full Menu
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Stacking Cards Container */}
      <div className="menu-parallax__container">
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
      <div className="menu-parallax__spacer" />
    </section>
  )
}
