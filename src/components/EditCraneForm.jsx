import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import AvailabilityRange from "./AvailabilityRange";

const API_URL = "http://localhost:5005";

function EditCraneForm() {
  const { craneId } = useParams();
  const [seriesCode, setSeriesCode] = useState("");
  const [capacityClassNumber, setCapacityClassNumber] = useState("");
  const [variantRevision, setVariantRevision] = useState("");
  const [capacity, setCapacity] = useState("");
  const [height, setHeight] = useState("");
  const [radius, setRadius] = useState("");
  const [producer, setProducer] = useState("");
  const [images, setImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [rentInterval, setRentInterval] = useState("day");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [availability, setAvailability] = useState({
    availabilityStart: "",
    availabilityEnd: "",
  });

  const [imageFeedback, setImageFeedback] = useState("");

  const navigate = useNavigate();

  const handleAddImage = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    setImages((prev) => [...prev, url]);
    setNewImageUrl("");
  };

  const getCraneData = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${API_URL}/cranes/${craneId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      const crane = response.data;
      setProducer(crane.producer);
      setSeriesCode(crane.seriesCode);
      setCapacityClassNumber(crane.capacityClassNumber);
      setCapacity(crane.capacity ?? "");
      setHeight(crane.height ?? "");
      setRadius(crane.radius ?? "");
      setVariantRevision(crane.variantRevision);
      setImages(crane.images || []);
      setDescription(crane.description || "");

      if (crane.status === "for sale") {
        setSalePrice(crane.salePrice);
      } else if (crane.status === "for rent") {
        setRentAmount(crane.rentPrice.amount);
        setRentInterval(crane.rentPrice.interval);
      }

      setLocation(crane.location);
      setStatus(crane.status);
      if (crane.availability?.from && crane.availability?.to) {
        const fromIso = new Date(crane.availability.from)
          .toISOString()
          .slice(0, 10);
        const toIso = new Date(crane.availability.to)
          .toISOString()
          .slice(0, 10);

        setAvailability({
          availabilityStart: fromIso,
          availabilityEnd: toIso,
        });
      }
    } catch (error) {
      console.error("Failed to fetch crane:", error);
    }
  };

  useEffect(() => {
    getCraneData();
  }, [craneId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    const requestBody = {
      producer,
      seriesCode,
      capacityClassNumber: Number(capacityClassNumber),
      capacity: capacity ? Number(capacity) : undefined,
      height: Number(height),
      radius: Number(radius),
      variantRevision,
      images,
      description,
      location,
      status,
    };

    if (availability.availabilityStart && availability.availabilityEnd) {
      requestBody.availability = {
        from: new Date(availability.availabilityStart),
        to: new Date(availability.availabilityEnd),
      };
    }

    if (status === "for sale") {
      requestBody.salePrice = Number(salePrice);
    } else if (status === "for rent") {
      requestBody.rentPrice = {
        amount: Number(rentAmount),
        interval: rentInterval,
      };
    }

    try {
      await axios.put(`${API_URL}/cranes/${craneId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      navigate(`/cranes/${craneId}`);
    } catch (error) {
      console.error("Failed to create crane:", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl uppercase mx-auto mb-5 border-b pb-3 border-b-red-600">
        Edit the Crane Details
      </h1>
      {/* ─── READ-ONLY SPECS ─── */}
      <div className="flex justify-center items-start">
        <section className="w-1/3 max-w-2xl mx-auto grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded mt-5">
          <div>
            <dt className="text-xs text-gray-500 uppercase">Producer</dt>
            <dd className="font-medium">{producer}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 uppercase">Series Code</dt>
            <dd className="font-medium">{seriesCode}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 uppercase">
              Class Capacity (t)
            </dt>
            <dd className="font-medium">{capacityClassNumber}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 uppercase">
              Max Capacity (t)
            </dt>
            <dd className="font-medium">{capacity}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 uppercase">Max Height (m)</dt>
            <dd className="font-medium">{height}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 uppercase">
              Variant / Revision
            </dt>
            <dd className="font-medium">{variantRevision}</dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 uppercase">Max Radius (m)</dt>
            <dd className="font-medium">{radius}</dd>
          </div>
        </section>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-2xl mx-auto mt-10"
        >
          {[
            {
              id: "description",
              type: "textarea",
              label: "Description",
              value: description,
              onChange: (event) => setDescription(event.target.value),
              required: false,
            },
            {
              id: "location",
              type: "text",
              label: "Location",
              value: location,
              onChange: (event) => setLocation(event.target.value),
              required: true,
            },
          ].map(({ id, type, label, value, onChange, required }) => (
            <div key={id} className="relative">
              {type === "textarea" ? (
                <textarea
                  id={id}
                  name={id}
                  value={value}
                  onChange={onChange}
                  required={required}
                  placeholder=" "
                  className="peer block w-full bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition resize-none h-16"
                />
              ) : (
                <input
                  id={id}
                  name={id}
                  type={type}
                  value={value}
                  onChange={onChange}
                  required={required}
                  placeholder=" "
                  className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
                />
              )}
              <label
                htmlFor={id}
                className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
              >
                {label}
              </label>
            </div>
          ))}

          <div className="mb-8">
            {/* URL input + Add button on one line */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="url"
                  id="newImageUrl"
                  placeholder=" "
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="
          peer block w-full h-10 bg-transparent 
          border-b border-gray-300 
          focus:outline-none focus:border-black 
          transition
        "
                />
                <label
                  htmlFor="newImageUrl"
                  className="
          absolute left-0 -top-6 text-sm text-gray-500 
          transition-all duration-300 
          peer-placeholder-shown:top-0 
          peer-placeholder-shown:text-base 
          peer-focus:-top-6
        "
                >
                  Image URL
                </label>
              </div>
              <button
                type="button"
                onClick={handleAddImage}
                className="
        px-4 py-2 bg-red-600 text-white rounded 
        hover:bg-red-500 transition-colors duration-200
      "
              >
                Add Image
              </button>
            </div>

            {/* optional feedback message */}
            {imageFeedback && (
              <p className="text-green-600 text-sm mt-2">{imageFeedback}</p>
            )}

            {/* thumbnail list */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((url, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={url}
                      alt={`crane ${i + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, idx) => idx !== i))
                      }
                      className="
              absolute top-1 right-1 p-1 bg-black bg-opacity-50 text-white 
              rounded opacity-0 group-hover:opacity-100 transition-opacity
            "
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              required
              className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black"
            >
              <option value="" disabled>
                -- Select status --
              </option>
              <option value="for sale">For Sale</option>
              <option value="for rent">For Rent</option>
            </select>
            <label
              htmlFor="status"
              className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:text-base"
            >
              Status
            </label>
          </div>

          {status === "for sale" && (
            <div className="relative">
              <input
                type="number"
                id="salePrice"
                value={salePrice}
                onChange={(event) => setSalePrice(event.target.value)}
                min="0"
                required
                className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black"
              />
              <label
                htmlFor="salePrice"
                className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
              >
                Sale Price (€)
              </label>
            </div>
          )}
          {status === "for rent" && (
            <>
              <div className="relative">
                <input
                  type="number"
                  id="rentAmount"
                  value={rentAmount}
                  onChange={(event) => setRentAmount(event.target.value)}
                  min="0"
                  required
                  className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black"
                />
                <label
                  htmlFor="rentAmount"
                  className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
                >
                  Rent Amount (€)
                </label>
              </div>
              <div className="relative">
                <select
                  id="rentInterval"
                  value={rentInterval}
                  onChange={(event) => setRentInterval(event.target.value)}
                  required
                  className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black"
                >
                  <option value="hour">Hour</option>
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
                <label
                  htmlFor="rentInterval"
                  className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:text-base"
                >
                  Interval
                </label>
              </div>
            </>
          )}
          <AvailabilityRange
            field="availability"
            values={availability}
            setValues={setAvailability}
            label="Available"
          />

          <button
            type="submit"
            className="bg-black text-white py-2 mt-6 rounded cursor-pointer uppercase hover:bg-gray-800 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}

export default EditCraneForm;
