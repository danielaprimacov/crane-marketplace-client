import { useState } from "react";

function CookieForm({ onClose }) {
  const [options, setOptions] = useState({
    required: true,
    statistics: false,
    career: false,
    googleMaps: false,
  });

  const toggle = (key) => {
    if (key === "required") return;
    setOptions((o) => ({ ...o, [key]: !o[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter?.value;
    if (action === "all") {
      // accept everything
      onClose({
        required: true,
        statistics: true,
        career: true,
        googleMaps: true,
      });
    } else {
      // confirm selection
      onClose(options);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Settings</h2>

      <fieldset className="space-y-4 border-t pt-4">
        <legend className="sr-only">Toggle Options</legend>

        {[
          { key: "required", label: "Required Items", disabled: true },
          { key: "statistics", label: "Statistics" },
          { key: "career", label: "Career" },
          { key: "googleMaps", label: "Google Maps" },
        ].map(({ key, label, disabled }) => (
          <div key={key} className="flex items-center gap-3">
            <input
              type="checkbox"
              id={key}
              name={key}
              checked={options[key]}
              disabled={!!disabled}
              onChange={() => toggle(key)}
              className="h-5 w-5 text-red-600 focus:ring-red-500"
            />
            <label
              htmlFor={key}
              className={disabled ? "text-gray-400" : "cursor-pointer"}
            >
              {label}
            </label>
          </div>
        ))}
      </fieldset>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          name="action"
          value="confirm"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Confirm Selection
        </button>
        <button
          type="submit"
          name="action"
          value="all"
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Accept All
        </button>
      </div>
    </form>
  );
}

export default CookieForm;
