import { useState, useEffect, useContext, useMemo } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

import { useProducers } from "../../hooks/useProducers";

const API_URL = import.meta.env.VITE_API_URL;

import goBackIcon from "../../assets/icons/angle-double-small-left.png";

function AdminLayout() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { pathname } = useLocation();

  const [messagesCount, setMessagesCount] = useState(0);

  const { producers, loading: producersLoading } = useProducers();
  const firstProducer = producers[0];

  const backTo = useMemo(() => {
    if (producersLoading || !firstProducer) return "/cranes";
    return `/cranes/producers/${firstProducer.slug}`;
  }, [producersLoading, firstProducer]);

  useEffect(() => {
    // only for admins
    if (!isLoggedIn || user?.role !== "admin") {
      setMessagesCount(0);
      return;
    }
    const fetchMessagesCount = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setMessagesCount(0);
          return;
        }

        const { data } = await axios.get(`${API_URL}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessagesCount(data.length);
      } catch (err) {
        console.error("Failed to fetch message count", err);
      }
    };

    fetchMessagesCount();
  }, [isLoggedIn, user?.role, pathname]);

  const adminLinkClass = ({ isActive }) =>
    `relative inline-flex items-center border-b pb-1 text-sm sm:text-base transition ${
      isActive
        ? "border-b-orange-600 text-orange-600"
        : "border-b-transparent hover:border-b-orange-600 hover:text-orange-600"
    }`;

  return (
    <div className="bg-orange-50 min-h-screen">
      {/* Admin Navigation */}
      <header className="px-4 pt-6 sm:px-6 sm:pt-8 lg:px-10 lg:pt-10">
        <div className="border-b border-b-black/30 pb-4 sm:pb-5">
          <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Link to back to all cranes */}
            <Link
              to={backTo} // while producers are loading, fall back to /cranes
              className="w-fit inline-flex items-center text-gray-600 text-sm sm:text-base hover:text-gray-900 cursor-pointer"
            >
              <img src={goBackIcon} alt="back" className="w-5 mr-2" />
              Back to cranes
            </Link>
            <nav className="flex flex-wrap items-center gap-5 sm:gap-6">
              <NavLink to="/admin/inquiries" className={adminLinkClass}>
                <div>All Inquiries</div>
              </NavLink>
              <NavLink to="/admin/messages" className={adminLinkClass}>
                <span>All Messages</span>
                {messagesCount > 0 && (
                  <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-xs text-white">
                    {messagesCount}
                  </span>
                )}
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
