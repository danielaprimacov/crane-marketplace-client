import { useState, useMemo } from "react";

const STORAGE_KEY = "kranhub_cookie_preferences";

const DEFAULT_OPTIONS = {
  required: true,
  statistics: false,
  career: false,
  googleMaps: false,
};

const COOKIE_CATEGORIES = [
  {
    key: "required",
    title: "Required Cookies",
    description:
      "Necessary for basic website functions such as security, page navigation, forms, and session handling.",
    required: true,
  },
  {
    key: "statistics",
    title: "Statistics",
    description:
      "Helps us understand how visitors use the website so we can improve performance and usability.",
  },
  {
    key: "career",
    title: "Career & Recruiting",
    description:
      "Allows career-related integrations or tools to work correctly when they are used on the website.",
  },
  {
    key: "googleMaps",
    title: "Google Maps",
    description:
      "Allows embedded map content and location-related features to be loaded.",
  },
];

function saveCookiePreferences(preferences) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...preferences,
      savedAt: new Date().toISOString(),
    })
  );

  window.dispatchEvent(
    new CustomEvent("cookie-preferences-updated", {
      detail: preferences,
    })
  );
}

function ToggleSwitch({ checked, disabled, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
        checked ? "bg-red-600" : "bg-gray-300"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function CookieForm({ onClose, onSave }) {
  const [options, setOptions] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_OPTIONS;

      const parsed = JSON.parse(stored);

      return {
        ...DEFAULT_OPTIONS,
        statistics: Boolean(parsed.statistics),
        career: Boolean(parsed.career),
        googleMaps: Boolean(parsed.googleMaps),
      };
    } catch {
      return DEFAULT_OPTIONS;
    }
  });

  const allOptionalAccepted = useMemo(() => {
    return COOKIE_CATEGORIES.every((category) => {
      if (category.required) return true;
      return options[category.key];
    });
  }, [options]);

  const toggle = (key) => {
    if (key === "required") return;
    setOptions((currentOptions) => ({
      ...currentOptions,
      [key]: !currentOptions[key],
    }));
  };

  const finish = (preferences) => {
    const finalPreferences = {
      ...DEFAULT_OPTIONS,
      ...preferences,
      required: true,
    };

    saveCookiePreferences(finalPreferences);
    onSave?.(finalPreferences);
    onClose?.();
  };

  const handleSaveSelection = (event) => {
    event.preventDefault();
    finish(options);
  };

  const handleAcceptAll = () => {
    finish({
      required: true,
      statistics: true,
      career: true,
      googleMaps: true,
    });
  };

  const handleRejectOptional = () => {
    finish(DEFAULT_OPTIONS);
  };
  return (
    <form
      onSubmit={handleSaveSelection}
      className="mx-auto flex w-full max-w-xl flex-col px-5 py-7 sm:px-8"
    >
      <div className="mb-7 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-red-600">
          Privacy settings
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
          Cookie Settings
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Choose which optional cookies you want to allow. Required cookies are
          always active because the website cannot function properly without
          them.
        </p>
      </div>

      <fieldset className="space-y-4">
        <legend className="sr-only">Cookie categories</legend>

        {COOKIE_CATEGORIES.map((category) => {
          const checked = Boolean(options[category.key]);

          return (
            <div
              key={category.key}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <label
                    htmlFor={`cookie-${category.key}`}
                    className="block text-sm font-semibold text-gray-900"
                  >
                    {category.title}
                  </label>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {category.description}
                  </p>

                  {category.required && (
                    <p className="mt-2 text-xs font-medium text-gray-400">
                      Always active
                    </p>
                  )}
                </div>

                <ToggleSwitch
                  checked={checked}
                  disabled={category.required}
                  label={category.title}
                  onChange={() => toggle(category.key)}
                />
              </div>

              <input
                id={`cookie-${category.key}`}
                type="checkbox"
                checked={checked}
                disabled={category.required}
                onChange={() => toggle(category.key)}
                className="sr-only"
              />
            </div>
          );
        })}
      </fieldset>

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={handleRejectOptional}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Reject optional
        </button>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-black px-4 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Save selection
        </button>

        <button
          type="button"
          onClick={handleAcceptAll}
          disabled={allOptionalAccepted}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Accept all
        </button>
      </div>
    </form>
  );
}

export default CookieForm;
