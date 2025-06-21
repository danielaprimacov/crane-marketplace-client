import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import AvailabilityRange from "../components/AvailabilityRange";

const API_URL = "http://localhost:5005";

function NewInquiryPage() {
  const { craneId } = useParams();

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [period, setPeriod] = useState({
    periodStart: "",
    periodEnd: "",
  });
  const [address, setAddress] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    const storedToken = localStorage.getItem("authToken");

    const requestBody = {
      customerName,
      email,
      message,
      address,
      crane: craneId,
    };

    if (period.periodStart && period.periodEnd) {
      requestBody.period = {
        from: new Date(period.periodStart),
        to: new Date(period.periodEnd),
      };
    }

    try {
      await axios.post(`${API_URL}/inquiries`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setSuccessMessage("✅ Your inquiry has been sent!");
      setTimeout(() => setSuccessMessage(""), 3000);

      setCustomerName("");
      setEmail("");
      setMessage("");
      setAddress("");
      setPeriod({ periodStart: "", periodEnd: "" });
    } catch (error) {
      console.error("Failed to create inquiry:", error);
      setErrorMessage("❌ Something went wrong. Please try again.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div>
      New Inquiry for {craneId}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            required
            minLength={2}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            minLength={5}
          />
        </div>
        <div>
          <AvailabilityRange
            availability={period}
            setAvailability={setPeriod}
            usedFor="Period"
          />
        </div>
        <div>
          <label htmlFor="address">Address (optional)</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>

        <button type="submit">Send Inquiry</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <Link to={`/cranes/${craneId}`}>Back</Link>
    </div>
  );
}

export default NewInquiryPage;
