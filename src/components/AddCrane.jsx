import { useState } from "react";
import axios from "axios";

import AvailabilityRange from "./AvailabilityRange";

const API_URL = "http://localhost:5005";

function AddCrane(props) {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [availability, setAvailability] = useState({
    availabilityStart: "",
    availabilityEnd: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    const requestBody = {
      title,
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
      // Send POST and await response
      await axios.post(`${API_URL}/cranes`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      // On success, reset form and refresh list
      setTitle("");
      setImages([]);
      setDescription("");
      setPrice(0);
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
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <label htmlFor="images">Images:</label>
        <input
          type="url"
          id="images"
          value={images}
          onChange={(event) => setImages(event.target.value)}
          required
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <label html="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <label html="location">Location:</label>
        <input
          type="location"
          id="location"
          name="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          required
        />
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
        <AvailabilityRange
          availability={availability}
          setAvailability={setAvailability}
        />

        <button type="submit">Add Crane</button>
      </form>
    </div>
  );
}

export default AddCrane;
