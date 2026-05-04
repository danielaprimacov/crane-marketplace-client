import { useState, useContext } from "react";

import Modal from "../ui/Modal";
import ExpertForm from "../forms/contact/ExpertForm";
import { AuthContext } from "../../context/auth.context";

function ExpertAdviceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  if (user?.role === "admin") return null;

  return (
    <>
      {/* The little pill */}
      <div className="fixed bottom-4 right-4 z-30 sm:bottom-6 sm:right-5 sm:left-auto lg:bottom-8">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex min-h-11 max-w-[calc(100vw-2rem)] items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
        >
          <span className="sm:hidden">Expert advice</span>
          <span className="hidden sm:inline">Get expert advice</span>
        </button>
      </div>

      {/* The modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ExpertForm onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}

export default ExpertAdviceWidget;
