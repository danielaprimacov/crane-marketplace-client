import { Link } from "react-router-dom";

function CraneManageButtons({ craneId, onDeleteClick }) {
  return (
    <div className="mt-8 flex gap-4">
      <Link
        to={`/cranes/edit/${craneId}`}
        className="flex-1 rounded bg-green-600 py-2 text-center text-white cursor-pointer transition hover:bg-green-500"
      >
        Edit
      </Link>

      <button
        type="button"
        onClick={onDeleteClick}
        className="flex-1 rounded bg-red-600 py-2 text-white cursor-pointer transition hover:bg-red-500"
      >
        Delete
      </button>
    </div>
  );
}

export default CraneManageButtons;
