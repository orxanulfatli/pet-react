import ContentContainer from "../ContentContainer/ContentContainer";
import "./Footer.css";

import appleIcon from "../../assets/icons/apple.png";
import playIcon from "../../assets/icons/android.png";
import qrImage from "../../assets/icons/footer/QR.png";
import titleDog from "../../assets/icons/footer/title-dog.svg";
import bone from "../../assets/icons/footer/bone.svg";
import boneTwo from "../../assets/icons/footer/bone-2.svg";
import bones from "../../assets/icons/footer/bones.svg";
import cat from "../../assets/icons/footer/cat.svg";
import dog from "../../assets/icons/footer/dog.svg";
import fish from "../../assets/icons/footer/fish.svg";
import mickey from "../../assets/icons/footer/mickey.svg";
import natureFeather from "../../assets/icons/footer/nature-feather.svg";
import paw from "../../assets/icons/footer/paw.svg";
import StoreButtons from "../../Pages/HomePages/components/Hero/StoreButtons";
import { useRef } from "react";
import useFooterPhysicsAlt from "../hooks/useFooterPhysicsAlt";
import useFooterPhysics from './../hooks/useFooterPhysics';

const footerIcons = [
  { src: bone, alt: "bone icon" },
  { src: boneTwo, alt: "double bone icon" },
  { src: bones, alt: "bones icon" },
  { src: cat, alt: "cat icon" },
  { src: dog, alt: "dog icon" },
  { src: fish, alt: "fish icon" },
  { src: mickey, alt: "mouse icon" },
  { src: natureFeather, alt: "feather icon" },
  { src: paw, alt: "paw icon" },
];

const patternIcons = Array.from({ length: 144 }, (_, index) => {
  const item = footerIcons[index % footerIcons.length];
  return { ...item, key: `${item.alt}-${index}` };
});

const Footer = () => {
  const sectionRef = useRef(null);
  const objectContainerRef = useRef(null);

  // useFooterPhysicsAlt(sectionRef, objectContainerRef);
  useFooterPhysics(sectionRef, objectContainerRef);
  return (
    <section className="footer" ref={sectionRef}>
      <ContentContainer className="footer-container">
        <div className="footer-hero">
          <div className="footer-heading">
            <p className="footer-kicker">SMART CARE MADE SIMPLE</p>

            <div className="footer-title">
              <div className="footer-title-row">
                <span className="footer-title-text">LET'S DOWNLOAD</span>
              </div>

              <div className="footer-title-row footer-title-bottom">
                <span className="footer-title-dog">
                  <img src={titleDog} alt="Dosty dog" />
                </span>
                <span className="footer-title-text">DOSTY APP</span>
                <div className="footer-store-actions">
                  <StoreButtons />
                </div>

          
              </div>
            </div>
          </div>

     
        </div>
      </ContentContainer>
      
      {/*object container and objects*/ }
      <div className="object-container" ref={objectContainerRef}>
        {patternIcons.map((icon) => (
          <img className="object" src={icon.src} alt={icon.alt} key={icon.key} />
        ))}
      </div>

      {/* <ContentContainer className="footer-meta">
        <div className="footer-meta-block">
          <span>(c) 2021-2025 DOSTY</span>
          <span>ALL RIGHTS RESERVED</span>
          <span>DESIGN BY HEATS</span>
        </div>
        <div className="footer-meta-block">
          <span>BAKU, AZERBAIJAN</span>
          <span>S.RAHMOV STR 188</span>
        </div>
        <div className="footer-meta-block">
          <span>SUPPORT@DOSTY.CO</span>
          <span>PRIVACY POLICY</span>
          <span>TERM OF USE</span>
        </div>
        <div className="footer-meta-block footer-meta-links">
          <span>TIKTOK</span>
          <span>INSTAGRAM</span>
          <span>LINKEDIN, YOUTUBE</span>
        </div>
      </ContentContainer> */}
    </section>
  );
};

export default Footer;
