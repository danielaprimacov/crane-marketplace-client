import heroImage from "../assets/images/crane-gettyimages.jpg";
import teamImage from "../assets/images/team.jpg";

import { services, benefits } from "../constants/about";

function SectionHeading({ children, className = "" }) {
  return (
    <h2
      className={`text-center text-2xl font-semibold uppercase tracking-wide sm:text-3xl ${className}`}
    >
      {children}
    </h2>
  );
}

function ServiceCard({ image, alt, title, description }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <img src={image} alt={alt} className="h-48 w-full object-cover sm:h-52" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-3 text-xl font-medium">{title}</h3>
        <p className="text-sm leading-6 text-gray-600 sm:text-base">
          {description}
        </p>
      </div>
    </article>
  );
}

function AboutPage({ openSignup }) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative min-h-[100svh] bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold uppercase">
            About KranHub
          </h1>
          <p className="mt-5 text-base leading-7 sm:text-lg sm:leading-8 lg:text-xl text-white/90 max-w-3xl mx-auto">
            The one-stop managed marketplace for buying, selling, renting,
            transporting, installing and dismantling construction cranes—trusted
            by crane owners and contractors alike.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={teamImage}
              alt="Our Team"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold uppercase tracking-wide sm:text-3xl">
              Our Mission
            </h2>
            <p className="text-base leading07 text-gray-700 sm:text-lg">
              At KranHub, we believe access to heavy lifting equipment should be
              as easy as booking a ride. Whether you’re a crane owner looking to
              monetize your fleet or a contractor in need of specialized
              machinery, our mission is to connect you seamlessly—backed by
              premium service, transparent pricing, and expert coordination
              every step of the way.
            </p>
            <p className="text-base leading-7 text-gray-700 sm:text-lg">
              From local rentals to international transport, from sale to safe
              disassembly—KranHub handles the logistics so you can focus on the
              build.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-gray-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <SectionHeading>Core Services</SectionHeading>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                image={service.image}
                alt={service.alt}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading>Why Choose Us</SectionHeading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {benefits.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm"
            >
              <p className="text-sm leading-6 text-gray-700 sm:text-base">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-red-600">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 text-center text-white sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-3xl font-bold uppercase sm:text-4xl">
            Ready to Lift Your Project?
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base leading-7 sm:text-lg">
            Join KranHub today—whether you’re listing your crane or booking one
            for your next jobsite. Sign up, explore our fleet, and get expert
            advice on-demand.
          </p>

          <button
            type="button"
            className="mt-8 bg-white text-red-600 px-8 py-3 font-semibold rounded-lg transition hover:bg-gray-100"
            onClick={() => openSignup?.()}
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
