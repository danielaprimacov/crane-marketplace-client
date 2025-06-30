import { useState, useRef } from "react";

import introWebm from "../assets/video/video-intro.webm";
import introMp4 from "../assets/video/video-intro.mp4";

import play from "../assets/icons/play.png";
import stop from "../assets/icons/stop-circle.png";

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
    <section className="relative w-full h-screen overflow-hidden">
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
        className="absolute bottom-5 right-5 z-20 py-2 px-4 cursor-pointer"
      >
        {playing ? (
          <img className="scale-150 fill-white" src={stop} alt="Stop Video" />
        ) : (
          <img className="scale-150" src={play} alt="Play Video" />
        )}
      </button>
    </section>
  );
}

export default VideoIntro;
