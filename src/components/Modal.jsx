import { useEffect } from "react";

function Modal({ children, isOpen, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-start justify-center pt-15 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-10 w-[45rem] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl hover:text-gray-500"
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
