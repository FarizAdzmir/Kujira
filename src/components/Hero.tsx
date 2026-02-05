import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isLoaded: boolean;
  preloadedImages: HTMLImageElement[];
}

export default function Hero({ isLoaded, preloadedImages }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroJapaneseRef = useRef<HTMLHeadingElement>(null);
  const heroTitleRef = useRef<HTMLParagraphElement>(null);
  const heroTaglineRef = useRef<HTMLParagraphElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);

  // Canvas setup and scroll animation
  useEffect(() => {
    if (!isLoaded || preloadedImages.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = preloadedImages;
    const frameCount = images.length;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      const imgWidth = 800;
      const imgHeight = 450;
      const imgAspect = imgWidth / imgHeight;
      
      let drawWidth, drawHeight;
      const containerAspect = containerWidth / containerHeight;
      
      if (containerAspect > imgAspect) {
        drawWidth = containerWidth;
        drawHeight = containerWidth / imgAspect;
      } else {
        drawHeight = containerHeight;
        drawWidth = containerHeight * imgAspect;
      }
      
      canvas.width = drawWidth;
      canvas.height = drawHeight;
      
      canvas.style.width = `${drawWidth}px`;
      canvas.style.height = `${drawHeight}px`;
      
      // Draw first frame
      if (images[0] && images[0].complete) {
        ctx.drawImage(images[0], 0, 0, canvas.width, canvas.height);
      }
    };

    const renderFrame = (frameIndex: number) => {
      const index = Math.min(Math.max(frameIndex, 0), frameCount - 1);
      const img = images[index];
      
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ScrollTrigger animation — high refreshPriority so its pin-spacing
    // is resolved before downstream ScrollTriggers (Menu, etc.) calculate.
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      pinSpacing: true,
      scrub: 0.3,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: 1,
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * (frameCount - 1));
        renderFrame(frameIndex);
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      scrollTrigger.kill();
    };
  }, [isLoaded, preloadedImages]);

  // Hero content animation
  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(heroJapaneseRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    })
    .to(heroTitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .to(heroTaglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.6')
    .to(heroScrollRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.4');
  }, [isLoaded]);

  return (
    <section className="hero" id="hero" ref={containerRef}>
      <div className="hero__canvas-container">
        <canvas className="hero__canvas" ref={canvasRef} role="img" aria-label="Sushi preparation animation" />
        <div className="hero__overlay" />
        <div className="hero__fade" />
        
        <div className="hero__content">
          <h1 
            className="hero__japanese" 
            ref={heroJapaneseRef}
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            鯨
          </h1>
          <p 
            className="hero__title" 
            ref={heroTitleRef}
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Kujira
          </p>
          <p 
            className="hero__tagline" 
            ref={heroTaglineRef}
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Artistry in Every Slice
          </p>
        </div>
        
        <div 
          className="hero__scroll" 
          ref={heroScrollRef}
          style={{ opacity: 0 }}
        >
          <span className="hero__scroll-text">Scroll to Explore</span>
          <span className="hero__scroll-line" />
        </div>
      </div>
    </section>
  );
}
