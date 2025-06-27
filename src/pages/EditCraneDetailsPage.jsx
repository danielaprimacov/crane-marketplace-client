import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import AvailabilityRange from "../components/AvailabilityRange";

const API_URL = "http://localhost:5005";

function EditCraneDetailsPage() {
  const { craneId } = useParams();

  const [title, setTitle] = useState("");
  const [producer, setProducer] = useState("");
  const [images, setImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
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
      setTitle(crane.title);
      setProducer(crane.producer);
      setImages(crane.images || []);
      setDescription(crane.description);
      setPrice(crane.price);
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
      title,
      producer,
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
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
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
          <label htmlFor="price">Price (€):</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            min="0"
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
