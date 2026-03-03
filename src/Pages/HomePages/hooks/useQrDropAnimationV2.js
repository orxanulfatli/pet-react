import { useEffect, useRef, useState } from "react";

const useQrDropAnimationV2 = () => {
  const qrRef = useRef(null);
  const variantRef = useRef("yellow");
  const textRef = useRef(false);
  const isPinnedRef = useRef(false);
  const pinnedViewportRef = useRef({ left: 0, top: 0, rotate: -15 });
  const pinnedDocRef = useRef({ left: 0, top: 0, rotate: -15 });
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
      const keepEnd =
        keepTrackEl.offsetTop +
        keepTrackEl.offsetHeight -
        window.innerHeight;
      const approachProgress = clamp(
        keepStart ? (scrollY - 0) / keepStart : 0,
        0,
        1
      );

      const dropY = lerp(0, 220, approachProgress);
      const baseRotation = lerp(15, 0, approachProgress);

      let transform = `translate3d(0px, ${dropY}px, 0) rotate(${baseRotation}deg)`;

      if (scrollY >= keepStart && scrollY <= keepEnd) {
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

        const nextTransform = `translate3d(${left - base.left}px, ${
          top - base.top
        }px, 0) rotate(${rotate}deg)`;
        if (settleProgress >= 1) {
          if (!isPinnedRef.current) {
            isPinnedRef.current = true;
            pinnedViewportRef.current = {
              left: targetX - window.scrollX,
              top: targetY - window.scrollY,
              rotate: -15,
            };
            pinnedDocRef.current = { left: 0, top: 0, rotate: -15 };
          }
          const pinnedLeft =
            pinnedViewportRef.current.left + window.scrollX;
          const pinnedTop =
            pinnedViewportRef.current.top + window.scrollY;
          transform = `translate3d(${pinnedLeft - base.left}px, ${
            pinnedTop - base.top
          }px, 0) rotate(${pinnedViewportRef.current.rotate}deg)`;
        } else {
          isPinnedRef.current = false;
          pinnedViewportRef.current = { left: 0, top: 0, rotate: -15 };
          pinnedDocRef.current = { left: 0, top: 0, rotate: -15 };
          transform = nextTransform;
        }
        if (variantRef.current !== "green") {
          variantRef.current = "green";
          setQrVariant("green");
        }
        if (!textRef.current) {
          textRef.current = true;
          setShowQrTextClass(true);
        }
      } else if (scrollY > keepEnd && isPinnedRef.current) {
        if (!pinnedDocRef.current.left && !pinnedDocRef.current.top) {
          pinnedDocRef.current = {
            left: pinnedViewportRef.current.left + window.scrollX,
            top: pinnedViewportRef.current.top + window.scrollY,
            rotate: pinnedViewportRef.current.rotate,
          };
        }
        transform = `translate3d(${pinnedDocRef.current.left - base.left}px, ${
          pinnedDocRef.current.top - base.top
        }px, 0) rotate(${pinnedDocRef.current.rotate}deg)`;
      } else {
        if (isPinnedRef.current) {
          isPinnedRef.current = false;
          pinnedViewportRef.current = { left: 0, top: 0, rotate: -15 };
          pinnedDocRef.current = { left: 0, top: 0, rotate: -15 };
        }
        if (variantRef.current !== "yellow") {
          variantRef.current = "yellow";
          setQrVariant("yellow");
        }
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

export default useQrDropAnimationV2;
