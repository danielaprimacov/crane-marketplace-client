import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const API_URL = import.meta.env.VITE_API_URL;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  topics: {
    newListings: false,
    industryInsights: false,
    safetyCompliance: false,
    maintenanceService: false,
    financingLeasing: false,
  },
  agreeComm: false,
  agreeNewsletter: false,
  website: "", // honeypot field
};

const TOPIC_OPTIONS = [
  {
    key: "newListings",
    label: "New Crane Listings",
  },
  {
    key: "industryInsights",
    label: "Industry Insights",
  },
  {
    key: "safetyCompliance",
    label: "Safety & Compliance",
  },
  {
    key: "maintenanceService",
    label: "Maintenance & Service",
  },
  {
    key: "financingLeasing",
    label: "Financing & Leasing Offers",
  },
];

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

function NewsletterForm({ onClose }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const recaptchaRef = useRef(null);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in form.topics) {
      setForm((currentForm) => ({
        ...currentForm,
        topics: {
          ...currentForm.topics,
          [name]: checked,
        },
      }));
      return;
    }

    if (type === "checkbox") {
      setForm((currentForm) => ({
        ...currentForm,
        [name]: checked,
      }));
      return;
    }

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const resetCaptcha = () => {
    setRecaptchaToken("");
    recaptchaRef.current?.reset();
  };

  const handleClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    onClose?.();
  };

  const validateForm = () => {
    const selectedTopics = Object.entries(form.topics)
      .filter(([, checked]) => checked)
      .map(([topic]) => topic);

    if (!form.firstName.trim()) return "First name is required.";
    if (!form.lastName.trim()) return "Last name is required.";
    if (!form.email.trim()) return "Email is required.";

    if (selectedTopics.length === 0) {
      return "Please select at least one newsletter topic.";
    }

    if (!form.agreeComm) {
      return "Please confirm that you agree to receive communications from KranHub.";
    }

    if (!form.agreeNewsletter) {
      return "Please confirm that you agree to receive the newsletter.";
    }

    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      return "Please complete the reCAPTCHA verification.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    const selectedTopics = Object.entries(form.topics)
      .filter(([, checked]) => checked)
      .map(([topic]) => topic);

    const payload = {
      formType: "newsletter",
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      topics: selectedTopics,
      agreeComm: form.agreeComm,
      agreeNewsletter: form.agreeNewsletter,
      recaptchaToken,
      website: form.website.trim(), // honeypot
    };

    try {
      await axios.post(`${API_URL}/messages`, payload);

      setSuccess("Your newsletter subscription request was sent.");
      setForm(INITIAL_FORM);
      resetCaptcha();

      if (autoCloseOnSuccess && onClose) {
        closeTimerRef.current = setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to submit newsletter form:", error);

      setError(
        error?.response?.data?.message ||
          "There was an error submitting the form. Please try again."
      );

      resetCaptcha();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col px-5 py-7 sm:px-8"
    >
      <div className="mb-8 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-red-600">
          Newsletter
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Subscribe to our Newsletter
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Get product news, crane listings, offers, and industry updates
          straight to your inbox.
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

      {/* Honeypot: hidden from users, visible to simple bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="newsletter-website">Website</label>
        <input
          id="newsletter-website"
          name="website"
          type="text"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <FloatingInput
            id="newsletter-first-name"
            name="firstName"
            label="First name *"
            value={form.firstName}
            onChange={handleChange}
            required
            autoComplete="given-name"
          />

          <FloatingInput
            id="newsletter-last-name"
            name="lastName"
            label="Last name *"
            value={form.lastName}
            onChange={handleChange}
            required
            autoComplete="family-name"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <FloatingInput
            id="newsletter-email"
            name="email"
            type="email"
            label="Email *"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <FloatingInput
            id="newsletter-phone"
            name="phone"
            type="tel"
            label="Mobile phone number"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-gray-900">
            Topics *
          </legend>

          <p className="mt-1 text-sm text-gray-500">
            Select at least one topic you want to receive.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOPIC_OPTIONS.map((topic) => (
              <label
                key={topic.key}
                htmlFor={`newsletter-topic-${topic.key}`}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 text-sm transition hover:border-red-200 hover:bg-red-50/40"
              >
                <input
                  id={`newsletter-topic-${topic.key}`}
                  type="checkbox"
                  name={topic.key}
                  checked={form.topics[topic.key]}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />

                <span className="font-medium text-gray-800">{topic.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-700">
            <input
              type="checkbox"
              name="agreeComm"
              checked={form.agreeComm}
              onChange={handleChange}
              required
              className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-red-600 focus:ring-red-500"
            />

            <span>I agree to receive other communications from KranHub. *</span>
          </label>

          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-700">
            <input
              type="checkbox"
              name="agreeNewsletter"
              checked={form.agreeNewsletter}
              onChange={handleChange}
              required
              className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-red-600 focus:ring-red-500"
            />

            <span>
              I agree that KranHub sends me its newsletter by email. *
              <span className="mt-1 block text-xs leading-5 text-gray-500">
                You can unsubscribe at any time using the link in the email. The
                subscription should normally be confirmed by double opt-in
                before newsletters are sent.
              </span>
            </span>
          </label>
        </div>

        {RECAPTCHA_SITE_KEY ? (
          <div className="flex justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-3">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(token) => setRecaptchaToken(token || "")}
              onExpired={resetCaptcha}
              onErrored={resetCaptcha}
            />
          </div>
        ) : (
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
            reCAPTCHA is not configured. Add{" "}
            <code>VITE_RECAPTCHA_SITE_KEY</code> to your frontend environment.
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
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
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default NewsletterForm;
