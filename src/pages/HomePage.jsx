import { Link } from "react-router-dom";
import VideoIntro from "../components/VideoIntro";

function HomePage() {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <VideoIntro />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
          <p className="text-white uppercase text-2xl md:text-4xl lg:text-5xl tracking-tighter [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
            KranHub presents
          </p>
          <p className="mt-2 text-white uppercase text-center text-4xl md:text-6xl lg:text-7xl [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)] tracking-wide">
            The Art of Precision Lifting
          </p>
          <Link to="">
            <button className="m-5 h-15 w-50 bg-white/50 cursor-pointer text-xl uppercase text-center rounded hover:bg-black/30 hover:text-white transition duration-400 ease-in-out">
              Learn more
            </button>
          </Link>
        </div>
      </div>
      <main className="relative z-20 bg-white p-8">
        {/* Producers */}
        <div className=""></div>
      </main>
    </>
  );
}

export default HomePage;
