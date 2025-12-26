import "./KeepTrack.css";

import greenPet from "../../../../../src/assets/icons/keeptrack/greenpet.png";
import dog from "../../../../../src/assets/icons/keeptrack/dog.png";
import whitePet from "../../../../../src/assets/icons/keeptrack/whitepet.png";
import { useRef } from "react";
import { useEffect } from "react";
import QrCode from "./QrCode/QrCode";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Lenis from '@studio-freight/lenis'



const KeepTrack = () => {
  // const sectionRef = useRef(null);
  // const trackRef = useRef(null);

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     smooth: true,
  //     lerp: 0.1, // smooth amma kontrol altinda
  //   });

  //   let currentX = 0;
  //   let targetX = 0;
  //   let isScrolling = false;

  //   lenis.on("scroll", () => {
  //     isScrolling = true;
  //   });

  //   // bu listener real scroll Y koordinatini verir
  //   function updatePosition() {
  //     const scrollY = window.scrollY;
  //     const section = sectionRef.current;
  //     const track = trackRef.current;

  //     const top = section.offsetTop;
  //     const height = section.offsetHeight - window.innerHeight;

  //     // 0-1 progress
  //     let p = (scrollY - top) / height;
  //     p = Math.min(1, Math.max(0, p));

  //     // horizontal target move
  //     // const maxX = track.scrollWidth - window.innerWidth;
  //     const maxX = (track.scrollWidth - window.innerWidth) * 0.7;
  //     targetX = -p * maxX;

  //     // ƏSAS HƏLL → əgər scroll dayanıbsa EASING EDİLMİR
  //     if (isScrolling) {
  //       currentX += (targetX - currentX) * 0.7; // smooth easing
  //     } else {
  //       currentX = targetX; // jitter YOX
  //     }

  //     track.style.transform = `translate3d(${currentX}px, 0, 0)`;

  //     // scroll dayanma detection → 100–150 ms
  //     clearTimeout(window._scrollStopTimer);
  //     window._scrollStopTimer = setTimeout(() => {
  //       isScrolling = false;
  //     }, 120);

  //     requestAnimationFrame(updatePosition);
  //   }

  //   requestAnimationFrame(updatePosition);

  //   return () => lenis.destroy();
  // }, []);
   
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    });
 gsap.registerPlugin(ScrollTrigger);
    let currentX = 0;
    let targetX = 0;

    function resizeSectionHeight() {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) return;

      const scrollWidth = track.scrollWidth;
      console.log("scrollWidth:", scrollWidth);
      const viewportWidth = window.innerWidth;

      const extraScroll = scrollWidth - viewportWidth + 60; //+60 for extra whidth

      section.style.height = `${window.innerHeight + extraScroll}px`;
      // ScrollTrigger.refresh()
    }

    resizeSectionHeight();
    window.addEventListener("resize", resizeSectionHeight);

    function animate() {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) {
        requestAnimationFrame(animate);
        return;
      }

      const scrollY = window.scrollY;
      const top = section.offsetTop;
      const h = section.offsetHeight - window.innerHeight;

      let progress = (scrollY - top) / h;
      progress = Math.min(1, Math.max(0, progress));

      const maxX = track.scrollWidth - window.innerWidth + 15;
      targetX = -progress * maxX;

      currentX += (targetX - currentX) * 0.12;

      track.style.transform = `translate3d(${currentX}px,0,0)`;

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
    /* -----------------------------
     QR scroll kompensasiyası
  ------------------------------*/
    // function updateQrPosition() {
    //   const y = window.scrollY;
    //   qrRef.current.style.transform = `translateY(${y}px)`;
    // }

    // window.addEventListener("scroll", updateQrPosition);

    return () => {
      lenis.destroy()
      // window.removeEventListener("scroll", updateQrPosition)
    };
  }, []);

  return (
    <div className="keep-track" ref={sectionRef}>
      {/* keeptrack-sticky need for horizantal scroll */}

      <div className="keeptrack-sticky">
        <QrCode />

        <div className="keep-track-scroll" ref={trackRef}>
          <div>Keep track of</div>
          <img src={greenPet} alt="" />
          <img src={dog} alt="" />
          <div>your pet’s health </div>
          <img src={whitePet} alt="" />
          <div>records, meal plans</div>
        </div>
        <p className="keep-track-text">
          Keep your furry friend healthy and happy with one smart app. Track
          vaccines, plan meals, get expert tips.
        </p>
      </div>
    </div>
  );
};

export default KeepTrack;
