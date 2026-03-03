import { useEffect, useRef, useState } from "react";

const useQrDropAnimation = () => {
  const qrRef = useRef(null);
  const variantRef = useRef("yellow");
  const textRef = useRef(false);
  const [qrVariant, setQrVariant] = useState("yellow");
  const [showQrTextClass, setShowQrTextClass] = useState(false);

  useEffect(() => {
    const qrEl = qrRef.current;
    const keepTrackEl = document.querySelector(".keep-track");
    const keepTrackScroll = document.querySelector(".keep-track-scroll");
    if (!qrEl || !keepTrackEl || !keepTrackScroll) return;

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    const lerp = (a, b, t) => a + (b - a) * t;

    const initialRect = qrEl.getBoundingClientRect();
    const base = {
      left: initialRect.left + window.scrollX,
      top: initialRect.top + window.scrollY,
      width: initialRect.width,
      height: initialRect.height,
    };

    const update = () => {
      const scrollY = window.scrollY;
      const liveRect = qrEl.getBoundingClientRect();
      const live = {
        left: liveRect.left + window.scrollX,
        top: liveRect.top + window.scrollY,
        width: liveRect.width,
        height: liveRect.height,
      };
      // Trigger before KeepTrack starts (~40% viewport ahead)
      const keepStart = keepTrackEl.offsetTop - window.innerHeight * 0.4;
      const approachProgress = clamp(
        keepStart ? (scrollY - 0) / keepStart : 0,
        0,
        1
      );

      const dropY = lerp(0, 220, approachProgress);
      const baseRotation = lerp(15, 0, approachProgress);

      let transform = `translate3d(0px, ${dropY}px, 0) rotate(${baseRotation}deg)`;

      if (scrollY >= keepStart) {
        const keepRect = keepTrackScroll.getBoundingClientRect();
        const targetX =
          keepRect.left +
          window.scrollX +
          keepRect.width / 2 -
          live.width / 2;
        const targetY =
          keepRect.top + window.scrollY - live.height + 25;

        const settleProgress = clamp(
          (scrollY - keepStart) / (window.innerHeight * 0.4),
          0,
          1
        );

        const left = lerp(base.left, targetX, settleProgress);
        const top = lerp(base.top + dropY, targetY, settleProgress);
        const rotate = lerp(baseRotation, -15, settleProgress);

        transform = `translate3d(${left - base.left}px, ${
          top - base.top
        }px, 0) rotate(${rotate}deg)`;
        if (variantRef.current !== "green") {
          variantRef.current = "green";
          setQrVariant("green");
        }
        if (!textRef.current) {
          textRef.current = true;
          setShowQrTextClass(true);
        }
      } else if (variantRef.current !== "yellow") {
        variantRef.current = "yellow";
        setQrVariant("yellow");
        if (textRef.current) {
          textRef.current = false;
          setShowQrTextClass(false);
        }
      }

      qrEl.style.transform = transform;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { qrRef, qrVariant, showQrTextClass };
};

export default useQrDropAnimation;
