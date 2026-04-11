import { useState } from "react";

import CaterpillarLogo from "../assets/images/crane-producer.png";
import KomatsuLogo from "../assets/images/crane-producer.png";
import LiebherrLogo from "../assets/images/crane-producer.png";
import VolvoLogo from "../assets/images/crane-producer.png";
import HitachiLogo from "../assets/images/crane-producer.png";
import JohnDeereLogo from "../assets/images/crane-producer.png";
import JCBLogo from "../assets/images/crane-producer.png";
import SanyLogo from "../assets/images/crane-producer.png";
import XCMGLogo from "../assets/images/crane-producer.png";
import KonesCranesLogo from "../assets/images/crane-producer.png";
import TadanoLogo from "../assets/images/crane-producer.png";

const logos = [
  CaterpillarLogo,
  KomatsuLogo,
  LiebherrLogo,
  VolvoLogo,
  HitachiLogo,
  JohnDeereLogo,
  JCBLogo,
  SanyLogo,
  XCMGLogo,
  KonesCranesLogo,
  TadanoLogo,
];

function OurClients() {
  const NORMAL = 60;

  const [duration, setDuration] = useState(NORMAL);

  return (
    <div className="my-10 relative overflow-hidden py-8">
      <h1 className="text-4xl uppercase font-medium tracking-widest text-center mb-20">
        Our Clients
      </h1>
      <div className="overflow-hidden">
        <div
          className="inline-flex items-center space-x-10 min-w-max"
          style={{
            animation: `scroll ${duration}s linear infinite`,
          }}
        >
          {logos.map((src, i) => (
            <div key={`first-${i}`} className="flex-shrink-0">
              <img
                src={src}
                alt="Client logo"
                className="h-24 w-auto object-contain"
              />
            </div>
          ))}

          {logos.map((src, i) => (
            <div key={`second-${i}`} className="flex-shrink-0">
              <img
                src={src}
                alt="Client logo"
                className="h-24 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurClients;
