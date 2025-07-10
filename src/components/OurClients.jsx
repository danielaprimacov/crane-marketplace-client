import { useState } from "react";

import CaterpillarLogo from "../assets/images/Caterpillar-Logo.png";
import KomatsuLogo from "../assets/images/Komatsu-Logo.png";
import LiebherrLogo from "../assets/images/Liebherr-Logo.png";
import VolvoLogo from "../assets/images/volvo-logo-1959-2020-01.jpg";
import HitachiLogo from "../assets/images/Hitachi-Logo.png";
import JohnDeereLogo from "../assets/images/john-deere-logo.png";
import JCBLogo from "../assets/images/JCB-Logo.jpg";
import SanyLogo from "../assets/images/Sany-logo.png";
import XCMGLogo from "../assets/images/xcmg-horizontal-logo.png";
import KonesCranesLogo from "../assets/images/Konecranes-Logo.png";
import TadanoLogo from "../assets/images/Tadano_Faun_logo.png";

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
