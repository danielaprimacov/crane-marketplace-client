import { Link } from "react-router-dom";

function CraneInquiryButton({ craneId }) {
  return (
    <Link
      to={`/cranes/${craneId}/new-inquiry`}
      replace
      className="w-full inline-flex items-center justify-center rounded bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-400 sm:w-auto"
    >
      Send Inquiry
    </Link>
  );
}

export default CraneInquiryButton;
