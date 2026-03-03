import React, { useEffect } from "react";
import "./SmartCare.css";
import SmartCareCard from "./SmartCareCard/SmartCareCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cardsData = [
  {
    id: 1,
    badge: "#01",
    title: "COLOSTRUM INTAKE IS CRITICAL",
    subtitle: "FIRST 24 HOURS MATTER",
    text: "The mother’s first milk, colostrum, builds immunity and protects newborns from early infections. Make sure every pup or kitten gets it within the first few hours.",
    background:
      "linear-gradient(180deg, rgba(255, 204, 102, 0.48) 0%, rgba(255, 204, 102, 0.80) 100%)",
  },
  {
    id: 2,
    badge: "#02",
    title: "CRAWLING BUILDS STRENGTH",
    subtitle: "LET THEM MOVE",
    text: "Tiny steps add up. Crawling and early movement help grow strong muscles and better coordination for healthy, playful pets.",
    background:
      "linear-gradient(180deg, rgba(102, 117, 255, 0.48) 0%, rgba(102, 117, 255, 0.80) 100%)",
  },
  {
    id: 3,
    badge: "#03",
    title: "EARLY HANDLING CUES",
    subtitle: "TRUST FROM DAY ONE",
    text: "Gentle touch and positive handling early in life teach pets to trust humans, making vet visits and grooming much easier later.",
    background:
      "linear-gradient(180deg, rgba(255, 60, 83, 0.48) 0%, rgba(255, 60, 83, 0.80) 100%)",
  },
];
const SmartCare = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".care-card");
    if (!cards.length) return;

    // initial state: only first card visible
    gsap.set(cards, { opacity: 0, yPercent: 120 });
    gsap.set(cards[0], { opacity: 1, yPercent: 0 });

    const totalDuration = window.innerHeight * 3;

    const trigger = ScrollTrigger.create({
      trigger: ".smart-care-scroll-area",
      start: "top top",
      end: "+=" + totalDuration,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress; // 0..1
        const len = cards.length || 1;
        const activeIndex = Math.min(Math.floor(p * len), len - 1);

        cards.forEach((card, i) => {
          const segStart = i / len;
          const segEnd = (i + 1) / len;
          const local =
            segEnd === segStart
              ? 0
              : Math.min(Math.max((p - segStart) / (segEnd - segStart), 0), 1);

          const yValue = i === 0 ? 0 : 100 - local * 100;
          const gapBase = 60;
          const gapScale = Math.min(Math.max(window.innerHeight / 900, 0.6), 1); // reduce gap on shorter viewports
          const yOffsetPx = i === 0 ? 0 : gapBase * gapScale * (1 - local);
          const opacity = i === 0 ? 1 : Math.min(Math.max(local * 1.25, 0), 1);
          const zIndex = i === activeIndex ? 1002 : 1000;
          gsap.set(card, {
            yPercent: yValue,
            y: yOffsetPx,
            opacity,
            zIndex,
          });
        });
      },
    });

    trigger && trigger.refresh();

    return () => {
      trigger && trigger.kill();
    };
  }, []);

  const fillPercents = [0.7 / 3, 1.7 / 3, 2.2 / 3]; // hər kart üçün sabit dolum

  return (
    <section className="smart-care">
        <div className="smart-care-scroll-area">
          <div className="smart-care-sticky">
            <div className="smart-care-hero">
              <div className="cards-wrapper">
                {cardsData.map((card, index) => {
                  return (
                    <SmartCareCard
                      key={card.id}
                      id={card.id}
                      badge={card.badge}
                      title={card.title}
                      subtitle={card.subtitle}
                      text={card.text}
                      background={card.background}
                      staticFill={fillPercents[index] || 0}
                    />
                  );
                })}{" "}
              </div>

              <div className="smart-care-text">
                <div className="smart-care-tag">SMART CARE MADE SIMPLE</div>
                <div className="smart-care-title">
                  <div className="line-1">EARLY LIFE</div>

                  <div className="title-middle">
                    <div className="line-2">CARE TIPS</div>
                    <span className="health-badge">HEALTH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


    </section>
  );
};

export default SmartCare;
