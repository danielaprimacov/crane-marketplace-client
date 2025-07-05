import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

import goBackIcon from "../assets/icons/angle-double-small-left.png";

function CraneDetailsPage() {
  const [crane, setCrane] = useState(null);
  const { craneId } = useParams();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const getCrane = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${API_URL}/cranes/${craneId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setCrane(response.data);
    } catch (error) {
      console.error("Failed to fetch crane:", error);
    }
  };

  useEffect(() => {
    getCrane();
  }, [craneId]);

  if (!crane) return <p>Loading…</p>;

  const ownerId =
    typeof crane.owner === "string" ? crane.owner : crane.owner._id;

  const isOwner = user && user._id === ownerId;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this crane?")) return;
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`${API_URL}/cranes/${craneId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/cranes");
    } catch (error) {
      console.error("Failed to delete crane:", error);
    }
  };

  return (
    <div className="mt-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center ml-10 cursor-pointer"
      >
        <img src={goBackIcon} alt="Go back icon" className="w-5" />
        <span>Back</span>
      </button>
      <div className="mt-20 flex justify-evenly">
        {crane && (
          <>
            <div>
              {crane.images?.length > 0 ? (
                <div>
                  {crane.images.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={crane.title}
                      className="w-[30rem] rounded shadow-lg"
                    />
                  ))}{" "}
                </div>
              ) : (
                <p>No images</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex justify-end items-center gap-15 mb-5">
                <div className="flex flex-col justify-center items-center ml-10 pt-4 h-20">
                  <h1 className="text-2xl font-semibold tracking-wider text-center">
                    {crane.title}
                  </h1>
                  <h2 className="text-black/50 mb-5 text-center">
                    {crane.producer}
                  </h2>
                </div>
                <span className="text-white bg-black px-5 py-4 rounded-md mr-10 h-14 hover:bg-red-600 transition-colors duration-300">
                  {crane.status === "for sale" && crane.salePrice != null
                    ? `${crane.salePrice} €`
                    : crane.status === "for rent" &&
                      crane.rentPrice?.amount != null
                    ? `${crane.rentPrice.amount} €/${crane.rentPrice.interval}`
                    : "Contact for price"}
                </span>
              </div>
              <p className="uppercase bg-green-300 w-1/3 h-8 flex justify-center items-center rounded-md mx-auto mb-10">
                {crane.status}
              </p>
              <div className="flex flex-col justify-center items-center gap-5">
                <p className="text-center w-[40rem]">{crane.description}</p>
                <p className="ml-auto pr-10">{crane.location}</p>

                {crane.availability?.from && crane.availability?.to ? (
                  <p className="text-lg border-b border-b-green-600 pb-2 mt-2">
                    Available from{" "}
                    {new Date(crane.availability.from).toLocaleDateString()} to{" "}
                    {new Date(crane.availability.to).toLocaleDateString()}
                  </p>
                ) : (
                  <p>Availability not specified.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {(user?.role === "admin" || isOwner) && (
        <div className="mt-10 flex justify-center gap-10">
          <Link
            to={`/cranes/edit/${craneId}`}
            className="w-[15rem] bg-green-600 px-5 py-2 text-white text-lg text-center rounded cursor-pointer hover:bg-green-500 transition duration-300"
          >
            Edit Crane Details
          </Link>
          <button
            onClick={handleDelete}
            className="w-[15rem] bg-red-600 px-5 py-2 text-white text-center text-lg rounded cursor-pointer hover:bg-red-500 transition duration-300"
          >
            Delete Crane
          </button>
        </div>
      )}
    </div>
  );
}

export default CraneDetailsPage;
