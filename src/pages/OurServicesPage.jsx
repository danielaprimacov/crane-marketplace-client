import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Modal from "../components/Modal";
import ExpertForm from "../components/ExpertForm";

import transportationImg from "../assets/images/crane-gettyimages.jpg";
import saleCrane from "../assets/images/crane-sale.webp";
import installCrane from "../assets/images/install-crane.png";

function OurServicesPage() {
  const { hash } = useLocation();
  const [isAdviceOpen, setAdviceOpen] = useState(false);

  useEffect(() => {
    if (hash) {
      // remove leading “#”
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <>
      <div className="mt-10 flex flex-col">
        <div id="transportation" className="h-screen pt-10 flex flex-col">
          <h2 className="text-4xl font-bold mb-13 text-center tracking-widest">
            Transportation
          </h2>
          <div className="flex justfiy-evenly px-20 w-full">
            <img src={transportationImg} alt="Crane" className="w-180" />
            <div className="mt-10 text-center px-5">
              <p className="text-xl">
                KranHub Transportation handles all logistics for crane delivery:
                we arrange specialized carriers, route permits, and door-to-door
                delivery to your site.
              </p>
              <p className="my-10 text-red-600 text-lg">
                KranHub Transportation takes the headache out of moving heavy
                cranes.
              </p>
              <p className="text-xl">
                Track your shipment in real time, receive proactive alerts if
                anything changes, and rely on our fully insured, door-to-door
                service. Ready to simplify your next crane move?{" "}
              </p>
              <p className="my-10 text-red-400">
                Get a quote today and see how effortless heavy-haul can be.
              </p>
              <button
                className="bg-blue-400 text-white rounded-lg w-64 h-10 cursor-pointer hover:bg-blue-500 transition duration-300"
                onClick={() => setAdviceOpen(true)}
              >
                Get Expert Advice
              </button>
            </div>
          </div>
        </div>

        <div id="sale-rent" className="h-screen mt-10 flex flex-col">
          <h2 className="text-4xl font-bold mb-13 text-center tracking-widest">
            Sale / Rent
          </h2>
          <div className="flex justfiy-evenly px-20 w-full">
            <div className="mt-10 text-center px-5">
              <p className="text-xl">
                Browse our curated marketplace of top-quality cranes—available
                to purchase outright or rent on flexible terms (hourly, daily,
                weekly or monthly). Whether you’re looking to own your equipment
                long-term or need a crane on-site just for a specific project,
                KranHub has you covered.
              </p>
              <p className="my-5 text-red-600 text-lg">
                Discover the perfect crane for your project
              </p>
              <p className="text-xl">
                Every listing includes full specs, high-resolution photos,
                verified seller ratings, and transparent pricing. Rentals come
                with comprehensive insurance and on-site support; purchases
                include our quality guarantee.
              </p>
              <p className="mt-10 text-red-400">
                Ready to find the perfect crane solution?
              </p>
              <p className="mb-10 text-green-600">
                Explore our Sale &amp; Rent catalog or get personalized advice
                to match you with the ideal machine—fast and hassle-free.
              </p>
              <button
                className="bg-blue-400 text-white rounded-lg w-64 h-10 cursor-pointer hover:bg-blue-500 transition duration-300"
                onClick={() => setAdviceOpen(true)}
              >
                Get Expert Advice
              </button>
            </div>
            <img src={saleCrane} alt="Crane" className="w-180" />
          </div>
        </div>

        <div
          id="installation-disassembly"
          className="h-screen pt-10 flex flex-col"
        >
          <h2 className="text-4xl font-bold mb-13 text-center tracking-widest">
            Installation / Disassembly
          </h2>
          <div className="flex justfiy-evenly px-20 w-full">
            <img src={installCrane} alt="Crane" className="w-180" />
            <div className="mt-10 text-center px-5">
              <p className="text-xl">
                KranHub’s Installation & Disassembly service dispatches
                certified rigging crews and specialized machinery to your
                site—handling everything from precise assembly to safe teardown.
              </p>
              <p className="my-10 text-red-600 text-lg">
                Leave the heavy lifting to us.
              </p>
              <p className="text-md">
                We plan every lift with 3D modeling, follow all industry safety
                standards, and coordinate permits so you don’t have to.
              </p>
              <p>
                Once your project is complete, we efficiently dismantle and pack
                your crane for transport or storage.
              </p>
              <p className="my-10 text-red-400">
                Simplify your next job: request a free site survey today and let
                our experts handle the rest.
              </p>
              <button
                className="bg-blue-400 text-white rounded-lg w-64 h-10 cursor-pointer hover:bg-blue-500 transition duration-300"
                onClick={() => setAdviceOpen(true)}
              >
                Get Expert Advice
              </button>
            </div>
          </div>
        </div>

        {/* etc. */}
      </div>

      <Modal isOpen={isAdviceOpen} onClose={() => setAdviceOpen(false)}>
        <ExpertForm onClose={() => setAdviceOpen(false)} />
      </Modal>
    </>
  );
}

export default OurServicesPage;
