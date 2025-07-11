import { Link } from "react-router-dom";
import { useState } from "react";

import { CheckCircleIcon } from "@heroicons/react/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";

import VideoComponent from "../components/VideoComponent";
import ArrowDownIcon from "../components/ArrowDownIcon";

import Modal from "../components/Modal";
import ExpertForm from "../components/ExpertForm";

import videoWebm from "../assets/video/choose-a-crane.webm";
import videoMp4 from "../assets/video/choose-a-crane.mp4";
import videoPoster from "../assets/images/poster-cranes-page.png";

import cranePhoto from "../assets/images/feng-sun-5AmT_FPF5Jo-unsplash.jpg";
import downArrow from "../assets/icons/down-arrow.gif";

import towerCrane from "../assets/images/tower-crane.webp";
import mobileCrane from "../assets/images/mobile-crane.jpg";
import crawlerCrane from "../assets/images/crawler-crane.png";

function CranesPage() {
  const [videoMuted, setVideoMuted] = useState(true);
  const [isAdviceOpen, setAdviceOpen] = useState(false);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <VideoComponent
          introWebm={videoWebm}
          introMp4={videoMp4}
          poster={videoPoster}
          muted={videoMuted}
          onMuteChange={setVideoMuted}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pointer-events-none">
          <div
            className={`flex-1 flex flex-col justify-center items-center transition-opacity duration-700 ${
              videoMuted ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-white uppercase text-xl md:text-2xl lg:text-3xl tracking-tighter [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
              Unlock Expert Crane Insights
            </p>
            <p className="mt-2 text-red-600 uppercase text-center text-4xl md:text-6xl lg:text-7xl [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)] tracking-wide">
              Unmute for the Full Story
            </p>
            <p className="my-5 text-red-600 text-xl md:text-2xl lg:text-3xl tracking-wider [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
              Tap the video to hear our step-by-step crane selection guide.
            </p>
            <p className="my-5 text-white text-xl md:text-2xl lg:text-3xl tracking-wider [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
              Get insider tips on capacity, reach, and setup—straight from the
              pros.
            </p>
            <p className="text-white text-xl md:text-2xl lg:text-3xl tracking-wider [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
              Prefer reading? <span className="text-red-600">Scroll down</span>{" "}
              for the full text walkthrough.
            </p>
          </div>
          <div className="pb-15">
            <div
              aria-label="Scroll down to guide"
              className="absolute bottom-6 left-1/2 "
            >
              <ArrowDownIcon className="h-15 w-15 text-red-600 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      <div id="guide">
        <div className="pt-13 pb-5 flex flex-col items-center justify-center">
          <h1 className="py-5 mb-10 text-5xl font-semibold tracking-widest">
            Define Your Job Needs
          </h1>
          <div className="flex p-5 gap-20">
            <ul className="flex flex-col gap-10 text-lg pt-4">
              <li className="flex flex-col justify-center items-center mb-4">
                <p>What are you lifting?</p>
                <img src={downArrow} alt="Down Arrow GIF" className="w-6" />
                <span>
                  Check the <strong>load capacity (in tonnes).</strong>
                </span>
              </li>
              <li className="flex flex-col items-center mr-auto mb-4">
                <p>How high or how far?</p>
                <img src={downArrow} alt="Down Arrow GIF" className="w-6" />
                <span>
                  Look at the <strong>lift height</strong> and{" "}
                  <strong>radius</strong> specs.
                </span>
              </li>
              <li className="flex flex-col items-center">
                <p>Where is the site?</p>
                <img src={downArrow} alt="Down Arrow GIF" className="w-6" />
                <span className="flex flex-col items-center">
                  <span>
                    Note your <strong>location</strong>
                  </span>
                  <span>
                    — some cranes won't fit narrow streets or soft ground.
                  </span>
                </span>
              </li>
            </ul>
            <div>
              <img
                src={cranePhoto}
                alt="Construction Crane on sunset"
                className="w-120 rounded-md"
              />
            </div>
          </div>
          <p className="pt-5 text-sm">
            <span className="font-semibold pr-2">Tip:</span>
            <span>
              If you need to place materials on upper floors of a building, pick
              a crane with a tall maximum height. For heavy loads near the
              ground, capacity matters more than height.
            </span>
          </p>
        </div>

        <div className="pt-13 pb-5 flex flex-col items-center justify-center">
          <h1 className="py-5 mb-10 text-5xl font-semibold tracking-widest">
            Pick the Crane Type
          </h1>
          <h3 className="text-lg tracking-wider pb-8">
            On KranHub you'll see three main categories — click each for photos
            and specs:{" "}
          </h3>
          <div className="flex justify-evenly w-full py-8">
            {[
              {
                title: "Tower",
                text: "Tall-building projects, compact footprint on tight city sites",
                image: towerCrane,
              },
              {
                title: "Mobile",
                text: "Quick setup, short-term jobs, moving between multiple locations",
                image: mobileCrane,
              },
              {
                title: "Crawler",
                text: "Very heavy loads on uneven or soft ground, long-term installations",
                image: crawlerCrane,
              },
            ].map(({ title, text, image }) => (
              <div key={title} className="group [perspective:1000px] w-64 h-80">
                {/* card inner */}
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* front face */}
                  <div
                    className="absolute inset-0 bg-cover bg-center rounded-lg shadow-md p-4 flex items-center justify-center [backface-visibility:hidden]"
                    style={{ backgroundImage: `url(${image})` }}
                  >
                    <p className="text-2xl py-2 px-4 font-semibold text-white bg-black/50 px-2 rounded">
                      {title}
                    </p>
                  </div>
                  {/* back face */}
                  <div className="absolute inset-0 bg-white rounded-lg shadow-md p-4 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="text-center text-gray-700">{text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="pt-5 text-sm">
            <span className="font-semibold pr-2">Tip:</span>
            <span>Hover over the “Type” filter to see a description.</span>
          </p>
        </div>

        <div className="pt-13 pb-5 flex flex-col items-center justify-center">
          <h1 className="py-5 mb-10 text-5xl font-semibold tracking-widest">
            Filter & Compare Listings
          </h1>
          <p className="text-lg text-black/70 tracking-wider pb-8">
            Once you’ve chosen a manufacturer, fine-tune your results with our
            integrated filters:
          </p>
          <section className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-medium mb-4">Filter by:</h3>
                <ul className="space-y-4">
                  <li>
                    <span className="font-semibold">Capacity —</span>
                    <span className="ml-2 text-gray-600">
                      enter the minimum tonnage you require.
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold">Lift Height/Radius —</span>
                    <span className="ml-2 text-gray-600">
                      specify the height or boom reach you need.
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold">Rental Dates —</span>
                    <span className="ml-2 text-gray-600">
                      pick your start and end dates if renting.
                    </span>
                  </li>
                  <li>
                    <span className="font-semibold">Location & Budget —</span>
                    <span className="ml-2 text-gray-600">
                      set your site location and maximum spend.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">
                  Each crane card includes:
                </h3>
                <ul className="space-y-4">
                  {[
                    "High-resolution photos",
                    "Key specs (capacity, lift height, crane type)",
                    "Transparent pricing (purchase price or daily rental rate)",
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="ml-3">{item}</span>
                    </li>
                  ))}

                  <li className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className="ml-3">
                      <span className="font-semibold">Send Inquiry</span> button
                      — directs your request straight to our admin team for fast
                      follow-up.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="max-w-full mx-auto bg-gradient-to-br from-red-50 to-white p-6 rounded-xl shadow-lg text-center mt-8">
          <div className="flex justify-center items-center gap-5 mb-4">
            <QuestionMarkCircleIcon className="h-12 w-12 text-red-500" />
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              Need Help?
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Click{" "}
            <button
              onClick={() => setAdviceOpen(true)}
              className="inline-block bg-red-600 cursor-pointer text-white px-4 py-1 mx-3 rounded-full font-medium transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Get Expert Advice
            </button>{" "}
            at the top of any page. Our team will review your requirements and
            recommend the perfect crane—no technical jargon, guaranteed!
          </p>
        </div>
      </div>

      <Modal isOpen={isAdviceOpen} onClose={() => setAdviceOpen(false)}>
        <ExpertForm onClose={() => setAdviceOpen(false)} />
      </Modal>
    </>
  );
}

export default CranesPage;
