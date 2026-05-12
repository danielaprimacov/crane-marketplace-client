function Badge({ count, className = "" }) {
  if (!count || count <= 0) return null;

  const displayCount = count > 99 ? "99+" : count;

  return (
    <span
      className={`absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white sm:h-5 sm:min-w-5 sm:text-xs ${className}`}
    >
      {displayCount}
    </span>
  );
}

export default Badge;
