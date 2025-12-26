import React, { useRef } from 'react'
import LocomotiveScroll from "locomotive-scroll";

const ScrollLayout = ({children}) => {
     const containerRef = useRef(null);
    const locoRef = useRef(null);
    
  useEffect(() => {
    locoRef.current = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      multiplier: 1, // sürət
    });

    return () => {
      if (locoRef.current) {
        locoRef.current.destroy();
      }
    };
  }, []);
  return (
    <div ref={containerRef} data-scroll-container>
   {children}
    </div>
  );
}

export default ScrollLayout