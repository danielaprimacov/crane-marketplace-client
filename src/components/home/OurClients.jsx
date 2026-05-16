import CraneProducerLogo from "../../assets/images/crane-producer.png";

const CLIENT_LOGOS = [
  {
    name: "Caterpillar",
    src: CraneProducerLogo,
  },
  {
    name: "Komatsu",
    src: CraneProducerLogo,
  },
  {
    name: "Liebherr",
    src: CraneProducerLogo,
  },
  {
    name: "Volvo",
    src: CraneProducerLogo,
  },
  {
    name: "Hitachi",
    src: CraneProducerLogo,
  },
  {
    name: "John Deere",
    src: CraneProducerLogo,
  },
  {
    name: "JCB",
    src: CraneProducerLogo,
  },
  {
    name: "Sany",
    src: CraneProducerLogo,
  },
  {
    name: "XCMG",
    src: CraneProducerLogo,
  },
  {
    name: "Konecranes",
    src: CraneProducerLogo,
  },
  {
    name: "Tadano",
    src: CraneProducerLogo,
  },
];

function OurClients() {
  const duplicatedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

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
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="shrink-0">
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                loading="lazy"
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
