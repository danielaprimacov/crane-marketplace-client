import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Modal from "../components/ui/Modal";
import ExpertForm from "../components/forms/contact/ExpertForm";

import transportationImg from "../assets/images/crane-gettyimages.jpg";
import saleCrane from "../assets/images/crane-sale.webp";
import installCrane from "../assets/images/install-crane.png";

const services = [
  {
    id: "transportation",
    title: "Transportation",
    image: transportationImg,
    imageAlt: "Crane transportation service",
    imagePosition: "left",
    eyebrow: "Heavy-haul logistics",
    paragraphs: [
      "KranHub Transportation handles the logistics for crane delivery, including specialized carriers, route planning, permits, and door-to-door delivery to your site.",
      "Track your shipment, receive updates when something changes, and rely on an insured transport process for heavy equipment.",
    ],
    highlights: [
      "Specialized crane transport",
      "Route planning and permit coordination",
      "Site-to-site delivery support",
    ],
    ctaText: "Get Expert Advice",
  },
  {
    id: "sale-rent",
    title: "Sale / Rent",
    image: saleCrane,
    imageAlt: "Crane available for sale or rent",
    imagePosition: "right",
    eyebrow: "Marketplace solutions",
    paragraphs: [
      "Browse cranes available for purchase or rent on flexible terms. KranHub helps customers find suitable equipment for short-term projects or long-term ownership.",
      "Listings can include specifications, photos, availability, seller information, and inquiry options.",
    ],
    highlights: [
      "Cranes for sale and rent",
      "Flexible rental periods",
      "Direct inquiry flow",
    ],
    ctaText: "Get Expert Advice",
  },
  {
    id: "installation-disassembly",
    title: "Installation / Disassembly",
    image: installCrane,
    imageAlt: "Crane installation and disassembly service",
    imagePosition: "left",
    eyebrow: "On-site crane support",
    paragraphs: [
      "KranHub’s installation and disassembly service helps coordinate qualified crews, equipment, planning, and safe execution on site.",
      "From assembly to teardown, the process can include lift planning, site coordination, permit preparation, and transport handover.",
    ],
    highlights: [
      "Assembly and teardown coordination",
      "Site planning support",
      "Safety-focused execution",
    ],
    ctaText: "Request Expert Advice",
  },
];

function ServiceSection({ service, onAdviceClick }) {
  const imageFirst = service.imagePosition === "left";

  return (
    <section
      id={service.id}
      className="scroll-mt-24 border-b border-gray-200 py-12 last:border-b-0 sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
        <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
          <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
            <img
              src={service.image}
              alt={service.imageAlt}
              className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
              loading="lazy"
            />
          </div>
        </div>

        <div
          className={`space-y-6 text-center lg:text-left ${
            imageFirst ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-600">
              {service.eyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-wide text-gray-900 sm:text-4xl">
              {service.title}
            </h2>
          </div>

          <div className="space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="grid gap-3 text-left sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {service.highlights.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onAdviceClick}
            className="inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 sm:w-auto"
          >
            {service.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}

function OurServicesPage() {
  const { hash } = useLocation();
  const [isAdviceOpen, setAdviceOpen] = useState(false);

  useEffect(() => {
    if (!hash) return;

    const id = decodeURIComponent(hash.replace("#", ""));

    requestAnimationFrame(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }, [hash]);

  const openAdviceModal = () => {
    setAdviceOpen(true);
  };

  const closeAdviceModal = () => {
    setAdviceOpen(false);
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <header className="bg-gray-900 px-4 py-14 text-center text-white sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-300">
            KranHub Services
          </p>

          <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-extrabold uppercase tracking-wide sm:text-5xl">
            Crane services from inquiry to execution
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
            Transportation, sale, rental, installation, and disassembly support
            for crane projects.
          </p>
        </header>

        <div>
          {services.map((service) => (
            <ServiceSection
              key={service.id}
              service={service}
              onAdviceClick={openAdviceModal}
            />
          ))}
        </div>
      </main>

      <Modal isOpen={isAdviceOpen} onClose={closeAdviceModal}>
        <ExpertForm onClose={closeAdviceModal} />
      </Modal>
    </>
  );
}

export default OurServicesPage;
