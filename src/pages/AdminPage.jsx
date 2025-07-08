import { Link, useNavigate, useLocation } from "react-router-dom";
import { slugify } from "../utils/helpers.js";

import goBackIcon from "../assets/icons/angle-double-small-left.png";

function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-orange-50 h-screen w-screen">
      {/* Admin Navigation */}
      <div className="pt-10 pl-10">
        <div className="flex justify-evenly items-center">
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
            className="hover:text-orange-600 hover:underline transition duration-300"
          >
            <div>All Inquiries</div>
          </Link>
          <Link
            to="/admin"
            className="hover:text-orange-600 hover:underline transition duration-300"
          >
            <div>All Messages</div>
          </Link>
        </div>
      </div>
      {/* Admin Content - Inquiries or Messages */}
      <div></div>
    </div>
  );
}

export default AdminPage;
