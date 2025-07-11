import { Link } from "react-router-dom";

import heroImage from "../assets/images/crane-gettyimages.jpg";
import buySellImage from "../assets/images/crane-sale.webp";
import rentImage from "../assets/images/install-crane.png";
import transportImage from "../assets/images/transport.jpeg";
import teamImage from "../assets/images/team.jpg";

function AboutPage({ openSignup }) {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-center px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-white font-bold uppercase mb-4">
            About KranHub
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto">
            The one-stop managed marketplace for buying, selling, renting,
            transporting, installing and dismantling construction cranes—trusted
            by crane owners and contractors alike.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        <img
          src={teamImage}
          alt="Our Team"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-semibold uppercase">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At KranHub, we believe access to heavy lifting equipment should be
            as easy as booking a ride. Whether you’re a crane owner looking to
            monetize your fleet or a contractor in need of specialized
            machinery, our mission is to connect you seamlessly—backed by
            premium service, transparent pricing, and expert coordination every
            step of the way.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From local rentals to international transport, from sale to safe
            disassembly—KranHub handles the logistics so you can focus on the
            build.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-semibold uppercase">Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
              <img
                src={buySellImage}
                alt="Buy &amp; Sell"
                className="h-40 w-full object-cover rounded mb-4"
              />
              <h3 className="text-xl font-medium mb-2">Buy &amp; Sell</h3>
              <p className="text-gray-600">
                Browse and list tower, mobile, and crawler cranes. Every listing
                is verified for safety and performance with detailed specs and
                photos.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
              <img
                src={rentImage}
                alt="Rent &amp; Lease"
                className="h-40 w-full object-cover rounded mb-4"
              />
              <h3 className="text-xl font-medium mb-2">Rent &amp; Lease</h3>
              <p className="text-gray-600">
                Flexible hourly, daily, weekly, or monthly rental plans—complete
                with insurance, on-site support, and routine maintenance.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
              <img
                src={transportImage}
                alt="Transport &amp; Services"
                className="h-40 w-full object-cover rounded mb-4"
              />
              <h3 className="text-xl font-medium mb-2">
                Transport &amp; Services
              </h3>
              <p className="text-gray-600">
                Full-service logistics: specialized carriers, permits, assembly,
                disassembly—door-to-door delivery and turnkey project support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 space-y-6">
        <h2 className="text-3xl font-semibold uppercase text-center">
          Why Choose Us
        </h2>
        <ul className="max-w-3xl mx-auto space-y-4 list-disc list-inside text-gray-700">
          <li>Managed marketplace with expert admin coordination</li>
          <li>Verified listings & transparent pricing</li>
          <li>Flexible rentals & hassle-free purchases</li>
          <li>End-to-end logistics (transport, installation, dismantling)</li>
          <li>24/7 support and proactive shipment tracking</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="bg-red-600 py-16">
        <div className="text-center text-white space-y-6 px-4">
          <h2 className="text-4xl font-bold uppercase">
            Ready to Lift Your Project?
          </h2>
          <p className="max-w-2xl mx-auto text-lg">
            Join KranHub today—whether you’re listing your crane or booking one
            for your next jobsite. Sign up, explore our fleet, and get expert
            advice on-demand.
          </p>

          <button
            className="bg-white text-red-600 px-8 py-3 font-semibold rounded-lg hover:bg-gray-100 transition cursor-pointer"
            onClick={openSignup}
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
