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
  inputClassName = "",
  labelClassName = "",
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
        maxLength={maxLength}
        className={`peer block h-10 w-full border-b border-b-black/20 bg-transparent text-sm text-gray-900 transition focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${inputClassName}`}
      />

      <label
        htmlFor={id}
        className={`absolute left-0 top-0 flex h-10 items-center text-base text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:h-auto peer-focus:text-sm peer-focus:text-black/50 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:h-auto peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-black/50 ${labelClassName}`}
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
  selectClassName = "",
  labelClassName = "",
}) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-0 -top-6 text-sm text-gray-500 ${labelClassName}`}
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
        className={`block h-11 w-full appearance-none border-b border-b-black/20 bg-transparent pr-10 text-sm text-gray-900 transition focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${selectClassName}`}
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
  textareaClassName = "",
  labelClassName = "",
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
        className={`peer block min-h-24 w-full resize-y border-b border-b-black/20 bg-transparent py-2 text-sm text-gray-900 transition focus:border-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${textareaClassName}`}
      />

      <label
        htmlFor={id}
        className={`absolute left-0 top-2 flex items-center text-base text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-black/50 peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-black/50 ${labelClassName}`}
      >
        {label}
      </label>
    </div>
  );
}
