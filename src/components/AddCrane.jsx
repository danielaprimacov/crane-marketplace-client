import { useState } from "react";
import axios from "axios";

import AvailabilityRange from "./AvailabilityRange";

const API_URL = "http://localhost:5005";

function AddCrane(props) {
  const [producer, setProducer] = useState("");
  const [seriesCode, setSeriesCode] = useState("");
  const [capacityClassNumber, setCapacityClassNumber] = useState("");
  const [variantRevision, setVariantRevision] = useState("");
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

  const handleAddImage = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    setImages((prev) => [...prev, url]);
    setNewImageUrl("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const requestBody = {
      producer,
      seriesCode,
      capacityClassNumber: Number(capacityClassNumber),
      variantRevision,
      images,
      description,
      price,
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

      // On success, reset form and refresh list
      setProducer("");
      setSeriesCode("");
      setCapacityClassNumber("");
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
      props.refreshCranes();
    } catch (error) {
      // Handle or log the error
      console.error("Failed to create crane:", error);
    }
  };

  return (
    <div>
      <h2>Add Crane</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="producer">Producer:</label>
          <input
            type="text"
            id="producer"
            name="producer"
            value={producer}
            onChange={(event) => setProducer(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="seriesCode">Series Code</label>
          <input
            id="seriesCode"
            value={seriesCode}
            onChange={(event) => setSeriesCode(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="capacityClassNumber">Capacity (t)</label>
          <input
            id="capacityClassNumber"
            type="number"
            value={capacityClassNumber}
            onChange={(event) => setCapacityClassNumber(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="variantRevision">Variant/Revision</label>
          <input
            id="variantRevision"
            value={variantRevision}
            onChange={(event) => setVariantRevision(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newImageUrl">Image URL:</label>
          <input
            type="url"
            id="newImageUrl"
            name="newImageUrl"
            value={newImageUrl}
            onChange={(event) => setNewImageUrl(event.target.value)}
          />
          <button type="button" onClick={handleAddImage}>
            Add Image
          </button>
        </div>
        {images.length > 0 && (
          <ul>
            {images.map((url, i) => (
              <li key={i}>
                <img src={url} alt={`crane-${i}`} />
                <button
                  type="button"
                  onClick={() =>
                    setImages((prev) => prev.filter((_, idx) => idx !== i))
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div>
          <label html="location">Location:</label>
          <input
            type="location"
            id="location"
            name="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            required
          >
            <option value="" disabled>
              -- Select status --
            </option>
            <option value="for sale">For Sale</option>
            <option value="for rent">For Rent</option>
          </select>
        </div>

        {status === "for sale" && (
          <div>
            <label htmlFor="salePrice">Sale Price (€)</label>
            <input
              id="salePrice"
              type="number"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              required
            />
          </div>
        )}

        {status === "for rent" && (
          <>
            <div>
              <label htmlFor="rentAmount">Rent Amount</label>
              <input
                id="rentAmount"
                type="number"
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="rentInterval">Interval</label>
              <select
                id="rentInterval"
                value={rentInterval}
                onChange={(e) => setRentInterval(e.target.value)}
                required
              >
                <option value="hour">Hour</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
          </>
        )}

        <AvailabilityRange
          field="availability"
          values={availability}
          setValues={setAvailability}
          label="Available"
        />

        <button type="submit">Add Crane</button>
      </form>
    </div>
  );
}

export default AddCrane;
