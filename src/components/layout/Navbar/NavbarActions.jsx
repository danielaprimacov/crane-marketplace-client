import { useNavigate } from "react-router-dom";

import { ROLES } from "../../../constants/roles.js";

import Badge from "../../ui/Badge";
import IconButton from "../../ui/IconButton";
import IconLink from "../../ui/IconLink";

import userIcon from "../../../assets/icons/circle-user.png";
import logOutIcon from "../../../assets/icons/leave.png";
import inboxLogo from "../../../assets/icons/envelope.png";

function AddCraneLink({ isVisible }) {
  if (!isVisible) return null;

  return (
    <IconLink
      to="/cranes/new"
      label="Add a new crane"
      className="h-7 min-w-7 bg-red-600 px-1 text-xs font-semibold text-white hover:bg-red-700 hover:shadow-md hover:text-white sm:h-10 sm:px-3 md:px-4"
    >
      <span className="sm:hidden">+</span>
      <span className="hidden sm:inline md:hidden">Add</span>
      <span className="hidden md:inline">Add a new crane</span>
    </IconLink>
  );
}

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
  cranesTargetPath = "/cranes",
}) {
  const navigate = useNavigate();

  const isAdmin = user?.role === ROLES.ADMIN;
  const adminTotal = (inquiriesCount || 0) + (messageCount || 0);
  const showAddCrane = isCranes && !isNewCrane;

  if (!isLoggedIn) {
    return (
      <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
        <IconButton label="Login" onClick={openLogin}>
          <img src={userIcon} alt="" className="h-6 w-6 sm:h-7 sm:w-7" />
        </IconButton>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2 md:gap-3">
      <AddCraneLink isVisible={showAddCrane} />

      {isAdmin ? (
        <div className="relative shrink-0">
          <IconButton
            label="Open admin inquiries and messages"
            onClick={() => navigate("/admin/inquiries")}
          >
            <img src={inboxLogo} alt="" className="h-5 w-5 sm:h-6 sm:w-6" />
          </IconButton>

          <Badge count={adminTotal} />
        </div>
      ) : (
        <>
          <UserCranesMenu
            myCranesCount={myCranesCount}
            cranesTargetPath={cranesTargetPath}
          />

          <IconLink to="/profile" label="Open profile">
            <img src={userIcon} alt="" className="h-5 w-5 sm:h-6 sm:w-6" />
          </IconLink>
        </>
      )}

      <IconButton label="Logout" onClick={logOutUser}>
        <img src={logOutIcon} alt="" className="h-5 w-5 sm:h-6 sm:w-6" />
      </IconButton>
    </div>
  );
}

export default NavbarActions;
