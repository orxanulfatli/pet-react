import { useEffect, useMemo, useRef, useState } from "react";
import "./FunFacts.css";
import StoreButtons from "../Hero/StoreButtons";
import star1 from "../../../../../src/assets/icons/funfacts/star-1.png";
import star2 from "../../../../../src/assets/icons/funfacts/star-2.png";
import star3 from "../../../../../src/assets/icons/funfacts/star-3.png";
import star4 from "../../../../../src/assets/icons/funfacts/star-4.png";
import star5 from "../../../../../src/assets/icons/funfacts/star-5.png";
import star6 from "../../../../../src/assets/icons/funfacts/star-6.png";
import star7 from "../../../../../src/assets/icons/funfacts/star-7.png";
import star8 from "../../../../../src/assets/icons/funfacts/star-8.png";

const BADGE_SIZE = 96;
const START_BASE = 50; // base starting Y (px from bottom ref in calc)
const MIN_START = 60; // prevent badges from starting too low
const BASE_GAP = 10; // base vertical gap between badges
const TRAVEL = 220; // how far each badge moves upward (keeps spacing stable)
const REF_HEIGHT = 1260; // reference height to normalize spacing
const ANIM_DURATION = 1; // seconds; change this to adjust speed
const DELAY_PER_SECOND = 0.2; // stagger factor per second of animation

const floatingBadgesRaw = [
  { icon: star1, left: "50%" },
  { icon: star2, left: "37%" }, // slightly left of the first
  { icon: star3, left: "49%" }, // slightly right offset, reduced
  { icon: star4, left: "35%" },
  { icon: star5, left: "45%" },
  { icon: star6, left: "36%" },
  { icon: star7, left: "47%" },
  { icon: star8, left: "40%" },
];

const FunFacts = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [active, setActive] = useState(false);
  const [runId, setRunId] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : REF_HEIGHT
  );
  const startGap = useMemo(() => {
    const scale = Math.min(1.2, Math.max(0.6, REF_HEIGHT / viewportHeight));
    return BASE_GAP * scale;
  }, [viewportHeight]);
  const startBaseScaled = useMemo(() => {
    const scale = Math.min(1.2, Math.max(0.6, REF_HEIGHT / viewportHeight));
    return START_BASE * scale;
  }, [viewportHeight]);
  const minStartScaled = useMemo(() => {
    const scale = Math.min(1.2, Math.max(0.6, REF_HEIGHT / viewportHeight));
    return MIN_START * scale;
  }, [viewportHeight]);
  const hasLeftRef = useRef(true);

  useEffect(() => {
    const onResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const node = titleRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 0) {
          hasLeftRef.current = true; // fully out of view
          setActive(false);
          return;
        }

        if (entry.intersectionRatio >= 0.99 && hasLeftRef.current) {
          setActive(true);
          setRunId((id) => id + 1); // retrigger when fully back in view
          hasLeftRef.current = false;
        }
      },
      { threshold: [0, 0.99] } // watch fully out and almost fully in
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const floatingBadges = useMemo(
    () =>
      floatingBadgesRaw.map((badge, index) => {
        const startOffset = Math.max(minStartScaled, startBaseScaled + index * startGap);
        const endY = startOffset - TRAVEL - 60; // move same distance so gaps stay consistent

        return {
          ...badge,
          size: BADGE_SIZE,
          duration: ANIM_DURATION,
          delay: index * ANIM_DURATION * DELAY_PER_SECOND, // scales with duration
          startOffset,
          endY,
        };
      }),
    [startGap]
  );

  return (
    <section className="fun-facts" ref={sectionRef}>
      <div className="fun-facts__content">
        <div className="fun-facts__left">
          <p className="fun-facts__eyebrow">Fun facts</p>
          <p className="fun-facts__meta">Vaccines, nutrition to training</p>
        </div>

        <div className="fun-facts__center">

          <div
            key={runId} // remount to restart animation on each entry
            className={`fun-facts__floaters ${active ? "is-active" : ""}`}
            aria-hidden="true"
          >
            {floatingBadges.map((badge, index) => (
              <div
                key={index}
                className="fun-facts__badge"
                style={{
                  left: badge.left,
                  width: `${badge.size}px`,
                  height: `${badge.size}px`,
                  animationDuration: `${badge.duration}s`,
                  animationDelay: `${badge.delay}s`,
                  "--start-y": `calc(100% - ${badge.startOffset}px)`,
                  "--end-y": `${badge.endY}px`,
                }}
              >
                <img src={badge.icon} alt="" />
              </div>
            ))}
          </div>

          <h2 className="fun-facts__title" ref={titleRef}>
            <span>YOUR DOG&apos;S</span>
            <span>NOSE PRINT İS</span>
            <span style={{ display: 'flex', alignItems: 'flex-start', gap: '40px' }}>
              <span>UNIQUE</span>
              <div className="fun-facts__store">
          <p className="fun-facts__desc">
            DOSTY APPLICATION FOR IOS AND FOR ANDROID
          </p>
          <div className="fun-facts__actions">
            <StoreButtons />
          </div>
        </div></span>
          </h2>
        </div>

      
      </div>
    </section>
  );
};

export default FunFacts;
