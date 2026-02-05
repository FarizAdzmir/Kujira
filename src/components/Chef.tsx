import { useEffect, useRef, useState } from "react"

export default function Chef() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentRef = sectionRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop observing once revealed
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(currentRef)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="chef"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#141414] to-[#0a0a0a] py-16 md:py-0"
    >
      {/* Chef image */}
      <div className="absolute -top-[10%] left-0 z-[1] h-[120%] w-[60%]">
        <img
          src="/images/chef.jpeg"
          alt="Master Chef Kentaro Yamada"
          className="h-full w-full object-cover opacity-70 grayscale-[40%]"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_right,rgba(10,10,10,0)_0%,rgba(10,10,10,0.8)_40%,#0a0a0a_70%)]" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1400px] justify-end px-8 py-32">
        <div
          className={`max-w-[500px] border border-[rgba(201,169,98,0.2)] bg-[rgba(10,10,10,0.6)] p-8 backdrop-blur-sm transition-all duration-1000 md:p-16 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-10 opacity-0"
          }`}
        >
          <span className="mb-8 block font-heading text-xs font-normal uppercase tracking-[0.3em] text-[#c9a962]">
            Master Chef
          </span>

          <blockquote className="relative mb-10">
            {/* Decorative opening quote */}
            <span className="absolute -left-2 -top-4 font-heading text-6xl leading-none text-[#c9a962] opacity-40 md:-left-6 md:-top-6 md:text-7xl">
              &ldquo;
            </span>
            
            {/* Quote text */}
            <p className="font-heading text-xl font-light italic leading-[1.8] tracking-wide text-[#f5f0e6] md:text-2xl">
              Sushi is not about the fish.
            </p>
            <p className="mt-4 font-heading text-base font-light leading-[1.9] text-[#d4cfc5] md:text-lg">
              It&apos;s about the moment of harmony between nature, technique,
              and the guest&apos;s anticipation.
            </p>
            
            {/* Decorative closing quote */}
            <span className="absolute -bottom-6 right-0 font-heading text-6xl leading-none text-[#c9a962] opacity-40 md:-bottom-8 md:text-7xl">
              &rdquo;
            </span>
          </blockquote>

          <div className="space-y-2">
            <p className="font-heading text-base font-normal text-[#f5f0e6]">
              Kentaro Yamada
            </p>
            <p className="font-body text-sm font-light text-[#d4cfc5]">
              Head Itamae, 20 Years Experience
            </p>
          </div>
        </div>

        {/* Decorative kanji */}
        <span className="absolute bottom-8 right-8 font-japanese text-[8rem] font-light leading-none text-[#c9a962] opacity-10">
          職
        </span>
      </div>
    </section>
  )
}
