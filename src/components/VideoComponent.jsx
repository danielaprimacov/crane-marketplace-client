import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import play from "../assets/icons/play.png";
import stop from "../assets/icons/stop-circle.png";

import soundOff from "../assets/icons/volume-slash.png";
import soundOn from "../assets/icons/volume.png";

function VideoComponent({ introWebm, introMp4 }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const location = useLocation();

  const isCranes = location.pathname === "/cranes";

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

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

  const handleToggleMute = () => {
    setMuted((m) => !m);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover filter ${
          isCranes ? "" : "blur-[2px] transform scale-105"
        }`}
        autoPlay
        muted={muted}
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

      {isCranes && (
        <button
          onClick={handleToggleMute}
          className="absolute bottom-5 left-5 z-20 p-2 cursor-pointer"
        >
          {muted ? (
            <img className="scale-105" src={soundOff} alt="Mute Video" />
          ) : (
            <img className="scale-105" src={soundOn} alt="Unmute Video" />
          )}
        </button>
      )}
    </section>
  );
}

export default VideoComponent;
