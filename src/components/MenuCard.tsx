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

    // Calculate target scale - cards get smaller as they stack
    const targetScale = 1 - (total - 1 - index) * 0.05

    // Create the parallax/scale effect for the card
    const ctx = gsap.context(() => {
      // Scale down the card as user scrolls past it
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

      // Scale the image from 1.5 to 1 as it enters viewport
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
    <div
      ref={cardRef}
      className="h-screen w-full"
      style={{ paddingTop: index === 0 ? "0" : "0" }}
    >
      <div
        ref={innerRef}
        className="sticky top-0 flex h-screen w-full items-center justify-center px-4 py-8 md:px-8 lg:px-16"
        style={{
          top: `calc(${index * 25}px)`,
        }}
      >
        {/* Card Container */}
        <div
          className="relative flex h-[85vh] w-full max-w-[1400px] overflow-hidden rounded-lg"
          style={{ backgroundColor: "#1a1a1a" }}
        >
          {/* Image Section - Left */}
          <div className="relative h-full w-full overflow-hidden md:w-1/2">
            <img
              ref={imageRef}
              src={image}
              alt={alt}
              className="h-full w-full object-cover"
              style={{ transformOrigin: "center center" }}
            />
            {/* Overlay gradient */}
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  "linear-gradient(to right, transparent 50%, #1a1a1a 100%)",
              }}
            />
            <div
              className="absolute inset-0 z-[1]"
              style={{
                background:
                  "linear-gradient(to top, rgba(26, 26, 26, 0.6) 0%, transparent 40%)",
              }}
            />
          </div>

          {/* Content Section - Right */}
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:relative md:w-1/2 md:p-12 lg:p-16">
            {/* Background overlay for mobile */}
            <div
              className="absolute inset-0 z-0 md:hidden"
              style={{
                background:
                  "linear-gradient(to top, rgba(26, 26, 26, 0.95) 0%, rgba(26, 26, 26, 0.8) 50%, rgba(26, 26, 26, 0.4) 100%)",
              }}
            />

            <div className="relative z-10">
              {/* Index number */}
              <span className="font-heading text-8xl font-light text-[#c9a962] opacity-20 md:text-9xl">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Japanese text */}
              <span className="mt-4 block font-japanese text-lg tracking-[0.3em] text-[#c9a962]">
                {japanese}
              </span>

              {/* Name */}
              <h3 className="mt-2 font-heading text-4xl font-light tracking-tight text-[#f5f0e6] md:text-5xl lg:text-6xl">
                {name}
              </h3>

              {/* Decorative line */}
              <div className="my-6 h-px w-16 bg-[#c9a962]" />

              {/* Description */}
              <p className="max-w-md font-body text-base font-light leading-relaxed text-[#d4cfc5] md:text-lg">
                {description}
              </p>

              {/* Price */}
              <div className="mt-8 flex items-center gap-4">
                <span className="font-heading text-2xl font-light tracking-wider text-[#c9a962]">
                  {price}
                </span>
                <span className="font-body text-xs uppercase tracking-[0.2em] text-[#8a8a8a]">
                  per piece
                </span>
              </div>
            </div>
          </div>

          {/* Card border accent */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#c9a962] to-transparent opacity-30" />
        </div>
      </div>
    </div>
  )
}
