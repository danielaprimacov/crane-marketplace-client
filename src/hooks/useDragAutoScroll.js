import { useEffect, useRef } from "react";
import { useDragLayer } from "react-dnd";

const EDGE_SIZE = 70;
const SCROLL_SPEED = 14;

function useDragAutoScroll(scrollContainerRef) {
  const pointerRef = useRef(null);
  const frameRef = useRef(null);

  const { isDragging, clientOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    clientOffset: monitor.getClientOffset(),
  }));

  useEffect(() => {
    pointerRef.current = clientOffset;
  }, [clientOffset]);

  useEffect(() => {
    if (!isDragging) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    const tick = () => {
      const pointer = pointerRef.current;
      const container = scrollContainerRef.current;

      if (!pointer || !container) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      let scrollX = 0;
      let scrollY = 0;

      if (pointer.x < EDGE_SIZE) {
        scrollX = -SCROLL_SPEED;
      } else if (window.innerWidth - pointer.x < EDGE_SIZE) {
        scrollX = SCROLL_SPEED;
      }

      if (pointer.y < EDGE_SIZE) {
        scrollY = -SCROLL_SPEED;
      } else if (window.innerHeight - pointer.y < EDGE_SIZE) {
        scrollY = SCROLL_SPEED;
      }

      if (scrollX !== 0) {
        container.scrollLeft += scrollX;
      }

      if (scrollY !== 0) {
        window.scrollBy(0, scrollY);
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isDragging, scrollContainerRef]);
}

export default useDragAutoScroll;
