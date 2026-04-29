import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

export function getDndConfig() {
  if (typeof window === "undefined") {
    return { backend: HTML5Backend };
  }

  const isRealTouchDevice = window.matchMedia(
    "(hover: none) and (pointer: coarse)"
  ).matches;

  if (isRealTouchDevice) {
    return {
      backend: TouchBackend,
      options: {
        enableMouseEvents: true,
        delayTouchStart: 180,
        touchSlop: 8,
      },
    };
  }

  return { backend: HTML5Backend };
}
