import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth.context";
import Modal from "../components/Modal";

const API_URL = import.meta.env.VITE_API_URL;

import goBackIcon from "../assets/icons/angle-double-small-left.png";

function CraneDetailsPage() {
  const [crane, setCrane] = useState(null);
  const { craneId } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const getCrane = async () => {
    try {
      const response = await axios.get(`${API_URL}/cranes/${craneId}`);

      setCrane(response.data);
    } catch (error) {
      console.error("Failed to fetch crane:", error);
    }
  };

  useEffect(() => {
    getCrane();
  }, [craneId]);

  useEffect(() => {
    if (!crane?.images?.length) return;
    const timer = setInterval(() => {
      setCurrentImage((i) => (i + 1) % crane.images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [crane?.images?.length]);

  if (!crane) return <p>Loading…</p>;

  const ownerId =
    typeof crane.owner === "string" ? crane.owner : crane.owner._id;

  const isOwner = user && user._id === ownerId;

  const handleDelete = async () => {
    setConfirmOpen(false);
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`${API_URL}/cranes/${craneId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/cranes/my-cranes");
    } catch (error) {
      console.error("Failed to delete crane:", error);
    }
  };

  const handleDeleteClick = () => setConfirmOpen(true);

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
      >
        <img src={goBackIcon} alt="back" className="w-5 mr-2" />
        Back
      </button>

      {/* Main Card */}
      <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Slideshow */}
        <div className="relative bg-white flex justify-center items-center">
          <img
            src={crane.images[currentImage]}
            alt=""
            className="max-w-full object-cover"
          />
          {crane.images.length > 1 && (
            /* only keep dots */
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {crane.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentImage ? "bg-white" : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-8 flex flex-col">
          {/* Title + badges */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{crane.title}</h1>
              <h2 className="text-gray-500 mt-1">{crane.producer}</h2>
            </div>
            <div className="text-right space-y-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mr-3
                  ${
                    crane.status === "for sale"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
              >
                {crane.status.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
              </span>
              <span className="inline-block px-3 py-1 bg-black text-white rounded-md font-medium">
                {crane.status === "for sale" && crane.salePrice != null
                  ? `${crane.salePrice} €`
                  : crane.status === "for rent" &&
                    crane.rentPrice?.amount != null
                  ? `${crane.rentPrice.amount} €/${crane.rentPrice.interval}`
                  : "Contact for price"}
              </span>
            </div>
          </div>

          {/* Specs grid */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6 text-sm text-gray-600">
            {[
              ["Class Cap. (t)", crane.capacityClassNumber],
              ["Max Cap. (t)", crane.capacity],
              ["Max Hgt. (m)", crane.height],
              ["Max Rng. (m)", crane.radius],
              ["Variant", crane.variantRevision || "–"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="uppercase tracking-wide">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>

          {/* Description */}
          <p className="mt-6 text-gray-700 leading-relaxed">
            {crane.description}
          </p>

          {/* Location & Availability */}
          <div className="mt-6 space-y-2">
            <p className="flex items-center">
              <strong className="w-24">Location:</strong> {crane.location}
            </p>
            {crane.availability?.from && crane.availability?.to ? (
              <p className="flex items-center">
                <strong className="w-24">Available:</strong>{" "}
                {new Date(crane.availability.from).toLocaleDateString()} –{" "}
                {new Date(crane.availability.to).toLocaleDateString()}
              </p>
            ) : (
              <p className="flex items-center">
                <strong className="w-24">Available:</strong> Not set
              </p>
            )}
          </div>

          {/* Actions */}
          {(!user || user.role !== "admin") && !isOwner && (
            <div className="mt-8">
              <Link to={`/cranes/${craneId}/new-inquiry`} replace>
                <button className="bg-orange-500 text-white py-2 px-4 cursor-pointer rounded hover:bg-orange-400 transition">
                  Send Inquiry
                </button>
              </Link>
            </div>
          )}
          {(user?.role === "admin" || isOwner) && (
            <div className="mt-8 flex gap-4">
              <Link
                to={`/cranes/edit/${craneId}`}
                className="flex-1 bg-green-600 text-white py-2 text-center rounded hover:bg-green-500 transition"
              >
                Edit
              </Link>
              <button
                onClick={handleDeleteClick}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-500 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Delete Crane?</h2>
        <p className="mb-6">
          Are you sure you want to delete this crane? This cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-500 transition"
          >
            Yes, delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CraneDetailsPage;
