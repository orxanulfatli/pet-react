import "./Hero.css";

import { motion } from "framer-motion";
import herovideo from "../../../../../src/assets/hero/converted-5.mp4"
import apple from "../../../../../src/assets/icons/apple.png"
import android from "../../../../../src/assets/icons/android.png";
import StoreButtons from "./StoreButtons";
import Header from "../../../../shared/Header/Header";
import qr from "../../../../../src/assets/icons/hero/qr1.png";




export default function Hero() {
  //data-scroll-section lokomotiv scrol-a aiddir
  return (
    <div className="hero">
      {/* Background Video */}
      <video className="hero-video" autoPlay loop playsInline muted>
        <source src={herovideo} />
      </video>

      {/* Overlay (optional) */}
      {/* <div className="hero-overlay"></div> */}

      <Header />
      {/* Content */}
      <div className="hero-content">
        {/* Left */}
        <div className="hero-left">
          <div className="hero-title">
            <div className=" line line-1">
              <img
                src="../../../../../src/assets/icons/hero/greeenPet.png"
                className="hero-logo"
                alt="Logo"
              />
              <div className="line-text">everything</div>
            </div>

            <div className=" line line-2">
              <div className="line-2-text"> your pet</div>
              <div className="hero-tag">
                <div class="hero-tag-number">#1</div>
                <div class="hero-tag-text">DOG, CAT AND ETC.</div>
              </div>
            </div>
            <div className="line-3">
              {/* <div className="qr-wrapper">
                <div className="qr-icon-wrapper">
                  <img src={qr} className="qr-img" alt="#" />
                </div>

                <p className="qr-text">
                  Scan to Download
                  <br /> NOW Dosty App
                </p>
              </div> */}
              <div className="qr">
                <img src={qr} alt="#" />
              </div>
              <div className=" line line-3-text"> needs</div>
            </div>
          </div>
        </div>
        {/* <div class="hero-left">
          <div class="hero-title-block">
            <img
              src="/images/icon-dog.png"
              class="hero-title-icon"
              alt="icon"
            />

            <div class="title-lines">
              <div class="line line-1">EVERYTHING</div>

              <div class="line-2-group">
                <div class="line line-2">YOUR PET</div>

                <div class="hero-tag">
                  <div class="tag-number">#1</div>
                  <div class="tag-text">DOG, CAT AND ETC.</div>
                </div>
              </div>

              <div class="line line-3">NEEDS</div>
            </div>
          </div>

          <div class="qr-wrapper">
            <img src="/images/qr.png" class="qr-img" />
            <p class="qr-text">
              Scan to Download <br />
              NOW Dosty App
            </p>
          </div>
        </div> */}

        {/* Right */}
        <div className="hero-right">
          <p className="hero-desc">
            Keep your furry friend healthy and happy with one smart app. Track
            vaccines, plan meals, get expert tips, and enjoy.
          </p>

          <StoreButtons />
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="scroll-indicator">
        <img src="/icons/scroll.png" alt="scroll" />
        <p>Scroll to discover</p>
      </div> */}
    </div>
  );
}
