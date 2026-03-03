import { useEffect } from "react";
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import "./Testimonials.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import avatar_1 from "../../../../../src/assets/icons/testimonials/avatar-1.png";
import avatar_2 from "../../../../../src/assets/icons/testimonials/avatar-2.png";
import avatar_3 from "../../../../../src/assets/icons/testimonials/avatar-3.png";

const testimonials = [
  {
    id: "lara-marina",
    name: "Lara Marina",
    role: "Pet Lover",
    text: "Finally, an app that actually understands my dog’s needs. The reminders are savers!",
    avatar: avatar_1,
    accentColor: "#F6D64B",
  },
  {
    id: "rauf-ahmadli",
    name: "Rauf AHmadli",
    role: "Pet Lover",
    text: "My cat’s vaccination schedule used to be chaos. Now everything’s in one place.",
    avatar: avatar_2,
    accentColor: "#F3C6A9",
  },
  {
    id: "elif-milolik",
    name: "Elif & Milolik",
    role: "Pet Lover",
    text: "I love how it gives real tips, not just generic advice.",
    avatar: avatar_3,
    accentColor: "#517FEA",
  },
];

const Testimonials = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".testimonial-card");
    if (!cards.length) return;

    const stackEl = document.querySelector(".testimonials-scroll-area");
    if (!stackEl) return;

    // Başlanğıcda 2-ci/3-cü kartları aşağıda saxla ki, əvvəlcədən görünməsin
    gsap.set(cards, { yPercent: 120 });
    gsap.set(cards[0], { yPercent: 0 });

    const totalDuration = window.innerHeight * (cards.length - 1);

    // Viewport-a görə pin-in gecikməsini tənzimlə
    const vh = window.innerHeight;
    let startOffset = 80;
    if (vh <= 750) startOffset = 140;
    else if (vh <= 850) startOffset = 160;
    else if (vh <= 1000) startOffset = 180;

    const trigger = ScrollTrigger.create({
      trigger: ".testimonials-scroll-area",
      start: `top+=${startOffset} top`,
      end: "+=" + (totalDuration + 200),
      pin: true,
      scrub: true,
      anticipatePin: 1,

onUpdate: (self) => {
  const p = self.progress; // 0..1
  const len = cards.length || 1;

  cards.forEach((card, i) => {
    if (i === 0) {
      const firstEnd = 1 / len;
      const secondEnd = 2 / len;
      let scale = 1;
      let opacity = 1;

      if (p >= firstEnd) {
        const fadeLocal = gsap.utils.clamp(
          0,
          1,
          (p - firstEnd) / (secondEnd - firstEnd)
        );
        scale = gsap.utils.interpolate(1, 0.95, fadeLocal);
        opacity = gsap.utils.interpolate(1, 0.5, fadeLocal);
      }

      gsap.set(card, {
        yPercent: 0,
        scale,
        opacity,
        zIndex: 1000,
        transformOrigin: "center center",
      });
      return;
    }

    const segStart = i / len;
    const segEnd = (i + 1) / len;

    let y = 120;
    let scale = 0.92;
    let opacity = 1;

    // === SƏNİN KÖHNƏ LOGIC (1-ci kartın davranışına toxunmuruq) ===
    if (p < segStart) {
      y = 120;
      scale = 0.92;
      opacity = 1;
    } else if (p >= segStart && p <= segEnd) {
      const local = (p - segStart) / (segEnd - segStart);

      y = 120 * (1 - local);

      if (local < 0.5) {
        scale = gsap.utils.interpolate(0.92, 1, local * 2);
        opacity = 1;
      } else {
        scale = gsap.utils.interpolate(1, 0.95, (local - 0.5) * 2);
        opacity = gsap.utils.interpolate(1, 0.5, (local - 0.5) * 2);
      }
    } else {
      y = 0;
      scale = 0.95;
      opacity = 0.5;
    }

    // === YENİ QAYDA: 2-ci və sonrakı kartlar HƏMİŞƏ opacity:1
    // yalnız növbəti kart gələndə solsunlar ===
    if (i > 0) {
      opacity = 1; // kart gələndə də, oturanda da 1

      // bu kartın üstünə gələn "növbəti kart" var?
      if (i < len - 1) {
        const nextStart = (i + 1) / len;
        const nextEnd = (i + 2) / len;

        // növbəti kartın segmentinə girəndə bu kart solmağa başlayır
        const nextLocal = gsap.utils.clamp(
          0,
          1,
          (p - nextStart) / (nextEnd - nextStart)
        );

        if (p >= nextStart) {
          opacity = gsap.utils.interpolate(1, 0.5, nextLocal);
        }
      }
    }

    gsap.set(card, {
      yPercent: y,
      scale,
      opacity,
      // ❗ kartların bir-birini örtməsi üçün zIndex belə olmalıdır
      zIndex: 1000 + i,
      transformOrigin: "center center",
    });
  });
},


    });

    trigger && trigger.refresh();
    stackEl.classList.add("is-gsap-ready");

    return () => {
      stackEl.classList.remove("is-gsap-ready");
      trigger && trigger.kill();
    };
  }, []);
  return (
    <section className="testimonials">
      <div className="testimonials-scroll-area">
        <div className="testimonial-sticky">
          <div className="testimonials-content">
            <header className="testimonials-header">
              <p className="testimonials-header__badge">Testimonials</p>

              <h2 className="testimonials-header__title">
                <p> The difference is real.</p>
                <p> See their stoRies.</p>
              </h2>
            </header>
            <div className="testimonials-cards-wrapper">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} {...testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
