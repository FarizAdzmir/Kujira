import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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

// Card Component
function ParallaxCard({
  item,
  index,
  total,
}: {
  item: MenuItem
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
    <div
      ref={cardRef}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
      }}
    >
      <div
        ref={innerRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1400px",
          height: "500px",
          display: "flex",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#1a1a1a",
          margin: "0 20px",
          top: `${index * 25}px`,
          transformOrigin: "top",
        }}
      >
        {/* Image Container */}
        <div
          style={{
            position: "relative",
            width: "50%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            ref={imageRef}
            src={item.image}
            alt={item.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transformOrigin: "center center",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, transparent 50%, #1a1a1a 100%)",
            }}
          />
        </div>

        {/* Content Container */}
        <div
          style={{
            position: "relative",
            width: "50%",
            padding: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "120px",
              fontWeight: 300,
              color: "#c9a962",
              opacity: 0.2,
              lineHeight: 1,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            style={{
              display: "block",
              marginTop: "16px",
              fontFamily: "var(--font-japanese)",
              fontSize: "18px",
              letterSpacing: "0.3em",
              color: "#c9a962",
            }}
          >
            {item.japanese}
          </span>

          <h3
            style={{
              marginTop: "8px",
              fontFamily: "var(--font-heading)",
              fontSize: "48px",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "#f5f0e6",
              lineHeight: 1.1,
            }}
          >
            {item.name}
          </h3>

          <div
            style={{
              margin: "24px 0",
              width: "64px",
              height: "1px",
              backgroundColor: "#c9a962",
            }}
          />

          <p
            style={{
              maxWidth: "450px",
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "#d4cfc5",
            }}
          >
            {item.description}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "32px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "24px",
                fontWeight: 300,
                letterSpacing: "0.05em",
                color: "#c9a962",
              }}
            >
              {item.price}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#8a8a8a",
              }}
            >
              per piece
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Component
export default function ParallaxMenu() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && headerRef.current) {
            const elements = headerRef.current.querySelectorAll("[data-reveal]")
            elements.forEach((el, i) => {
              setTimeout(() => {
                ;(el as HTMLElement).style.opacity = "1"
                ;(el as HTMLElement).style.transform = "translateY(0)"
              }, i * 100)
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
    <section
      id="parallax-menu"
      style={{
        position: "relative",
        backgroundColor: "#0a0a0a",
        isolation: "isolate",
      }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          position: "relative",
          zIndex: 20,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "128px 32px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <span
            data-reveal
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontFamily: "var(--font-heading)",
              fontSize: "12px",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#c9a962",
              marginBottom: "16px",
              opacity: 0,
              transform: "translateY(40px)",
              transition: "opacity 1s ease, transform 1s ease",
            }}
          >
            <span
              style={{
                width: "40px",
                height: "1px",
                backgroundColor: "#c9a962",
              }}
            />
            Signature Selection
          </span>

          <h2
            data-reveal
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#f5f0e6",
              opacity: 0,
              transform: "translateY(40px)",
              transition: "opacity 1s ease 0.1s, transform 1s ease 0.1s",
            }}
          >
            Omakase Highlights
          </h2>

          <p
            data-reveal
            style={{
              maxWidth: "450px",
              marginTop: "16px",
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "#8a8a8a",
              opacity: 0,
              transform: "translateY(40px)",
              transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
            }}
          >
            Each piece tells a story of tradition, craftsmanship, and the
            finest ingredients sourced from Japan's legendary markets.
          </p>
        </div>
      </div>

      {/* Cards Container */}
      <div style={{ marginTop: "50px" }}>
        {menuItems.map((item, index) => (
          <ParallaxCard
            key={item.name}
            item={item}
            index={index}
            total={menuItems.length}
          />
        ))}
      </div>

      {/* Bottom Spacer */}
      <div style={{ height: "20vh" }} />
    </section>
  )
}
