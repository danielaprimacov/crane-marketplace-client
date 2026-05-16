import { useState, useEffect, useRef } from "react";

import { messageApi } from "../../../services/messageApi";

import { FloatingInput, FloatingTextarea } from "../../ui/form/FloatingFields";

const INITIAL_FORM = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectDetails: "",
};

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

  return "There was an error. Please try again later.";
}

function ExpertForm({ onClose, autoCloseOnSuccess = true }) {
  const [form, setForm] = useState(INITIAL_FORM);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const closeTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setError("");
    setSuccess("");

    const payload = {
      formType: "expert",
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim().toLocaleLowerCase(),
      phone: form.phone.trim(),
      projectDetails: form.projectDetails.trim(),
    };

    if (!payload.name) {
      setError("Name is required.");
      setSubmitting(false);
      return;
    }

    if (!payload.email) {
      setError("Email is required.");
      setSubmitting(false);
      return;
    }

    if (!payload.projectDetails) {
      setError("Project details are required.");
      setSubmitting(false);
      return;
    }

    try {
      await messageApi.create(payload);

      setSuccess("✅ Your request has been sent!");
      setForm(INITIAL_FORM);

      if (autoCloseOnSuccess && onClose) {
        closeTimerRef.current = setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to send expert request:", err);
      setError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-xl mx-auto px-5 py-7 sm:px-8"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-center tracking-tight text-gray-300 sm:text-3xl">
          Expert Advice
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Send us your project details and we will help you choose a suitable
          crane.
        </p>
      </div>

      {/* success / error messages */}
      {success && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-center text-sm text-green-700">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-8">
        <FloatingInput
          id="expert-name"
          name="name"
          label="Name *"
          value={form.name}
          onChange={handleChange}
          required
          minLength={1}
          maxLength={150}
          autoComplete="name"
        />

        <FloatingInput
          id="expert-company"
          name="company"
          label="Company"
          value={form.company}
          onChange={handleChange}
          maxLength={150}
          autoComplete="organization"
        />

        <FloatingInput
          id="expert-email"
          name="email"
          type="email"
          label="Email *"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />

        <FloatingInput
          id="expert-phone"
          name="phone"
          type="tel"
          label="Phone"
          value={form.phone}
          onChange={handleChange}
          maxLength={50}
          autoComplete="tel"
        />

        <FloatingTextarea
          id="expert-project-details"
          name="projectDetails"
          label="Project details *"
          value={form.projectDetails}
          onChange={handleChange}
          required
          minLength={1}
          maxLength={5000}
          rows={4}
          extareaClassName="resize-none"
        />
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleClose}
          disabled={submitting}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-black px-5 text-sm font-semibold uppercase text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}

export default ExpertForm;
