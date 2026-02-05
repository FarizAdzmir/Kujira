import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroJapaneseRef = useRef<HTMLHeadingElement>(null);
  const heroTitleRef = useRef<HTMLParagraphElement>(null);
  const heroTaglineRef = useRef<HTMLParagraphElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    if (!isLoaded) return;
    
    const frameCount = 150;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      
      img.src = `/images/frames/frame_${frameNum}.jpg`;
      images.push(img);
    }
  }, [isLoaded]);

  // Canvas setup and scroll animation
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = imagesRef.current;
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

    // ScrollTrigger animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      pinSpacing: true,
      scrub: 0.3,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * (frameCount - 1));
        renderFrame(frameIndex);
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      scrollTrigger.kill();
    };
  }, [imagesLoaded]);

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
        <canvas className="hero__canvas" ref={canvasRef} />
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
