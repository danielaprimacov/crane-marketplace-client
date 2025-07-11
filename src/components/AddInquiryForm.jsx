import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth.context";

import AvailabilityRange from "./AvailabilityRange";

const API_URL = import.meta.env.VITE_API_URL;

function AddInquiryForm({ craneId }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [period, setPeriod] = useState({
    periodStart: "",
    periodEnd: "",
  });
  const [address, setAddress] = useState("");

  const [needsTransport, setNeedsTransport] = useState(false);
  const [needsInstallation, setNeedsInstallation] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [crane, setCrane] = useState(null);

  useEffect(() => {
    if (user) {
      setCustomerName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    async function fetchCrane() {
      try {
        const { data } = await axios.get(`${API_URL}/cranes/${craneId}`);
        setCrane(data);
      } catch (err) {
        console.error("Could not load crane details:", err);
      }
    }
    fetchCrane();
  }, [craneId]);

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
      needsTransport,
      needsInstallation,
    };

    if (period.periodStart && period.periodEnd) {
      requestBody.period = {
        from: new Date(period.periodStart),
        to: new Date(period.periodEnd),
      };
    }

    if (needsTransport || needsInstallation) {
      requestBody.address = address;
    }

    try {
      await axios.post(`${API_URL}/inquiries`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setSuccessMessage("✅ Your inquiry has been sent!");
      setTimeout(() => {
        navigate(`/cranes/${craneId}`, { replace: true });
      }, 3000);

      setCustomerName("");
      setEmail("");
      setMessage("");
      setAddress("");
      setPeriod({ periodStart: "", periodEnd: "" });
      setNeedsTransport(false);
      setNeedsInstallation(false);
    } catch (error) {
      console.error("Failed to create inquiry:", error);
      setErrorMessage("❌ Something went wrong. Please try again.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {successMessage && (
        <p className="text-green-600 text-center mb-4">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 text-center mb-4">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="relative mb-8">
          <input
            type="text"
            id="name"
            name="name"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            required
            minLength={2}
            placeholder=" "
            className="peer block w-full h-10 bg-transparent border-b border-b-black/20 focus:outline-none focus:border-black transition"
          />
          <label
            htmlFor="customerName"
            className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
          >
            Your Name
          </label>
        </div>
        <div className="relative mb-8">
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder=" "
            className="peer block w-full h-10 bg-transparent border-b border-b-black/20 focus:outline-none focus:border-black transition"
          />
          <label
            htmlFor="email"
            className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
          >
            Email Address
          </label>
        </div>
        <div className="relative mb-5">
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            minLength={5}
            rows={3}
            className="peer block w-full bg-transparent border-b border-b-black/20 focus:outline-none focus:border-black transition resize-none"
          />
          <label
            htmlFor="message"
            className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
          >
            Message
          </label>
        </div>
        <div>
          <AvailabilityRange
            field="period"
            values={period}
            setValues={setPeriod}
            label="Period"
          />
        </div>
        <div className="flex justify-between mb-8">
          {/* Transportation checkbox */}
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={needsTransport}
              onChange={(e) => setNeedsTransport(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">I need transportation</span>
          </label>

          {/* Installation / Disassembly checkbox */}
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={needsInstallation}
              onChange={(e) => setNeedsInstallation(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">
              I need installation / disassembly
            </span>
          </label>
        </div>

        {(needsTransport || needsInstallation) && (
          <>
            <div className="relative mb-8">
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
                placeholder=" "
                className="peer block w-full h-10 bg-transparent border-b border-b-black/20 focus:outline-none focus:border-black transition"
              />
              <label
                htmlFor="address"
                className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
              >
                Address
              </label>
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-black text-white py-2 rounded uppercase cursor-pointer hover:bg-orange-600 transition"
        >
          Send Inquiry
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to={`/cranes/${craneId}`}
          className="inline-block text-red-600 hover:underline"
        >
          ← Back to {crane && crane.title} Details
        </Link>
      </div>
    </div>
  );
}

export default AddInquiryForm;
