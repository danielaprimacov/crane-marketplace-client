import { Link, useNavigate } from "react-router-dom";

import userIcon from "../../assets/icons/circle-user.png";
import logOutIcon from "../../assets/icons/leave.png";
import craneIcon from "../../assets/icons/crane.png";
import inboxLogo from "../../assets/icons/envelope.png";

function NavbarActions({
  isLoggedIn,
  user,
  logOutUser,
  openLogin,
  isCranes,
  isNewCrane,
  myCranesCount,
  inquiriesCount,
  messageCount,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-5 flex-none">
      {isLoggedIn ? (
        <>
          {user?.role === "admin" ? (
            <>
              {isCranes && !isNewCrane && (
                <Link
                  to="/cranes/new"
                  className="mr-5 bg-red-600 text-white px-4 py-1 rounded hover:shadow-lg hover:scale-101 transition-all duration-200"
                >
                  Add a new crane
                </Link>
              )}
              <div className="flex gap-5 items-center">
                <div className="relative">
                  <button
                    onClick={() => navigate("/admin/inquiries")}
                    className="cursor-pointer p-1"
                  >
                    <img src={inboxLogo} alt="Inbox logo" className="w-5" />
                    {(inquiriesCount > 0 || messagesCount > 0) && (
                      <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {inquiriesCount + messagesCount}
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
                  className="mr-10 bg-red-600 text-white px-4 py-1 rounded hover:shadow-lg hover:scale-101 transition-all duration-200"
                >
                  Add a new crane
                </Link>
              )}
              <div className="flex gap-5 items-center">
                <div className="relative">
                  <Link to="/cranes/my-cranes">
                    <img src={craneIcon} alt="Your Cranes" className="w-5" />
                    {myCranesCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {myCranesCount}
                      </span>
                    )}
                  </Link>
                </div>
                <Link to="/profile">
                  <img src={userIcon} alt="Profile" className="w-5" />
                </Link>
              </div>
            </>
          )}
          <button onClick={logOutUser} className="cursor-pointer">
            <img src={logOutIcon} alt="Logout" className="w-5" />
          </button>
        </>
      ) : (
        <>
          <button onClick={openLogin} className="p-2 cursor-pointer">
            <img src={userIcon} alt="Login" className="w-6" />
          </button>
        </>
      )}
    </div>
  );
}

export default NavbarActions;
