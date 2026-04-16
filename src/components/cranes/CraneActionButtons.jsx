import { Link } from "react-router-dom";

function CraneActionButtons({
  craneId,
  canSendInquiry,
  canManage,
  onDeleteClick,
}) {
  return (
    <>
      {canSendInquiry && (
        <Link
          to={`/cranes/${craneId}/new-inquiry`}
          replace
          className="bg-orange-500 text-lg text-white py-1 px-4 cursor-pointer rounded hover:bg-orange-400 transition inline-flex items-center justify-center"
        >
          Send Inquiry
        </Link>
      )}

      {canManage && (
        <div className="mt-8 flex gap-4">
          <Link
            to={`/cranes/edit/${craneId}`}
            className="flex-1 bg-green-600 text-white py-2 text-center rounded hover:bg-green-500 transition"
          >
            Edit
          </Link>

          <button
            onClick={onDeleteClick}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-500 transition"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
}

export default CraneActionButtons;
