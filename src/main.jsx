import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// LENIS INIT (v1)
const lenis = new Lenis({
  duration: 1.2,
  smooth: true,
  lerp: 0.1,
});

// RAF LOOP (v1)
function raf(time) {
  lenis.raf(time); // Lenis frame update
  ScrollTrigger.update(); // GSAP sync
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// SCROLLER PROXY (v1 CORRECT)
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scrollTo(value);
    } else {
      return lenis.scroll;
    }
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

// MUST — IN LENIS v1, REFRESH EVENT WORKS WITHOUT update()
ScrollTrigger.addEventListener("refresh", () => {
  // NOTHING HERE — no lenis.update()
});

// FORCE REFRESH
setTimeout(() => {
  ScrollTrigger.refresh();
}, 300);

createRoot(document.getElementById('root')).render(
    <App />
,
)
