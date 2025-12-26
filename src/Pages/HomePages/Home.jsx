import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Hero from "./components/Hero/Hero";
import KeepTrack from "./components/KeepTrack/KeepTrack";
import SmartCare from "./components/SmartCare/SmartCare";
import Experts from "./components/Experts/Experts";
import Stats from "./components/Stats/Stats";
import Companion from "./components/Companion/Companion";
import FunFacts from "./components/FunFacts/FunFacts";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import AiAssistant from "./components/AiAssistant/AiAssistant";
import Testimonials from "./components/Testimonials/Testimonials";

const Home = () => {
  // useEffect(() => {
  //   const lenis = new Lenis({
  //     smooth: true,
  //     lerp: 0.07,
  //   });

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);

  //   return () => lenis.destroy();
  // }, []);
  return (
    <div className="home">
      <Hero />
      <KeepTrack />
      <SmartCare />
      <Stats />
      <Companion />
      <FunFacts />
      <HowItWorks />
      <Experts />
      <AiAssistant />
      <Testimonials/>

    </div>
  );
};

export default Home;
