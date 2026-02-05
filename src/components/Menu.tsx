import { useEffect, useRef } from "react"

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
    description: "Premium fatty bluefin tuna belly, melt-in-your-mouth texture",
    price: "$48",
    image: "/images/menu/otoro.jpeg",
    alt: "Otoro - Premium fatty tuna",
  },
  {
    japanese: "雲丹",
    name: "Uni",
    description: "Hokkaido sea urchin, briny sweetness with creamy finish",
    price: "$36",
    image: "/images/menu/uni.jpeg",
    alt: "Uni - Hokkaido sea urchin",
  },
  {
    japanese: "和牛",
    name: "A5 Wagyu",
    description: "Seared Miyazaki wagyu with truffle ponzu",
    price: "$32",
    image: "/images/menu/wagyu.jpeg",
    alt: "A5 Wagyu - Seared Miyazaki beef",
  },
  {
    japanese: "甘海老",
    name: "Amaebi",
    description: "Sweet shrimp, delicate and pristine from Hokkaido waters",
    price: "$28",
    image: "/images/menu/amaebi.jpeg",
    alt: "Amaebi - Sweet shrimp",
  },
  {
    japanese: "穴子",
    name: "Anago",
    description: "Conger eel with house-made sweet soy glaze",
    price: "$24",
    image: "/images/menu/anago.jpeg",
    alt: "Anago - Conger eel",
  },
]

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll(".reveal, .reveal-scale")
            reveals.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("revealed")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative py-32"
      style={{ backgroundColor: "#141414" }}
    >
      {/* Header */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-8 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="max-w-[600px]">
          <span className="reveal opacity-0 translate-y-10 transition-all duration-1000 font-heading text-xs font-normal tracking-[0.3em] uppercase text-[#c9a962] mb-4 flex items-center gap-4">
            <span className="w-10 h-px bg-[#c9a962]" aria-hidden="true" />
            Signature Selection
          </span>
          <h2 className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-100 font-heading text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.1] tracking-tight text-[#f5f0e6]">
            Omakase Highlights
          </h2>
        </div>

        <a
          href="#"
          className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-200 font-heading text-sm font-normal tracking-[0.15em] uppercase text-[#f5f0e6] flex items-center gap-2 hover:text-[#c9a962] group"
        >
          View Full Menu
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="relative z-20 flex gap-8 overflow-x-auto pb-4 snap-x snap-proximity scrollbar-hide"
        style={{
          paddingLeft: "max(2rem, calc((100vw - 1400px) / 2 + 2rem))",
          paddingRight: "2rem",
        }}
      >
        {menuItems.map((item, index) => (
          <article
            key={item.name}
            className={`reveal-scale opacity-0 scale-95 transition-all duration-700 flex-shrink-0 w-[350px] md:w-[350px] snap-start relative overflow-visible cursor-pointer group`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Image container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1a1a] rounded-sm">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay gradient */}
              <div
                className="absolute inset-0 z-[3] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.8) 20%, rgba(10, 10, 10, 0.5) 40%, rgba(10, 10, 10, 0.15) 60%, transparent 75%)",
                }}
              />

              {/* Price tag */}
              <span className="absolute top-4 right-4 font-heading text-sm font-normal text-[#c9a962] bg-[rgba(10,10,10,0.8)] px-4 py-2 tracking-[0.1em] z-[3]">
                {item.price}
              </span>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 pb-16 z-10 pointer-events-none">
              <span className="font-japanese text-sm text-[#c9a962] tracking-[0.2em] mb-2 block">
                {item.japanese}
              </span>
              <h3 className="font-heading text-2xl font-normal text-[#f5f0e6] mb-2">
                {item.name}
              </h3>
              <p className="font-body text-sm font-light text-[#d4cfc5] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom fade */}
            <div
              className="absolute -bottom-px left-0 w-full h-20 pointer-events-none z-[5]"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(20, 20, 20, 0.4) 30%, rgba(20, 20, 20, 0.8) 60%, #141414 100%)",
              }}
            />
          </article>
        ))}
      </div>

    </section>
  )
}
