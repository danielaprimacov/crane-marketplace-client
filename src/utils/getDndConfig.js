import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

export function getDndConfig() {
  if (typeof window === "undefined") {
    return { name: "html5", backend: HTML5Backend };
  }

  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const hasTouchPoints = navigator.maxTouchPoints > 0;
  const isSmallScreen = window.matchMedia("(max-width: 1024px)").matches;

  const shouldUseTouchBackend =
    hasCoarsePointer || (isSmallScreen && hasTouchPoints);

  if (shouldUseTouchBackend) {
    return {
      name: "touch",
      backend: TouchBackend,
      options: {
        enableMouseEvents: true,
        enableTouchEvents: true,
        delayTouchStart: 40,
        touchSlop: 6,
      },
    };
  }

  return { name: "html5", backend: HTML5Backend };
}
