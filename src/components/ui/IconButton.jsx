function IconButton({
  children,
  label,
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className={`inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 sm:h-10 sm:w-10 ${className}`}
    >
      {children}
    </button>
  );
}

export default IconButton;
