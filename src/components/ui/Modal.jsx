import { useEffect } from "react";

function Modal({
  children,
  isOpen,
  onClose,
  widthClass = "w-full max-w-3xl",
  panelClass = "",
  contentClass = "p-4 sm:p-6 lg:p-8",
}) {
  // lock scroll when open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        // blur whichever element was focused (so you don’t end up with that little outline)
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`max-h-[90vh] w-full bg-white rounded-2xl relative ${widthClass} ${panelClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute h-10 w-10 top-3 right-3 z-10 text-2xl hover:text-gray-500 focus:outline-none focus:ring-0 sm:top-4 sm:right-4"
        >
          &times;
        </button>

        <div className={`max-h-[90vh] overflow-y-auto ${contentClass}`}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
