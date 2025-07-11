import { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

import goBackIcon from "../assets/icons/angle-double-small-left.png";

function AdminLayout() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [messagesCount, setMessagesCount] = useState(0);

  useEffect(() => {
    // only for admins
    if (!isLoggedIn || user?.role !== "admin") {
      setMessagesCount(0);
      return;
    }
    const fetchMessagesCount = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(`${API_URL}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessagesCount(data.length);
      } catch (err) {
        console.error("Failed to fetch message count", err);
      }
    };

    fetchMessagesCount();
  }, [isLoggedIn, user?.role]);

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
            className="relative block hover:text-orange-600 border-b border-b-transparent hover:border-b-orange-600 transition duration-300"
          >
            <span>All Messages</span>
            {messagesCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {messagesCount}
              </span>
            )}
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
