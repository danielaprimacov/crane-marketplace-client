import { useState } from "react";
import { Link } from "react-router-dom";

//import arrow from "../assets/icons/arrow-right.png";

function Crane({
  title,
  images,
  description,
  salePrice,
  rentPrice,
  location,
  status,
  _id,
}) {
  const noImage =
    "https://cdn.webshopapp.com/shops/166166/files/467071907/image.jpg";

  const imageUrl = images[0] || noImage;
  const hoverImage = images[1] || imageUrl;

  const [backgroundImage, setBackgroundImage] = useState(imageUrl);

  return (
    <div className="group w-80 h-[35rem] p-2 flex flex-col gap-2 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in">
      <h3 className="h-12 font-semibold text-lg flex items-center justify-center text-center">
        {title}
      </h3>
      <div
        className={`top-2 right-2 uppercase text-[10px] px-4 py-1 rounded-full font-semibold
        ${
          status === "for sale"
            ? "bg-green-100 text-green-800"
            : status === "for rent"
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <div className="flex items-center gap-2">
          {/* <img src={arrow} alt="Arrow Icon" className="h-4" /> */}
          {status}
        </div>
      </div>
      <div
        className="w-full h-64 bg-cover bg-center transition-[background-image] duration-500"
        onMouseEnter={() => images[1] && setBackgroundImage(hoverImage)}
        onMouseLeave={() => setBackgroundImage(imageUrl)}
        style={{
          backgroundImage: `url("${backgroundImage}"), url(${noImage})`,
        }}
      ></div>
      <p className="px-4 mt-2 text-sm text-gray-700 h-16 text-center overflow-hidden line-clamp-3">
        {description || ""}
      </p>
      <div className="ml-auto flex items-center justify-between text-gray-700">
        <span className="font-medium mr-2">
          {status === "for sale" && salePrice != null
            ? `${salePrice} €`
            : status === "for rent" && rentPrice?.amount != null
            ? `${rentPrice.amount} €/${rentPrice.interval}`
            : "Contact for price"}
        </span>
      </div>
      <div className="mb-2 pl-3 text-sm">{location}</div>
      <Link
        to={`/cranes/${_id}`}
        className="px-5 py-2 bg-black rounded-md text-white text-center hover:bg-orange-400 hover:text-black/70 transition duration-400 ease-in"
      >
        More Information
      </Link>
    </div>
  );
}

export default Crane;
