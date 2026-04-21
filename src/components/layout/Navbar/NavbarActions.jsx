import { Link, useNavigate } from "react-router-dom";

import userIcon from "../../../assets/icons/circle-user.png";
import logOutIcon from "../../../assets/icons/leave.png";
import craneIcon from "../../../assets/icons/crane.png";
import inboxLogo from "../../../assets/icons/envelope.png";

function NavbarActions({
  isLoggedIn,
  user,
  logOutUser,
  openLogin,
  isCranes,
  isNewCrane,
  myCranesCount,
  inquiriesCount,
  messagesCount,
}) {
  const navigate = useNavigate();
  const adminTotal = (inquiriesCount || 0) + (messagesCount || 0);

  return (
    <div className="flex items-center flex-none gap-3 sm:gap-4">
      {isLoggedIn ? (
        <>
          {user?.role === "admin" ? (
            <>
              {isCranes && !isNewCrane && (
                <Link
                  to="/cranes/new"
                  className="hidden md:inline-flex items-center bg-red-600 text-white text-sm px-4 py-2 rounded hover:shadow-lg hover:scale-101 transition-all duration-200"
                >
                  Add a new crane
                </Link>
              )}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative">
                  <button
                    onClick={() => navigate("/admin/inquiries")}
                    className="cursor-pointer p-1"
                  >
                    <img src={inboxLogo} alt="Inbox logo" className="w-5 sm:w-[22px]" />
                    {adminTotal > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {adminTotal}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {isCranes && !isNewCrane && (
                <Link
                  to="/cranes/new"
                  className="mr-10 bg-red-600 text-white px-4 py-2 rounded hover:shadow-lg hover:scale-101 transition-all duration-200"
                >
                  Add a new crane
                </Link>
              )}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative">
                  <Link to="/cranes/my-cranes">
                    <img src={craneIcon} alt="Your Cranes" className="w-5 sm:w-[22px]" />
                    {myCranesCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {myCranesCount}
                      </span>
                    )}
                  </Link>
                </div>
                <Link to="/profile" className="block p-1">
                  <img src={userIcon} alt="Profile" className="w-5 sm:w-6" />
                </Link>
              </div>
            </>
          )}
          <button onClick={logOutUser} className="cursor-pointer p-1">
            <img src={logOutIcon} alt="Logout" className="w-5 sm:w-6" />
          </button>
        </>
      ) : (
        <>
          <button onClick={openLogin} className="p-1 sm:p-2 cursor-pointer">
            <img src={userIcon} alt="Login" className="w-6 sm:w-7" />
          </button>
        </>
      )}
    </div>
  );
}

export default NavbarActions;
