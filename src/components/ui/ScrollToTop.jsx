import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function isProducerRoute(pathname) {
  return pathname.startsWith("/cranes/producers/");
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const previousPathname = previousPathnameRef.current;

    const isProducerToProducer =
      isProducerRoute(previousPathname) && isProducerRoute(pathname);

    if (hash) {
      previousPathnameRef.current = pathname;
      return;
    }

    if (!isProducerToProducer) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    previousPathnameRef.current = pathname;
  }, [pathname, hash]);

  return null;
}
