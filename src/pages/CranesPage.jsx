import { useState } from "react";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import VideoComponent from "../components/home/VideoComponent";
import ArrowDownIcon from "../components/ui/ArrowDownIcon";

import Modal from "../components/ui/Modal";
import ExpertForm from "../components/forms/contact/ExpertForm";

import videoWebm from "../assets/video/choose-a-crane.webm";
import videoMp4 from "../assets/video/choose-a-crane.mp4";
import videoPoster from "../assets/images/poster-cranes-page.png";

import cranePhoto from "../assets/images/feng-sun-5AmT_FPF5Jo-unsplash.jpg";
import downArrow from "../assets/icons/down-arrow.gif";

import towerCrane from "../assets/images/tower-crane.webp";
import mobileCrane from "../assets/images/mobile-crane.jpg";
import crawlerCrane from "../assets/images/crawler-crane.png";

const jobNeeds = [
  {
    question: "What are you lifting?",
    answer: (
      <>
        Check the <strong>load capacity in tonnes</strong>.
      </>
    ),
  },
  {
    question: "How high or how far?",
    answer: (
      <>
        Look at the <strong>lift height</strong> and <strong>radius</strong>{" "}
        specs.
      </>
    ),
  },
  {
    question: "Where is the site?",
    answer: (
      <>
        Note your <strong>location</strong> — some cranes will not fit narrow
        streets or soft ground.
      </>
    ),
  },
];

const craneTypes = [
  {
    title: "Tower",
    text: "Tall-building projects, compact footprint on tight city sites.",
    image: towerCrane,
  },
  {
    title: "Mobile",
    text: "Quick setup, short-term jobs, and moving between multiple locations.",
    image: mobileCrane,
  },
  {
    title: "Crawler",
    text: "Very heavy loads on uneven or soft ground, usually for long-term installations.",
    image: crawlerCrane,
  },
];

const filterItems = [
  {
    title: "Capacity",
    text: "enter the minimum tonnage you require.",
  },
  {
    title: "Lift Height / Radius",
    text: "specify the height or boom reach you need.",
  },
  {
    title: "Rental Dates",
    text: "pick your start and end dates if renting.",
  },
  {
    title: "Location & Budget",
    text: "set your site location and maximum spend.",
  },
];

const cardIncludes = [
  "High-resolution photos",
  "Key specs: capacity, lift height, crane type",
  "Transparent pricing: purchase price or rental rate",
];

function Section({ title, subtitle, children }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-10">{children}</div>
    </section>
  );
}

function Tip({ children }) {
  return (
    <p className="mx-auto mt-8 max-w-4xl text-sm leading-6 text-gray-600 sm:text-base">
      <span className="font-semibold text-gray-900">Tip: </span>
      {children}
    </p>
  );
}

