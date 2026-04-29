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
    `relative inline-flex shrink-0 items-center border-b pb-1 text-sm sm:text-base transition ${
      isActive
        ? "border-b-orange-600 text-orange-600"
        : "border-b-transparent text-gray-700 hover:border-b-orange-600 hover:text-orange-600"
    }`;

  return (
    <div className="bg-orange-50 min-h-screen">
      {/* Admin Navigation */}
      <header className="border-b border-b-black/10 bg-orange-50">
        <div className="mx-auto w-full max-w-screen-2xl px-4 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5 lg:px-10 lg:pt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Link to back to all cranes */}
            <Link
              to={backTo} // while producers are loading, fall back to /cranes
              className="w-fit inline-flex items-center text-gray-600 text-sm sm:text-base hover:text-gray-900"
            >
              <img src={goBackIcon} alt="back" className="w-5 mr-2 shrink-0" />
              Back to cranes
            </Link>
            <div className="-mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
              <nav className="flex min-w-max items-center gap-5 sm:gap-6">
                <NavLink to="/admin/inquiries" className={adminLinkClass}>
                  <div>All Inquiries</div>
                </NavLink>
                <NavLink to="/admin/messages" className={adminLinkClass}>
                  <span>All Messages</span>
                  {messagesCount > 0 && (
                    <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-600 px-1.5 text-xs text-white">
                      {messagesCount}
                    </span>
                  )}
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
