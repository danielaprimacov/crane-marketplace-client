import { Outlet, Link } from "react-router-dom";

import goBackIcon from "../assets/icons/angle-double-small-left.png";

function AdminLayout() {
  return (
    <div className="bg-orange-50 h-screen w-screen min-h-screen">
      {/* Admin Navigation */}
      <header className="pt-10 px-10">
        <div className="flex justify-evenly border-b border-b-black/30 items-center pb-5">
          {/* Link to back to all cranes */}
          <Link
            to="/cranes/producers/liebherr"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <img src={goBackIcon} alt="back" className="w-5 mr-2" />
            Back
          </Link>
          <Link
            to="/admin/inquiries"
            className="hover:text-orange-600 border-b border-b-transparent hover:border-b-orange-600 transition duration-300"
          >
            <div>All Inquiries</div>
          </Link>
          <Link
            to="/admin/messages"
            className="hover:text-orange-600 border-b border-b-transparent hover:border-b-orange-600 transition duration-300"
          >
            <div>All Messages</div>
          </Link>
        </div>
      </header>

      <main className="px-10">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
