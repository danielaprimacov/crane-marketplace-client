import { useState } from "react";

function NewsletterForm({ onClose }) {
  const [form, setForm] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in form.topics) {
      setForm((f) => ({
        ...f,
        topics: { ...f.topics, [name]: checked },
      }));
    } else if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST to your API e.g. axios.post("/messages", { formType: "newsletter", ...form })
    console.log("Newsletter signup:", form);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold">Subscribe to our Newsletter</h2>
      <p className="text-gray-700">
        Get product news, offers & the latest crane events straight to your
        inbox.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {[
          { id: "firstName", label: "First Name*", required: true },
          { id: "lastName", label: "Last Name*", required: true },
        ].map(({ id, label, required }) => (
          <div key={id} className="relative">
            <input
              id={id}
              name={id}
              type="text"
              value={form[id]}
              onChange={handleChange}
              required={required}
              placeholder=" "
              className="peer w-full border-b border-gray-300 focus:border-red-600 outline-none py-2"
            />
            <label
              htmlFor={id}
              className="absolute left-0 -top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm"
            >
              {label}
            </label>
          </div>
        ))}

        {[
          { id: "email", label: "Email*", type: "email", required: true },
          {
            id: "phone",
            label: "Mobile Phone Number",
            type: "tel",
            required: false,
          },
        ].map(({ id, label, type, required }) => (
          <div key={id} className="relative">
            <input
              id={id}
              name={id}
              type={type}
              value={form[id]}
              onChange={handleChange}
              required={required}
              placeholder=" "
              className="peer w-full border-b border-gray-300 focus:border-red-600 outline-none py-2"
            />
            <label
              htmlFor={id}
              className="absolute left-0 -top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm"
            >
              {label}
            </label>
          </div>
        ))}
      </div>

      <fieldset className="space-y-2">
        <legend className="font-semibold">Topics*</legend>
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(form.topics).map(([key, checked]) => {
            const label = {
              newListings: "New Crane Listings",
              industryInsights: "Industry Insights",
              safetyCompliance: "Safety & Compliance",
              maintenanceService: "Maintenance & Service",
              financingLeasing: "Financing & Leasing Offers",
            }[key];
            return (
              <label key={key} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  name={key}
                  checked={checked}
                  onChange={handleChange}
                  required={
                    key === "vehicles" /* at least one? add validation */
                  }
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-4">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="agreeComm"
            checked={form.agreeComm}
            onChange={handleChange}
            required
            className="h-4 w-4 text-red-600 focus:ring-red-500"
          />
          <span>I agree to receive other communications from KranHub.*</span>
        </label>

        <label className="inline-flex items-start gap-2">
          <input
            type="checkbox"
            name="agreeNewsletter"
            checked={form.agreeNewsletter}
            onChange={handleChange}
            required
            className="h-4 w-4 text-red-600 focus:ring-red-500"
          />
          <span>
            I agree that KranHub sends me its newsletter by email.* <br />
            <small className="text-gray-500">
              I confirm I’ve read the Privacy Policy. You can always unsubscribe
              via the link in the email.
            </small>
          </span>
        </label>
      </div>

      {/* reCAPTCHA placeholder */}
      <div className="mt-4">
        {/* TODO: insert your <ReCaptcha /> here */}
        <div className="h-16 bg-gray-100 flex items-center justify-center border border-gray-300">
          reCAPTCHA widget
        </div>
      </div>

      <div className="pt-4 border-t">
        <button
          type="submit"
          className="w-full py-3 bg-black text-white uppercase tracking-widest hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default NewsletterForm;
