import { useState, useEffect, useContext } from "react";
import Modal from "./Modal";
import ExpertForm from "./ExpertForm";
import { AuthContext } from "../context/auth.context";
import { XIcon } from "@heroicons/react/solid";

function ExpertAdviceWidget() {
  const { user } = useContext(AuthContext);

  if (user?.role === "admin") return null;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* The little pill */}
      <div className="px-2 fixed bottom-10 left-5 z-50 flex items-center bg-red-600/40 text-white rounded-full shadow-lg hover:bg-red-600 transitions duration-300">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 text-sm font-medium cursor-pointer"
        >
          Get expert advice
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
