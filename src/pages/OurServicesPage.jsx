import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import transportationImg from "../assets/images/crane-gettyimages.jpg";
import saleCrane from "../assets/images/crane-sale.webp";
import installCrane from "../assets/images/install-crane.png";

const SERVICE_DATA = {
  transportation: {
    title: "Transportation",
    description: `
      KranHub Transportation handles all logistics for crane delivery:
      we arrange specialized carriers, route permits,
      and door-to-door delivery to your site.
    `,
  },
  sale: {
    title: "Sale",
    description: `
      Through KranHub Sales you can list your crane or browse current
      sales offers — all transactions are managed by our platform.
    `,
  },
  "installation-disassembly": {
    title: "Installation & Disassembly",
    description: `
      We coordinate professional teams to install, dismantle, and move
      your crane safely, following all regulations.
    `,
  },
};

function OurServicesPage() {
  const { hash } = useLocation();

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
            <button className="bg-blue-400 text-white rounded-lg w-64 h-10 cursor-pointer hover:bg-blue-500 transition duration-300">
              Get Expert Advice
            </button>
          </div>
        </div>
      </div>

      <div id="sale" className="h-screen mt-10 flex flex-col">
        <h2 className="text-4xl font-bold mb-13 text-center tracking-widest">
          Sale
        </h2>
        <div className="flex justfiy-evenly px-20 w-full">
          <div className="mt-10 text-center px-5">
            <p className="text-xl">
              Browse a curated marketplace of top‐quality cranes at competitive
              prices—whether you need to buy outright or explore flexible
              financing options.
            </p>
            <p className="my-10 text-red-600 text-lg">
              Discover the perfect crane for your project
            </p>
            <p className="text-xl">
              Every listing includes detailed specs, high-resolution photos, and
              verified seller ratings. Our team vets each machine for
              performance and safety, so you can buy with confidence.
            </p>
            <p className="mt-10 text-red-400">Ready to find your next crane?</p>
            <p className="mb-5 text-green-600">
              Start shopping now and secure your ideal equipment in just a few
              clicks.
            </p>
            <button className="bg-blue-400 text-white rounded-lg w-64 h-10 cursor-pointer hover:bg-blue-500 transition duration-300">
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
              KranHub’s Installation & Disassembly service dispatches certified
              rigging crews and specialized machinery to your site—handling
              everything from precise assembly to safe teardown.
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
            <button className="bg-blue-400 text-white rounded-lg w-64 h-10 cursor-pointer hover:bg-blue-500 transition duration-300">
              Get Expert Advice
            </button>
          </div>
        </div>
      </div>

      {/* etc. */}
    </div>
  );
}

export default OurServicesPage;
