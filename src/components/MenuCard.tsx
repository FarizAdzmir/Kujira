import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface MenuCardProps {
  japanese: string
  name: string
  description: string
  price: string
  image: string
  alt: string
  index: number
  total: number
}

export default function MenuCard({
  japanese,
  name,
  description,
  price,
  image,
  alt,
  index,
  total,
}: MenuCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const inner = innerRef.current
    const img = imageRef.current

    if (!card || !inner || !img) return

    // Calculate target scale based on position in stack
    const targetScale = 1 - (total - 1 - index) * 0.05

    const ctx = gsap.context(() => {
      // Scale effect on the card as it scrolls
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

      // Image zoom effect
      gsap.fromTo(
        img,
        { scale: 1.5 },
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
    <div ref={cardRef} className="menu-parallax__card">
      <div ref={innerRef} className="menu-parallax__card-inner">
        {/* Image Section */}
        <div className="menu-parallax__image-container">
          <img
            ref={imageRef}
            src={image}
            alt={alt}
            className="menu-parallax__image"
          />
          <div className="menu-parallax__image-overlay-right" />
          <div className="menu-parallax__image-overlay-bottom" />
        </div>

        {/* Content Section */}
        <div className="menu-parallax__content">
          <div className="menu-parallax__content-overlay-mobile" />

          <div className="menu-parallax__content-inner">
            <span className="menu-parallax__index">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="menu-parallax__japanese">{japanese}</span>

            <h3 className="menu-parallax__name">{name}</h3>

            <div className="menu-parallax__divider" />

            <p className="menu-parallax__description">{description}</p>

            <div className="menu-parallax__price-container">
              <span className="menu-parallax__price">{price}</span>
              <span className="menu-parallax__price-label">per piece</span>
            </div>
          </div>
        </div>

        <div className="menu-parallax__border-accent" />
      </div>
    </div>
  )
}
