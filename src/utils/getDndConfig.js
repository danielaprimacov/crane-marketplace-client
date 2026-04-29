import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

export function getDndConfig() {
  if (typeof window === "undefined") {
    return { backend: HTML5Backend };
  }

  const isTouchDevice =
    window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    return {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
    };
  }

  return { backend: HTML5Backend };
}
