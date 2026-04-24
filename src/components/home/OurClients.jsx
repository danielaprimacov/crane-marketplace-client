import { useState } from "react";

import CaterpillarLogo from "../../assets/images/crane-producer.png";
import KomatsuLogo from "../../assets/images/crane-producer.png";
import LiebherrLogo from "../../assets/images/crane-producer.png";
import VolvoLogo from "../../assets/images/crane-producer.png";
import HitachiLogo from "../../assets/images/crane-producer.png";
import JohnDeereLogo from "../../assets/images/crane-producer.png";
import JCBLogo from "../../assets/images/crane-producer.png";
import SanyLogo from "../../assets/images/crane-producer.png";
import XCMGLogo from "../../assets/images/crane-producer.png";
import KonesCranesLogo from "../../assets/images/crane-producer.png";
import TadanoLogo from "../../assets/images/crane-producer.png";

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
  return (
    <div className="my-10 relative overflow-hidden py-8">
      <h1 className="text-2xl uppercase font-medium tracking-widest text-center mb-14 sm:mb-16 sm:text-3xl lg:mb-20 lg:text-4xl">
        Our Clients
      </h1>
      <div className="overflow-hidden">
        <div
          className="inline-flex items-center space-x-8 min-w-max sm:space-x-10"
          style={{ animation: "scroll 60s linear infinite" }}
        >
          {[...logos, ...logos].map((src, i) => (
            <div key={i} className="shrink-0">
              <img
                src={src}
                alt="Client logo"
                className="h-24 w-auto object-contain sm:h-36 lg:h-48"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurClients;
