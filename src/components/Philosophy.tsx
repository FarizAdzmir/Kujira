import { useEffect, useRef } from "react"

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll(".reveal, .reveal-left")
            reveals.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("revealed")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative min-h-screen flex items-center py-32 px-8 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="relative z-20 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        {/* Left - Image */}
        <div className="relative reveal-left opacity-0 -translate-x-10 transition-all duration-1000">
          {/* Kanji background */}
          <span
            className="font-japanese text-[clamp(8rem,20vw,16rem)] font-light text-[#c9a962] opacity-15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none"
            style={{ writingMode: "vertical-rl" }}
            aria-hidden="true"
          >
            匠
          </span>

          {/* Image frame with gold border offset */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <div
              className="absolute -top-5 -right-5 w-full h-full border border-[#c9a962] z-[1]"
              aria-hidden="true"
            />
            <img
              src="/images/menu/chef-hands.jpeg"
              alt="Master chef preparing sushi"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right - Content */}
        <div className="lg:pl-16">
          <span className="reveal opacity-0 translate-y-10 transition-all duration-1000 font-heading text-xs font-normal tracking-[0.3em] uppercase text-[#c9a962] mb-4 flex items-center gap-4">
            <span
              className="w-10 h-px bg-[#c9a962]"
              aria-hidden="true"
            />
            Our Philosophy
          </span>

          <h2 className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-100 font-heading text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.1] tracking-tight text-[#f5f0e6] mb-8">
            Where Tradition
            <br />
            Meets <em className="italic text-[#c9a962]">Mastery</em>
          </h2>

          <p className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-200 font-body text-base font-light leading-relaxed text-[#d4cfc5] mb-6 max-w-[480px]">
            At Kujira, we believe sushi is more than food—it&apos;s an art form
            passed down through generations. Each piece tells a story of the
            sea, the seasons, and the skilled hands that craft it.
          </p>

          <p className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-300 font-body text-base font-light leading-relaxed text-[#d4cfc5] mb-8 max-w-[480px]">
            Our commitment to sourcing the finest ingredients from Tokyo&apos;s
            Tsukiji Market ensures every bite transports you to the heart of
            Japan.
          </p>

          <span className="reveal opacity-0 translate-y-10 transition-all duration-1000 delay-400 font-japanese text-xl text-[#c9a962] tracking-[0.2em]">
            — 山田 健太郎
          </span>
        </div>
      </div>

    </section>
  )
}