function CranesPage() {
  const [videoMuted, setVideoMuted] = useState(true);
  const [isAdviceOpen, setAdviceOpen] = useState(false);

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden">
        <VideoComponent
          introWebm={videoWebm}
          introMp4={videoMp4}
          poster={videoPoster}
          muted={videoMuted}
          onMuteChange={setVideoMuted}
          interactive={true}
          blurred={false}
        />
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <div
            className={`flex flex-1 flex-col items-center justify-center transition-opacity duration-700 ${
              videoMuted ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="max-w-5xl text-4xl font-semibold uppercase tracking-wide text-red-600 [text-shadow:2px_2px_4px_rgba(0,0,0,0.65)] sm:text-5xl md:text-6xl lg:text-7xl">
              Get crane choosing advice
            </p>

            <p className="mt-4 text-lg uppercase tracking-tight text-white [text-shadow:2px_2px_4px_rgba(0,0,0,0.65)] sm:text-xl md:text-2xl lg:text-3xl">
              Click on the video to unmute
            </p>
          </div>

          <a
            href="#guide"
            aria-label="Scroll down to guide"
            className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 text-red-600"
          >
            <ArrowDownIcon className="h-12 w-12 animate-bounce sm:h-14 sm:w-14" />
          </a>
        </div>
      </section>

      <main id="guide" className="bg-white">
        {/* Define Your Job Needs */}
        <Section title="Define Your Job Needs">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] lg:gap-16">
            <ul className="space-y-8">
              {jobNeeds.map((item) => (
                <li
                  key={item.question}
                  className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm sm:p-6"
                >
                  <p className="text-lg font-medium text-gray-900">
                    {item.question}
                  </p>

                  <img
                    src={downArrow}
                    alt=""
                    className="mx-auto my-3 h-6 w-6"
                    aria-hidden="true"
                  />

                  <p className="text-base leading-7 text-gray-600">
                    {item.answer}
                  </p>
                </li>
              ))}
            </ul>

            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={cranePhoto}
                alt="Construction crane at sunset"
                className="h-72 w-full object-cover sm:h-96 lg:h-[28rem]"
              />
            </div>
          </div>

          <Tip>
            If you need to place materials on upper floors of a building, pick a
            crane with a tall maximum height. For heavy loads near the ground,
            capacity matters more than height.
          </Tip>
        </Section>

        {/* Pick the Crane Type */}
        <Section
          title="Pick the Crane Type"
          subtitle="On KranHub you will see three main categories. Use the crane type as the first practical filter before comparing exact models."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {craneTypes.map(({ title, text, image }) => (
              <article
                key={title}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <img
                    src={image}
                    alt={`${title} crane`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <h3 className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-4 py-2 text-2xl font-semibold text-white">
                    {title}
                  </h3>
                </div>

                <div className="p-5">
                  <p className="text-center text-base leading-7 text-gray-700 sm:text-left">
                    {text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <Tip>
            Start with the crane type, then compare capacity, height, radius,
            ground conditions, and transport requirements.
          </Tip>
        </Section>

        {/* Filter & Compare Listings */}
        <Section
          title="Filter & Compare Listings"
          subtitle="Once you have chosen a manufacturer, fine-tune your results with integrated filters."
        >
          <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-5 shadow-lg sm:p-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h3 className="mb-5 text-xl font-semibold text-gray-900">
                  Filter by:
                </h3>

                <ul className="space-y-4">
                  {filterItems.map((item) => (
                    <li key={item.title} className="leading-7">
                      <span className="font-semibold text-gray-900">
                        {item.title} —
                      </span>
                      <span className="ml-2 text-gray-600">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-5 text-xl font-semibold text-gray-900">
                  Each crane card includes:
                </h3>

                <ul className="space-y-4">
                  {cardIncludes.map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircleIcon className="mt-1 h-5 w-5 shrink-0 text-green-500" />
                      <span className="ml-3 leading-7 text-gray-700">
                        {item}
                      </span>
                    </li>
                  ))}

                  <li className="flex items-start">
                    <CheckCircleIcon className="mt-1 h-5 w-5 shrink-0 text-green-500" />
                    <span className="ml-3 leading-7 text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Send Inquiry
                      </span>{" "}
                      button — sends your request directly to the admin team for
                      follow-up.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Help CTA */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-red-50 to-white p-6 text-center shadow-lg sm:p-8">
            <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <QuestionMarkCircleIcon className="h-12 w-12 text-red-500" />

              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                Need Help?
              </h2>
            </div>

            <p className="mx-auto max-w-4xl text-base leading-7 text-gray-600">
              Send us your lifting requirements and our team will help you
              choose a suitable crane without technical jargon.
            </p>

            <button
              type="button"
              onClick={() => setAdviceOpen(true)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Get Expert Advice
            </button>
          </div>
        </section>
      </main>

      <Modal
        isOpen={isAdviceOpen}
        onClose={() => setAdviceOpen(false)}
        widthClass="w-[92vw] max-w-[38rem]"
        panelClass="max-h-[92dvh] overflow-y-auto"
        contentClass="p-0"
      >
        <ExpertForm onClose={() => setAdviceOpen(false)} />
      </Modal>
    </>
  );
}

export default CranesPage;
