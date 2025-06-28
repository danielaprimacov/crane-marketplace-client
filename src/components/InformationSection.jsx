import { Link } from "react-router-dom";

import teamPhoto from "../assets/images/team.jpg";

function InformationSection() {
  return (
    <div className="p-5 m-2">
      <div className="px-6 mt-4 flex justify-between items-center gap-10">
        <img
          src={teamPhoto}
          alt="Team Members"
          className="h-[25rem] rounded-md shadow-sm"
        />
        <section className="px-5 flex flex-col justify-center items-center gap-4 text-center">
          <p className="text-xl text-black/70">
            KranHub is the premier B2B marketplace for crane solutions—offering
            a curated fleet of tower, mobile, and crawler cranes for sale or
            rent. Our full-service company manages every step of the
            process—from precision assembly and secure transport to safe
            disassembly your project stays on schedule and within budget. Backed
            by certified technicians, transparent pricing, and 24/7 support,
            KranHub delivers reliable heavy-lifting expertise you can trust.{" "}
            <p className="mt-2 text-red-700">
              Ready to discuss your next project?
            </p>
          </p>
          <Link
            to=""
            className="px-8 py-4 mt-5 bg-black text-white rounded-lg hover:bg-red-700 transform transition duration-300 ease-out"
          >
            <button className="cursor-pointer">Contact Us</button>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default InformationSection;
