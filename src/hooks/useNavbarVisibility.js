import { useEffect, useRef, useState } from "react";

export default function useNavbarVisibility(isHome) {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const heroBottom = window.innerHeight; // height of the hero on home

      // on home: always show while over hero
      if (isHome && currentY <= heroBottom) {
        setShowNavbar(true);
      } else {
        // otherwise (either scrolled past hero on home, or any scroll on other pages)
        if (currentY > lastScrollY.current) {
          // scrolled down
          setShowNavbar(false);
        } else {
          // scrolled up
          setShowNavbar(true);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return showNavbar;
}
