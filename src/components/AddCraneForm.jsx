import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AvailabilityRange from "./AvailabilityRange";

import { slugify } from "../utils/helpers";

const API_URL = "http://localhost:5005";

function AddCraneForm() {
  const [producer, setProducer] = useState("");
  const [seriesCode, setSeriesCode] = useState("");
  const [capacityClassNumber, setCapacityClassNumber] = useState("");
  const [variantRevision, setVariantRevision] = useState("");
  const [capacity, setCapacity] = useState("");
  const [height, setHeight] = useState("");
  const [radius, setRadius] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [rentInterval, setRentInterval] = useState("day");
  const [images, setImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [availability, setAvailability] = useState({
    availabilityStart: "",
    availabilityEnd: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [imageFeedback, setImageFeedback] = useState("");
  const [newProducerSlug, setNewProducerSlug] = useState("");

  const handleAddImage = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    setImages((prev) => [...prev, url]);
    setNewImageUrl("");

    setImageFeedback("✅ Image added!");
    setTimeout(() => setImageFeedback(""), 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    if (status === "for sale" && salePrice === "") {
      return alert("Please enter a sale price.");
    }
    if (status === "for rent" && rentAmount === "") {
      return alert("Please enter a rent amount.");
    }

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
      // Send POST and await response
      await axios.post(`${API_URL}/cranes`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      const slug = slugify(producer);
      setNewProducerSlug(slug);

      // On success, reset form and refresh list
      setIsSuccess(true);
      setProducer("");
      setSeriesCode("");
      setCapacityClassNumber("");
      setCapacity("");
      setHeight("");
      setRadius("");
      setVariantRevision("");
      setImages([]);
      setNewImageUrl("");
      setDescription("");
      setSalePrice("");
      setRentAmount("");
      setRentInterval("day");
      setLocation("");
      setStatus("");
      setAvailability({ availabilityStart: "", availabilityEnd: "" });
    } catch (error) {
      // Handle or log the error
      console.error("Failed to create crane:", error);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-full mx-auto mt-30 text-center mb-20">
        <p className="text-green-600 text-2xl mb-10 tracking-widest">
          ✅ Your crane was added successfully!
        </p>
        <Link
          to={`/cranes/producers/${encodeURIComponent(newProducerSlug)}`}
          className="inline-block bg-red-600 text-white text-lg px-4 py-2 rounded hover:bg-red-500 transition"
        >
          View All Cranes
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl uppercase mx-auto mb-5 border-b pb-3 border-b-red-600">
        Add your own crane
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-2xl mx-auto mt-10"
      >
        <div className="flex gap-6">
          {/* Producer */}
          <div className="relative flex-1">
            <input
              id="producer"
              name="producer"
              type="text"
              value={producer}
              onChange={(e) => setProducer(e.target.value)}
              required
              placeholder=" "
              className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
            />
            <label
              htmlFor="producer"
              className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
            >
              Producer
            </label>
          </div>

          {/* Series Code */}
          <div className="relative flex-1">
            <input
              id="seriesCode"
              name="seriesCode"
              type="text"
              value={seriesCode}
              onChange={(e) => setSeriesCode(e.target.value)}
              required
              placeholder=" "
              className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
            />
            <label
              htmlFor="seriesCode"
              className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
            >
              Series Code
            </label>
          </div>
        </div>
        <div className="flex gap-6">
          {/* class capacity */}
          <div className="relative flex-1">
            <input
              id="capacityClassNumber"
              name="capacityClassNumber"
              type="number"
              min={0}
              value={capacityClassNumber}
              onChange={(e) => setCapacityClassNumber(e.target.value)}
              required
              placeholder=" "
              className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
            />
            <label
              htmlFor="capacityClassNumber"
              className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
            >
              Class Capacity (t)
            </label>
          </div>

          {/* max capacity */}
          <div className="relative flex-1">
            <input
              id="capacity"
              name="capacity"
              type="number"
              step="0.1"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder=" "
              className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
            />
            <label
              htmlFor="capacity"
              className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
            >
              Max Capacity (t)
            </label>
          </div>
        </div>

        {/* ── Next, height stays full width ── */}
        <div className="relative">
          <input
            id="height"
            name="height"
            type="number"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
            placeholder=" "
            className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
          />
          <label
            htmlFor="height"
            className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
          >
            Max Height (m)
          </label>
        </div>

        {/* ── Now Variant + Max Radius side by side ── */}
        <div className="flex gap-6">
          {/* variant revision */}
          <div className="relative flex-1">
            <input
              id="variantRevision"
              name="variantRevision"
              type="text"
              value={variantRevision}
              onChange={(e) => setVariantRevision(e.target.value)}
              placeholder=" "
              className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
            />
            <label
              htmlFor="variantRevision"
              className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
            >
              Variant / Revision
            </label>
          </div>

          {/* max radius */}
          <div className="relative flex-1">
            <input
              id="radius"
              name="radius"
              type="number"
              step="0.1"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              required
              placeholder=" "
              className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
            />
            <label
              htmlFor="radius"
              className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
            >
              Max Radius (m)
            </label>
          </div>
        </div>
        {[
          {
            id: "description",
            type: "text",
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
        ].map(
          ({
            id,
            type,
            label,
            value,
            onChange,
            required,
            step,
            placeholder,
          }) => (
            <div key={id} className="relative">
              <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                step={step}
                placeholder=" "
                className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
              />
              <label
                htmlFor={id}
                className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
              >
                {label}
              </label>
            </div>
          )
        )}

        {/* Status select */}
        <div className="relative">
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black"
          >
            <option value="" disabled>
              -- Select Status --
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

        {/* Conditional pricing fields */}
        {status === "for sale" && (
          <div className="relative">
            <input
              id="salePrice"
              name="salePrice"
              type="number"
              min={0}
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              required
              placeholder=" "
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
                id="rentAmount"
                name="rentAmount"
                type="number"
                min={0}
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                required
                placeholder=" "
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
                name="rentInterval"
                value={rentInterval}
                onChange={(e) => setRentInterval(e.target.value)}
                required
                className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black"
              >
                <option value="" disabled>
                  -- Interval --
                </option>
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

        {/* Images uploader */}
        <div className="mb-8 flex items-center gap-4">
          {/* Input + floating label */}
          <div className="relative flex-1">
            <input
              id="newImageUrl"
              name="newImageUrl"
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder=" "
              className="peer block w-full h-10 bg-transparent border-b border-b-black/20 focus:outline-none focus:border-black transition"
            />
            <label
              htmlFor="newImageUrl"
              className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
            >
              Image URL
            </label>
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={handleAddImage}
            className="px-5 py-2 rounded-md cursor-pointer text-sm bg-red-600 text-white hover:bg-red-500 transition-colors duration-300"
          >
            Add Image
          </button>
        </div>
        {imageFeedback && (
          <p className="text-green-600 text-sm mb-1">{imageFeedback}</p>
        )}

        {/* AvailabilityRange  */}
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
          Add Crane
        </button>
      </form>
    </>
  );
}

export default AddCraneForm;
