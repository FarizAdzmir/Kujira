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
  {
    japanese: "いくら",
    name: "Ikura",
    description: "Marinated salmon roe, jewel-like pearls bursting with umami",
    price: "$30",
    image: "/images/menu/ikura.jpg",
    alt: "Ikura - Marinated salmon roe",
  },
  {
    japanese: "金目鯛",
    name: "Kinmedai",
    description: "Golden-eye snapper, torch-seared with yuzu and sea salt",
    price: "$34",
    image: "/images/menu/kinmedai.jpg",
    alt: "Kinmedai - Golden-eye snapper",
  },
  {
    japanese: "中トロ",
    name: "Chutoro",
    description: "Medium fatty tuna, the perfect balance of lean and rich",
    price: "$42",
    image: "/images/menu/chutoro.jpg",
    alt: "Chutoro - Medium fatty tuna",
  },
]

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Reveal animations on scroll into view
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

  // GSAP horizontal scroll on desktop
  useEffect(() => {
    const scrollEl = scrollRef.current
    const containerEl = containerRef.current
    if (!scrollEl || !containerEl) return

    const mm = gsap.matchMedia()

    mm.add("(min-width: 1025px)", () => {
      // Calculate how far the scroll track needs to move
      const getScrollAmount = () => {
        return -(scrollEl.scrollWidth - window.innerWidth)
      }

      const tween = gsap.to(scrollEl, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerEl,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      return () => {
        tween.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} id="menu" className="menu">
      {/* Header */}
      <div className="menu__header">
        <div className="menu__title-group">
          <span className="menu__label reveal">
            Signature Selection
          </span>
          <h2 className="menu__title reveal">
            Omakase Highlights
          </h2>
        </div>

        <a href="#" className="menu__view-all reveal" onClick={(e) => e.preventDefault()}>
          View Full Menu
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Scrollable menu container */}
      <div ref={containerRef} className="menu__container">
        <div ref={scrollRef} className="menu__scroll">
          {menuItems.map((item, index) => (
            <article
              key={item.name}
              className="menu__item reveal-scale"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="menu__item-image">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <div className="menu__item-overlay" />
                <span className="menu__item-price">{item.price}</span>
              </div>

              <div className="menu__item-content">
                <span className="menu__item-japanese">{item.japanese}</span>
                <h3 className="menu__item-name">{item.name}</h3>
                <p className="menu__item-desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
