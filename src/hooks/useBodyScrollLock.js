import { useEffect } from "react";

export default function useBodyScrollLock(locked) {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";

    return () => {
      document.body.style.overflow - "";
    };
  }, [locked]);
}
