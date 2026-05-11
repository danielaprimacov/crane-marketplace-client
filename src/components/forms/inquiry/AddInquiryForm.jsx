import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { AuthContext } from "../../../context/auth.context";
import { inquiryApi } from "../../../services/inquiriApi";

import InquiryContactFields from "./InquiryContactFields";
import InquiryOptionsSection from "./InquiryOptionsSection";
import InquiryAddressField from "./InquiryAddressField";

import {
  initialInquiryState,
  buildInquiryRequestBody,
} from "../../../utils/inquiryHelpers";

function getErrorMessage(error) {
  const responseData = error?.response?.data;

  if (responseData?.message) {
    return responseData.message;
  }

  if (responseData?.details) {
    const firstDetail = Object.values(responseData.details)[0];

    if (firstDetail) {
      return firstDetail;
    }
  }

  return "Something went wrong. Please try again.";
}

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

    if (submitting) return;

    const requestBody = buildInquiryRequestBody(form, craneId);

    try {
      setSubmitting(true);

      await inquiryApi.create(requestBody);

      toast.success("Inquiry sent successfully.");
      navigate(`/cranes/${craneId}`, { replace: true });
    } catch (error) {
      console.error("Failed to create inquiry:", error);
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const needsAddress = form.needsTransport || form.needsInstallation;

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4 sm:mt-10 sm:px-6 lg:px-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:p-8"
      >
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
          className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-black px-4 py-3 text-sm font-medium uppercase text-white tracking-wide transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
        >
          {submitting ? "Sending..." : "Send Inquiry"}
        </button>
      </form>

      <div className="mt-5 text-center">
        <Link
          to={`/cranes/${craneId}`}
          replace
          className="inline-flex max-w-full items-center justify-center text-sm transition text-red-600 hover:underline sm:text-base"
        >
          <span className="truncate">
            ← Back to {(crane && crane.title) || "crane"} Details
          </span>
        </Link>
      </div>
    </div>
  );
}

export default AddInquiryForm;
