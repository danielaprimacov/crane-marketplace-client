import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function isProducerRoute(pathname) {
  return pathname.startsWith("/cranes/producers/");
}

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const previousPathname = previousPathnameRef.current;

    const isProducerToProducer =
      isProducerRoute(previousPathname) && isProducerRoute(pathname);

    if (!isProducerToProducer) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    previousPathnameRef.current = pathname;
  }, [pathname]);

  return null;
}
