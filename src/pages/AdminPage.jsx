import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <>
      <Link to="/admin/inquiries">
        <button>All Inquiries</button>
      </Link>
      <Link to="/admin/cranes">
        <button>All Cranes</button>
      </Link>
    </>
  );
}

export default AdminPage;
