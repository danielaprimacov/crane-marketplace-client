import { Link } from "react-router-dom";

function IconLink({ to, children, label, className = "" }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition hover:bg-gray-100 sm:h-10 sm:w-10 ${className}`}
    >
      {children}
    </Link>
  );
}

export default IconLink;
