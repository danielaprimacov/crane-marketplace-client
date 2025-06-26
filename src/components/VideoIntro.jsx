import { useState, useRef } from "react";

import introWebm from "../assets/video/video-intro.webm";
import introMp4 from "../assets/video/video-intro.mp4";

function VideoIntro() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  const handleToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative w-full h-170 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transform scale-105 filter blur-[2px]"
        autoPlay
        muted
        loop
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={introWebm} type="video/webm" />
        <source src={introMp4} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      <button
        onClick={handleToggle}
        className="absolute bottom-5 right-5 z-20 bg-black/50 text-white py-2 px-4 rounded hover:bg-black/75 transition duration-200 ease-in-out cursor-pointer"
      >
        {playing ? "Pause" : "Play"}
      </button>
    </section>
  );
}

export default VideoIntro;
