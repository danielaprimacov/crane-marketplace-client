import { useState, useRef, useEffect } from "react";

import play from "../../assets/icons/play.png";
import stop from "../../assets/icons/stop-circle.png";

function VideoComponent({
  introWebm,
  introMp4,
  poster,
  muted = true,
  onMuteChange,
  interactive = false,
  blurred = true,
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = muted;
  }, [muted]);

  const handleTogglePlayback = async (event) => {
    event.stopPropagation();

    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
      } else {
        video.pause();
      }
    } catch (error) {
      console.error("Video playback error:", error);
    }
  };

  const handleVideoClick = () => {
    if (!interactive || typeof onMuteChange !== "function") return;
    onMuteChange((prev) => !prev);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        poster={poster}
        className={`absolute inset-0 w-full h-full object-cover transform transition duration-500 ${
          interactive ? "cursor-pointer" : ""
        } ${blurred ? "scale-105 blur-[2px]" : ""}`}
        autoPlay
        muted={muted}
        loop
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={handleVideoClick}
      >
        {introWebm && <source src={introWebm} type="video/webm" />}
        {introMp4 && <source src={introMp4} type="video/mp4" />}
        Your browser does not support HTML5 video.
      </video>

      <button
        type="button"
        onClick={handleTogglePlayback}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute bottom-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition hover:bg-white/25 sm:bottom-5 sm:right-5 sm:h-12 sm:w-12"
      >
        {playing ? (
          <img
            className="h-5 w-5 object-contain sm:h-6 sm:w-6"
            src={stop}
            alt=""
            aria-hidden="true"
          />
        ) : (
          <img
            className="h-5 w-5 object-contain sm:h-6 sm:w-6"
            src={play}
            alt=""
            aria-hidden="true"
          />
        )}
      </button>
    </section>
  );
}

export default VideoComponent;
