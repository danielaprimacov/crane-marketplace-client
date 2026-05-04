import { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const INITIAL_FORM = {
  salutation: "",
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  phone: "",
  message: "",
};

const SALUTATION_OPTIONS = ["Mr.", "Ms.", "Dr."];

const COUNTRY_OPTIONS = ["USA", "Germany", "Poland"];

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
        className="peer block h-6 w-full border-b border-b-black/20 bg-transparent text-sm text-gray-900 transition focus:border-black focus:outline-none"
      />

      <label
        htmlFor={id}
        className="absolute left-0 top-0 flex h-6 items-center text-base text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-black/50 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-black/50"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingSelect({
  id,
  name,
  label,
  value,
  onChange,
  options,
  required = false,
}) {
  const hasValue = Boolean(value);

  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1 block text-sm text-black/50">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="block h-6 w-full border-b border-b-black/20 bg-transparent text-sm text-gray-900 transition focus:border-black focus:outline-none"
      >
        <option value="" disabled>
          Select...
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
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
        rows={3}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer block min-h-5 w-full resize-none border-b border-b-black/20 bg-transparent pt-2 text-sm text-gray-900 transition focus:border-black focus:outline-none"
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

function ContactForm({ onClose }) {
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
      formType: "contact",
      salutation: form.salutation.trim(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      country: form.country.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    };

    if (!payload.salutation) {
      setError("Salutation is required.");
      setSubmitting(false);
      return;
    }

    if (!payload.firstName) {
      setError("First name is required.");
      setSubmitting(false);
      return;
    }

    if (!payload.lastName) {
      setError("Last name is required.");
      setSubmitting(false);
      return;
    }

    if (!payload.email) {
      setError("Email is required.");
      setSubmitting(false);
      return;
    }

    if (!payload.country) {
      setError("Country is required.");
      setSubmitting(false);
      return;
    }

    if (!payload.message) {
      setError("Message is required.");
      setSubmitting(false);
      return;
    }

    try {
      // send to backend
      await axios.post(`${API_URL}/messages`, payload);

      // on success, close the modal
      setSuccess("✅ Your message was sent successfully!");
      setForm(INITIAL_FORM);
      if (autoCloseOnSuccess && onClose) {
        closeTimerRef.current = setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setError(
        err.response?.data?.message ||
          "There was an error submitting the form. Please try again."
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
        <h2 className="text-2xl semifont-bold tracking-tight text-gray-900 sm:text-3xl">
          Contact Us
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Send us your message and we will get back to you.
        </p>
      </div>

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
        <FloatingSelect
          id="contact-salutation"
          name="salutation"
          label="Salutation *"
          value={form.salutation}
          onChange={handleChange}
          options={SALUTATION_OPTIONS}
          required
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <FloatingInput
            id="contact-first-name"
            name="firstName"
            label="First name *"
            value={form.firstName}
            onChange={handleChange}
            required
            autoComplete="given-name"
          />

          <FloatingInput
            id="contact-last-name"
            name="lastName"
            label="Last name *"
            value={form.lastName}
            onChange={handleChange}
            required
            autoComplete="family-name"
          />
        </div>

        <FloatingInput
          id="contact-email"
          name="email"
          type="email"
          label="Email *"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />

        <FloatingSelect
          id="contact-country"
          name="country"
          label="Country *"
          value={form.country}
          onChange={handleChange}
          options={COUNTRY_OPTIONS}
          required
        />

        <FloatingInput
          id="contact-phone"
          name="phone"
          type="tel"
          label="Phone"
          value={form.phone}
          onChange={handleChange}
          autoComplete="tel"
        />

        <FloatingTextarea
          id="contact-message"
          name="message"
          label="Message *"
          value={form.message}
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

export default ContactForm;
