import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import AvailabilityRange from "../components/AvailabilityRange";

const API_URL = "http://localhost:5005";

function EditCraneDetailsPage() {
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
      await axios.put(`${API_URL}/cranes/${craneId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      navigate(`/cranes/${craneId}`);
    } catch (error) {
      console.error("Failed to create crane:", error);
    }
  };

  return (
    <div>
      <h2>Edit the Crane Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="producer">Producer:</label>
          <input
            type="producer"
            id="producer"
            value={producer}
            onChange={(event) => setProducer(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="seriesCode">Series Code:</label>
          <input
            type="text"
            id="seriesCode"
            value={seriesCode}
            onChange={(event) => setSeriesCode(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="capacityClassNumber">Capacity (t):</label>
          <input
            type="number"
            id="capacityClassNumber"
            value={capacityClassNumber}
            onChange={(event) => setCapacityClassNumber(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="capacity">Max Capacity (t):</label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
            min="0"
            step="0.1"
            placeholder="e.g. 102.5"
          />
        </div>
        <div>
          <label htmlFor="height">Max Height (m):</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            min="0"
            step="0.1"
            required
          />
        </div>
        <div>
          <label htmlFor="variantRevision">Variant / Revision:</label>
          <input
            type="text"
            id="variantRevision"
            value={variantRevision}
            onChange={(event) => setVariantRevision(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="radius">Max Radius (m):</label>
          <input
            type="number"
            id="radius"
            value={radius}
            onChange={(event) => setRadius(event.target.value)}
            min="0"
            step="0.1"
            required
          />
        </div>
        <div>
          <label htmlFor="newImageUrl">Image URL:</label>
          <input
            type="url"
            id="newImageUrl"
            placeholder="https://..."
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
                <img src={url} alt={`crane ${i + 1}`} />
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
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
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
            <label htmlFor="salePrice">Sale Price (€):</label>
            <input
              type="number"
              id="salePrice"
              value={salePrice}
              onChange={(event) => setSalePrice(event.target.value)}
              min="0"
              required
            />
          </div>
        )}
        {status === "for rent" && (
          <>
            <div>
              <label htmlFor="rentAmount">Rent Amount (€):</label>
              <input
                type="number"
                id="rentAmount"
                value={rentAmount}
                onChange={(event) => setRentAmount(event.target.value)}
                min="0"
                required
              />
            </div>
            <div>
              <label htmlFor="rentInterval">Interval:</label>
              <select
                id="rentInterval"
                value={rentInterval}
                onChange={(event) => setRentInterval(event.target.value)}
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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditCraneDetailsPage;
