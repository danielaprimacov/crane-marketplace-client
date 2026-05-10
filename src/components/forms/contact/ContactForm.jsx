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

import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../ui/form/FloatingFields";

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
    const { name, value } = e.target;

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
      if (onClose) {
        closeTimerRef.current = setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setError(
        error.response?.data?.message ||
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
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
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
