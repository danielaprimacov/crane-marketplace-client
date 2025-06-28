import { Link } from "react-router-dom";

function TopProducers({ topProducers }) {
  return (
    <div className="flex p-4 justify-evenly items-center">
      {topProducers.map((prod) => (
        <Link
          to=""
          key={prod}
          className="
              px-4 py-2 w-[20rem] border border-gray-200 rounded bg-white text-m font-medium uppercase text-center tracking-wide whitespace-nowrap
              cursor-pointer transition duration-300 transform hover:text-black/200 hover:scale-105 
            "
        >
          {prod}
        </Link>
      ))}
    </div>
  );
}

export default TopProducers;
