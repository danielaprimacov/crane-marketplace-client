import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const baseInputClassName =
  "peer block h-10 w-full border-b border-b-black/20 bg-transparent text-sm text-gray-900 transition focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const baseLabelClassName =
  "absolute left-0 top-0 flex h-10 items-center text-base text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:h-auto peer-focus:text-sm peer-focus:text-black/50 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:h-auto peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-black/50";

const fixedLabelClassName = "absolute left-0 -top-6 text-sm text-gray-500";

const baseSelectClassName =
  "block h-11 w-full appearance-none border-b border-b-black/20 bg-transparent pr-10 text-sm text-gray-900 transition focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const baseTextareaClassName =
  "peer block min-h-24 w-full resize-y border-b border-b-black/20 bg-transparent py-2 text-sm text-gray-900 transition focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const baseTextareaLabelClassName =
  "absolute left-0 top-2 flex items-center text-base text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-black/50 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-black/50";

const baseDateInputClassName =
  "block h-10 w-full border-b border-b-black/20 bg-transparent text-sm text-gray-900 transition focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

function mergeClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function normalizeOption(option) {
  if (option !== null && typeof option === "object") {
    return {
      value: option.value,
      label: option.label ?? String(option.value ?? ""),
    };
  }

  return {
    value: option,
    label: String(option ?? ""),
  };
}

export function FloatingInput({
  id,
  name,
  label,
  type = "text",
  value = "",
  onChange,
  required = false,
  autoComplete,
  disabled = false,
  maxLength,
  minLength,
  min,
  max,
  step,
  inputClassName = "",
  labelClassName = "",
  wrapperClassName = "",
}) {
  return (
    <div className={mergeClassNames("relative", wrapperClassName)}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        autoComplete={autoComplete}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        min={min}
        max={max}
        step={step}
        className={mergeClassNames(baseInputClassName, inputClassName)}
      />

      <label
        htmlFor={id}
        className={mergeClassNames(baseLabelClassName, labelClassName)}
      >
        {label}
      </label>
    </div>
  );
}

export function FloatingPasswordInput({
  id,
  name,
  label,
  value = "",
  onChange,
  required = false,
  autoComplete = "current-password",
  disabled = false,
  maxLength,
  minLength,
  inputClassName = "",
  labelClassName = "",
  wrapperClassName = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={mergeClassNames("relative", wrapperClassName)}>
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        autoComplete={autoComplete}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        className={mergeClassNames(baseInputClassName, "pr-16", inputClassName)}
      />

      <label
        htmlFor={id}
        className={mergeClassNames(baseLabelClassName, labelClassName)}
      >
        {label}
      </label>

      <button
        type="button"
        aria-label={showPassword ? "Hide password" : "Show password"}
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
        className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-sm text-gray-500 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Eye className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

export function FloatingSelect({
  id,
  name,
  label,
  value = "",
  onChange,
  options = [],
  required = false,
  disabled = false,
  placeholder = "Select...",
  selectClassName = "",
  labelClassName = "",
  wrapperClassName = "",
}) {
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <div className={mergeClassNames("relative", wrapperClassName)}>
      <label
        htmlFor={id}
        className={mergeClassNames(fixedLabelClassName, labelClassName)}
      >
        {label}
      </label>

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={mergeClassNames(baseSelectClassName, selectClassName)}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {safeOptions.map((option) => {
          const normalized = normalizeOption(option);

          return (
            <option key={String(normalized.value)} value={normalized.value}>
              {normalized.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function FloatingTextarea({
  id,
  name,
  label,
  value = "",
  onChange,
  required = false,
  rows = 3,
  maxLength,
  minLength,
  disabled = false,
  textareaClassName = "",
  labelClassName = "",
  wrapperClassName = "",
}) {
  return (
    <div className={mergeClassNames("relative", wrapperClassName)}>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
        className={mergeClassNames(baseTextareaClassName, textareaClassName)}
      />

      <label
        htmlFor={id}
        className={mergeClassNames(baseTextareaLabelClassName, labelClassName)}
      >
        {label}
      </label>
    </div>
  );
}

export function FloatingDateInput({
  id,
  name,
  label,
  value = "",
  onChange,
  required = false,
  disabled = false,
  min,
  max,
  inputClassName = "",
  labelClassName = "",
  wrapperClassName = "",
}) {
  return (
    <div className={mergeClassNames("relative", wrapperClassName)}>
      <input
        id={id}
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        className={mergeClassNames(baseDateInputClassName, inputClassName)}
      />

      <label
        htmlFor={id}
        className={mergeClassNames(fixedLabelClassName, labelClassName)}
      >
        {label}
      </label>
    </div>
  );
}
