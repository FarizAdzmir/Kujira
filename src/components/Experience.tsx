import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experienceItems = [
  {
    id: 1,
    icon: '鮮',
    title: 'Daily Fresh',
    description: "Fish flown in daily from Tokyo's renowned Tsukiji Market, ensuring peak freshness and authentic flavors."
  },
  {
    id: 2,
    icon: '匠',
    title: 'Master Crafted',
    description: 'Our itamae trained for over 15 years in Tokyo, bringing time-honored techniques to every creation.'
  },
  {
    id: 3,
    icon: '心',
    title: 'Heartfelt Service',
    description: 'Intimate 12-seat counter experience where hospitality meets artistry in perfect harmony.'
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Label and title animations with split effect
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 40, rotateX: -20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Experience items — soft fade + gentle rise
      itemRefs.current.forEach((item, index) => {
        const icon = item.querySelector('.experience__icon');

        // Card fade-up
        gsap.fromTo(item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2 + index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        );

        // Icon gentle fade-in
        gsap.fromTo(icon,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.35 + index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget;
    const rect = item.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4;

    gsap.to(item, {
      rotateY: x,
      rotateX: -y,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    // Update CSS custom properties for radial gradient mask
    item.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    item.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget;

    gsap.to(item, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div className="experience__container">
        <div className="experience__header">
          <span className="experience__label" ref={labelRef} style={{ opacity: 0, transform: 'translateY(40px) rotateX(-20deg)' }}>
            The Kujira Way
          </span>
          <h2 className="experience__title" ref={titleRef} style={{ opacity: 0, transform: 'translateY(40px) scale(0.95)' }}>
            An Unforgettable Experience
          </h2>
        </div>
        
        <div className="experience__grid">
          {experienceItems.map((item, index) => (
            <div 
              key={item.id} 
              className="experience__item"
              ref={(el) => { if (el) itemRefs.current[index] = el; }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              <span className="experience__icon" style={{ opacity: 0, transform: 'translateY(8px)' }}>{item.icon}</span>
              <h3 className="experience__item-title">{item.title}</h3>
              <p className="experience__item-text">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
