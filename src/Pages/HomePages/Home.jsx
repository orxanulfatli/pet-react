import useQrDropAnimationV2 from "./hooks/useQrDropAnimationV2";
import "./Home.css";
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
import Faq from "./components/Faq/Faq";
import Footer from "../../shared/Footer/Footer";
import QrCode from "./components/QrCode/QrCode";

const Home = () => {
  const { qrRef, qrVariant, showQrTextClass } = useQrDropAnimationV2();

  const qrSlot = (
    <div className="qr" ref={qrRef}>
      <QrCode variant={qrVariant} showTextClass={showQrTextClass} />
    </div>
  );
  return (
    <div className="home">
      <Hero qrElement={qrSlot} />
      <KeepTrack />
      <SmartCare />
      <Stats />
      <Companion />
      <FunFacts />
      <HowItWorks />
      <Experts />
      <AiAssistant />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
