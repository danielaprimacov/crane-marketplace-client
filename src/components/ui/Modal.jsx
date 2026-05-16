import { useEffect, useRef } from "react";

function Modal({
  children,
  isOpen,
  onClose,
  widthClass = "w-full max-w-3xl",
  panelClass = "",
  contentClass = "p-4 sm:p-6 lg:p-8",
  closeOnOverlayClick = true,
  ariaLabel = "Dialog",
}) {
  const panelRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  // lock scroll when open
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElementRef.current = document.activeElement;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.setTimeout(() => {
      panelRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
    };

    if (
      previouslyFocusedElementRef.current instanceof HTMLElement &&
      document.body.contains(previouslyFocusedElementRef.current)
    ) {
      previouslyFocusedElementRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (!closeOnOverlayClick) return;

    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4 sm:p-6"
      onClick={handleOverlayClick}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={`max-h-[90vh] w-full bg-white rounded-2xl relative ${widthClass} ${panelClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute h-10 w-10 top-3 right-3 z-[100] text-2xl hover:text-gray-500 focus:outline-none focus:ring-0 sm:top-4 sm:right-4"
        >
          &times;
        </button>

        <div className={`max-h-[90vh] overflow-y-auto ${contentClass}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
