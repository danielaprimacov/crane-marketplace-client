import { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const INITIAL_FORM = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectDetails: "",
};

function FloatingInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  autoComplete,
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        autoComplete={autoComplete}
        className="peer block h-10 w-full border-b border-b-black/20 bg-transparent text-sm text-gray-900 transition focus:border-black focus:outline-none"
      />

      <label
        htmlFor={id}
        className="absolute left-0 top-0 flex h-10 items-center text-base text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-black/50 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-black/50"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        rows={4}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer block min-h-28 w-full resize-none border-b border-b-black/20 bg-transparent pt-2 text-sm text-gray-900 transition focus:border-black focus:outline-none"
      />

      <label
        htmlFor={id}
        className="absolute left-0 top-2 flex items-center text-base text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-black/50 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-black/50"
      >
        {label}
      </label>
    </div>
  );
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

  const handleChange = (e) => {
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
      email: form.email.trim(),
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
      await axios.post(`${API_URL}/messages`, payload);

      setSuccess("✅ Your request has been sent!");
      setForm(INITIAL_FORM);

      if (autoCloseOnSuccess && onClose) {
        closeTimerRef.current = setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to send expert request:", err);
      setError(
        err.response?.data?.message ||
          "There was an error. Please try again later."
      );
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
          autoComplete="name"
        />

        <FloatingInput
          id="expert-company"
          name="company"
          label="Company"
          value={form.company}
          onChange={handleChange}
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
          autoComplete="tel"
        />

        <FloatingTextarea
          id="expert-project-details"
          name="projectDetails"
          label="Project details *"
          value={form.projectDetails}
          onChange={handleChange}
          required
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
