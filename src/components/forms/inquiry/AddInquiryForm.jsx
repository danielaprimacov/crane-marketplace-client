import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import { AuthContext } from "../../../context/auth.context";

import InquiryContactFields from "./InquiryContactFields";
import InquiryOptionsSection from "./InquiryOptionsSection";
import InquiryAddressField from "./InquiryAddressField";

import {
  initialInquiryState,
  buildInquiryRequestBody,
} from "./inquiryFormHelpers";

const API_URL = import.meta.env.VITE_API_URL;

function AddInquiryForm({ craneId, crane }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState(initialInquiryState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;

    setForm((prev) => ({
      ...prev,
      customerName: prev.customerName || user.name || "",
      email: prev.email || user.email || "",
    }));
  }, [user]);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const storedToken = localStorage.getItem("authToken");

    const requestBody = buildInquiryRequestBody(form, craneId);

    const config = storedToken
      ? {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      : {};

    try {
      setSubmitting(true);

      await axios.post(`${API_URL}/inquiries`, requestBody, config);

      toast.success("Inquiry sent successfully.");
      navigate(`/cranes/${craneId}`, { replace: true });
    } catch (error) {
      console.error("Failed to create inquiry:", error);

      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const needsAddress = form.needsTransport || form.needsInstallation;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <InquiryContactFields form={form} updateField={updateField} />

        <InquiryOptionsSection form={form} setForm={setForm} />

        {needsAddress && (
          <InquiryAddressField
            address={form.address}
            updateField={updateField}
            required
          />
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-black py-2 uppercase text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send Inquiry"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to={`/cranes/${craneId}`}
          replace
          className="inline-block text-red-600 hover:underline"
        >
          ← Back to {crane && crane.title} Details
        </Link>
      </div>
    </div>
  );
}

export default AddInquiryForm;
