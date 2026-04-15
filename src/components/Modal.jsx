import { useEffect } from "react";

function Modal({
  children,
  isOpen,
  onClose,
  widthClass = "w-[45rem] max-w-full",
  panelClass = "",
  contentClass = "p-10",
}) {
  // lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
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
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl relative ${widthClass} ${panelClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-2xl hover:text-gray-500 focus:outline-none focus:ring-0"
        >
          &times;
        </button>

        <div className={contentClass}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
