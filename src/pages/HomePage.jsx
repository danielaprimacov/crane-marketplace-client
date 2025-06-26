import { Link } from "react-router-dom";
import VideoIntro from "../components/VideoIntro";

function HomePage() {
  return (
    <>
      <div className="absolute inset-0 -z-10 w-full h-screen overflow-hidden">
        {" "}
        <VideoIntro />{" "}
      </div>
      <div></div>
    </>
  );
}

export default HomePage;
