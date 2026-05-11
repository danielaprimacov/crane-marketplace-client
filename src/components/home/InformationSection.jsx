import { useState } from "react";

import Modal from "../ui/Modal";
import ContactForm from "../forms/contact/ContactForm";

import teamPhoto from "../../assets/images/team.jpg";

const INFORMATION_TEXT =
  "KranHub is the premier B2B marketplace for crane solutions—offering a curated fleet of tower, mobile, and crawler cranes for sale or rent. Our full-service company manages every step of the process—from precision assembly and secure transport to safe disassembly, so your project stays on schedule and within budget. Backed by certified technicians, transparent pricing, and 24/7 support, KranHub delivers reliable heavy-lifting expertise you can trust.";

function InformationSection() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <section className="m-2 px-4 py-6 sm:p-5 lg:px-8">
        <div className="mt-4 grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(280px,420px)_1fr] lg:gap-10">
          <img
            src={teamPhoto}
            alt="Team Members"
            loading="lazy"
            className="h-[18rem] w-full rounded-md shadow-sm object-cover sm:h-[22rem] lg:h-[25rem]"
          />
          <div className="flex flex-col justify-center items-center gap-5 text-center">
            <p className="text-base leading-7 text-black/70 sm:text-lg lg:text-xl">
              {INFORMATION_TEXT}
            </p>
            <p className="text-lg text-red-700 sm:text-xl">
              Ready to discuss your next project?
            </p>
            <button
              type="button"
              onClick={openModal}
              className="px-8 py-4 mt-2 bg-black text-white cursor-pointer rounded-lg transition duration-300 ease-out hover:bg-red-700"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        widthClass="w-[92vw] max-w-[38rem]"
        panelClass="max-h-[92dvh] overflow-y-auto"
        contentClass="p-0"
      >
        <ContactForm onClose={closeModal} />
      </Modal>
    </>
  );
}

export default InformationSection;
