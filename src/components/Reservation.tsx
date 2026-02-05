import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Reservation() {
  const sectionRef = useRef<HTMLElement>(null);
  const kanjiRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    partySize: '',
    phone: ''
  });

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    if (!section || !form) return;

    const ctx = gsap.context(() => {
      // Kanji dramatic entrance
      gsap.fromTo(kanjiRef.current,
        { opacity: 0, scale: 2, rotation: 45 },
        {
          opacity: 0.08,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Label with underline effect
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: 1,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Title scale and fade
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Subtitle
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Form inputs stagger animation
      const inputs = form.querySelectorAll('.reservation__input, .reservation__button');
      gsap.fromTo(inputs,
        { opacity: 0, y: 30, x: -20 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          delay: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Button success animation
    const button = formRef.current?.querySelector('.reservation__button');
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          alert('Thank you for your reservation request! We will contact you shortly.');
        }
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    gsap.to(e.target, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <section className="reservation" id="reservation" ref={sectionRef}>
      <div className="reservation__container">
        <div className="reservation__kanji" ref={kanjiRef} style={{ opacity: 0, transform: 'scale(2) rotate(45deg)' }}>
          予約
        </div>
        <span className="reservation__label" ref={labelRef} style={{ opacity: 0, transform: 'translateY(40px)', clipPath: 'inset(0 0 100% 0)' }}>
          Reserve Your Seat
        </span>
        <h2 className="reservation__title" ref={titleRef} style={{ opacity: 0, transform: 'translateY(50px) scale(0.95)' }}>
          Begin Your Journey
        </h2>
        <p className="reservation__subtitle" ref={subtitleRef} style={{ opacity: 0, transform: 'translateY(30px)' }}>
          Our intimate 12-seat counter fills quickly. Reserve your omakase experience and discover why Kujira has been called &quot;a transcendent journey through Japanese culinary art.&quot;
        </p>
        
        <form className="reservation__form" ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="reservation__row">
            <div className="reservation__field">
              <label htmlFor="res-name" className="sr-only">Your Name</label>
              <input 
                id="res-name"
                type="text" 
                className="reservation__input" 
                placeholder="Your Name" 
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ opacity: 0, transform: 'translate(-20px, 30px)' }}
                required 
              />
            </div>
            <div className="reservation__field">
              <label htmlFor="res-email" className="sr-only">Email Address</label>
              <input 
                id="res-email"
                type="email" 
                className="reservation__input" 
                placeholder="Email Address" 
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ opacity: 0, transform: 'translate(-20px, 30px)' }}
                required 
              />
            </div>
          </div>
          <div className="reservation__row">
            <div className="reservation__field">
              <label htmlFor="res-date" className="sr-only">Reservation Date</label>
              <input 
                id="res-date"
                type="date" 
                className="reservation__input" 
                name="date"
                aria-label="Reservation date"
                value={formData.date}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ opacity: 0, transform: 'translate(-20px, 30px)' }}
                required 
              />
            </div>
            <div className="reservation__field">
              <label htmlFor="res-party" className="sr-only">Party Size</label>
              <select 
                id="res-party"
                className="reservation__input" 
                name="partySize"
                aria-label="Party size"
                value={formData.partySize}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ opacity: 0, transform: 'translate(-20px, 30px)' }}
                required
              >
                <option value="" disabled>Party Size</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </div>
          </div>
          <div className="reservation__field">
            <label htmlFor="res-phone" className="sr-only">Phone Number</label>
            <input 
              id="res-phone"
              type="tel" 
              className="reservation__input" 
              placeholder="Phone Number" 
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ opacity: 0, transform: 'translate(-20px, 30px)' }}
            />
          </div>
          <button type="submit" className="reservation__button" style={{ opacity: 0, transform: 'translate(-20px, 30px)' }}>
            Request Reservation
          </button>
        </form>
      </div>
    </section>
  );
}
