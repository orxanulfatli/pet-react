import React, { useState } from "react";
import "./Companion.css";
import FeatureCard from "./FeatureCard/FeatureCard";
import brandLabel from '../../../../../src/assets/icons/companion/dosty.svg'
import CircularText from "./CircularText/CircularText";
import yellowIcon from '../../../../../src/assets/icons/header-logo.svg'
// import profile from '../../../../../src/assets/icons/companion/'

const Companion = () => {
  const [activeCard, setActiveCard] = useState(0);

  const images = [
    "../../../../../src/assets/icons/companion/profile.png",
    "../../../../../src/assets/icons/companion/ai.png",
    "../../../../../src/assets/icons/companion/weight.png",
    "../../../../../src/assets/icons/companion/sympton.png",
  ];

  const cards = [
    {
      subtitle: "PET PROFILE",
      // Keep line break after "pet," to match Figma layout
      title: "Everything About Your Pet, in One Place",
      text: "From breed info to vaccination records — organize it all in your pet’s personal profile for quick, easy access anytime.",
    },
    {
      subtitle: "AI CHAT",
      title: "Instant answers, tailored for your pet",
      text: "Got a question about symptoms, training, or nutrition? Ask Dost’s AI — get expert-backed guidance in seconds.",
    },
    {
      subtitle: "WEIGHT GRAPH",
      title: (
        <>
          Track health with <br /> every step
        </>
      ),
      text: "Stay on top of your pet’s growth and fitness. Dost’s smart weight tracker helps you spot trends early and keep your buddy in perfect shape.",
    },
    {
      subtitle: "SYMPTOM CHECK",
      title: <>Understand what your <br/> pet can’t say</>,
      text: "Notice unusual behavior or signs of illness? Dost’s Symptom Check helps you assess what might be wrong and guides you on when to see a vet.",
    },
  ];

  return (
    <div className="companion">
      {/* ===== TITLE ===== */}
      <div className="companion-title">
        <div className="companion-title-row">
          {/* <span className="brand-label">dosty</span> */}
          <img
            src={brandLabel}
            // alt="dosty badge"
            className="brand-label"
          />
          <h1 className="title-smart">
            <div className="title-yellow-icon">
              <img
                src={yellowIcon}
                // alt="dosty pet icon"
              />
            </div>
            SMART {/* 2. sol aşağı - sarı icon */}
          </h1>

          {/* 3. sağ ortada - dairəvi badge */}
          {/* <div className="title-circular-badge"></div> */}
          <CircularText
            text=" DOSTY © 2025 © DOSTY © 2025"
            radius={110}
            animate={true} /* <--- Enable animation here */
            center={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="44"
                viewBox="0 0 45 44"
                fill="none"
              >
                <path
                  d="M21.1447 0H0V44H21.1447C33.8125 43.973 44.0729 34.1348 44.0729 22C44.0729 9.86522 33.8125 0.0270175 21.1447 0Z"
                  fill="#FFCC66"
                />
              </svg>
            }
            animateCenter={false}
          />
          {/* <img
            src="/img/circular-badge.png"
            // alt="dosty badge"
          /> */}
        </div>

        <div className="companion-title-row">
          <h1 className="title-companion">COMPANION</h1>
        </div>
      </div>

      {/* ===== CONTENT (CARDS + IMAGE) ===== */}
      <div className="companion-content">
        <div className="cards-left">
          {cards.slice(0, 2).map((card, index) => (
            <FeatureCard
              key={index}
              subtitle={card.subtitle}
              title={card.title}
              text={card.text}
              active={activeCard === index}
              onClick={() => setActiveCard(index)}
            />
          ))}
        </div>

        <div className="phone-wrapper">
          <img src={images[activeCard]} alt="phone" className="phone" />
        </div>

        <div className="cards-right">
          {cards.slice(2, 4).map((card, index) => (
            <FeatureCard
              key={index + 2}
              subtitle={card.subtitle}
              title={card.title}
              text={card.text}
              active={activeCard === index + 2}
              onClick={() => setActiveCard(index + 2)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companion;
