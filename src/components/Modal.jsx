import { useEffect } from "react";

function Modal({ children, onClose }) {
  // close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose;
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
