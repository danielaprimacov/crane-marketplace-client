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
        disabled={disabled}
        className="peer block h-6 w-full border-b border-b-black/20 bg-transparent text-sm text-gray-900 transition focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
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
}) {
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
        disabled={disabled}
        className="block h-6 w-full border-b border-b-black/20 bg-transparent text-sm text-gray-900 transition focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => {
          const optionValue =
            typeof option === "string" ? option : option.value;

          const optionLabel =
            typeof option === "string" ? option : option.label;

          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
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
  disabled = false,
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        maxLength={maxLength}
        disabled={disabled}
        className="peer block min-h-5 w-full resize-none border-b border-b-black/20 bg-transparent pt-2 text-sm text-gray-900 transition focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
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
