import { useState, useEffect, useContext } from "react";
import Modal from "./Modal";
import ExpertForm from "./ExpertForm";
import { AuthContext } from "../context/auth.context";
import { XIcon } from "@heroicons/react/solid";

function ExpertAdviceWidget() {
  const { user } = useContext(AuthContext);

  if (user?.role === "admin") return null;

  const [hidden, setHidden] = useState(() => {
    return localStorage.getItem("hideExpertWidget") === "true";
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("hideExpertWidget", hidden);
  }, [hidden]);

  if (hidden) return null;

  return (
    <>
      {/* The little pill */}
      <div className="px-2 fixed bottom-6 right-6 z-50 flex items-center bg-red-600 text-white rounded-full shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 text-sm font-medium cursor-pointer"
        >
          Get expert advice
        </button>
        <button
          onClick={() => setHidden(true)}
          className="p-2"
          aria-label="Close"
        >
          <XIcon className="w-4 h-4 text-white cursor-pointer" />
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
