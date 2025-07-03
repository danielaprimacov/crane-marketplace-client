import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import play from "../assets/icons/play.png";
import stop from "../assets/icons/stop-circle.png";

function VideoComponent({ introWebm, introMp4, poster, muted, onMuteChange }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  const location = useLocation();

  const isCranes = location.pathname.startsWith("/cranes");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  const handleToggle = (e) => {
    e.stopPropagation();
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

  // Toggle mute/unmute (only on video click when isCranes)
  const handleVideoClick = () => {
    if (!isCranes) return;
    onMuteChange((m) => !m);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        poster={poster}
        className={`absolute inset-0 w-full h-full object-cover transform filter transition-transform transition-filter duration-500 ${
          isCranes ? "cursor-pointer" : "blur-[2px] scale-105"
        }`}
        autoPlay
        muted={muted}
        loop
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={handleVideoClick}
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
          <img className="scale-180 pb-3" src={stop} alt="Stop Video" />
        ) : (
          <img className="scale-180 pb-3" src={play} alt="Play Video" />
        )}
      </button>
    </section>
  );
}

export default VideoComponent;
