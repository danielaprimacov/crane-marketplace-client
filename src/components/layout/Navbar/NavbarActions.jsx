import { Fragment, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";

import userIcon from "../../../assets/icons/circle-user.png";
import logOutIcon from "../../../assets/icons/leave.png";
import craneIcon from "../../../assets/icons/crane.png";
import inboxLogo from "../../../assets/icons/envelope.png";

function Badge({ count }) {
  if (!count || count <= 0) return null;

  const displayCount = count > 99 ? "99+" : count;

  return (
    <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white sm:h-5 sm:min-w-5 sm:text-xs">
      {displayCount}
    </span>
  );
}

function IconButton({ children, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md transition hover:bg-gray-100 sm:h-10 sm:w-10"
    >
      {children}
    </button>
  );
}

function IconLink({ to, children, label }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition hover:bg-gray-100 sm:h-10 sm:w-10"
    >
      {children}
    </Link>
  );
}

function UserCranesMenu({ myCranesCount, cranesTargetPath }) {
  return (
    <Popover className="relative shrink-0">
      {({ open, close }) => (
        <>
          <Popover.Button
            aria-label="Open cranes menu"
            className={`relative inline-flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-gray-100 sm:h-10 sm:w-10 ${
              open ? "bg-gray-100" : ""
            }`}
          >
            <img src={craneIcon} alt="" className="h-5 w-5 sm:h-6 sm:w-6" />
            <Badge count={myCranesCount} />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg border border-gray-200 bg-white py-2 text-sm shadow-lg focus:outline-none">
              <Link
                to="/cranes/my-cranes"
                onClick={() => close()}
                className="block px-4 py-2 text-gray-700 transition hover:bg-gray-50 hover:text-red-600"
              >
                My cranes
              </Link>

              <Link
                to={cranesTargetPath}
                onClick={() => close()}
                className="block px-4 py-2 text-gray-700 transition hover:bg-gray-50 hover:text-red-600"
              >
                View all cranes
              </Link>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

function AddCraneLink({ isVisible }) {
  if (!isVisible) return null;

  return (
    <Link
      to="/cranes/new"
      className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-red-600 px-1 text-xs font-semibold text-white transition hover:bg-red-700 hover:shadow-md sm:h-10 sm:px-3 md:px-4"
    >
      <span className="sm:hidden">+</span>
      <span className="hidden sm:inline md:hidden">Add</span>
      <span className="hidden md:inline">Add a new crane</span>
    </Link>
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
  messagesCount,
  cranesTargetPath = "/cranes",
}) {
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";
  const adminTotal = (inquiriesCount || 0) + (messagesCount || 0);
  const showAddCrane = isCranes && !isNewCrane;

  if (!isLoggedIn) {
    return (
      <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
        <IconLink to="/cranes" label="View all cranes">
          <img src={craneIcon} alt="" className="h-5 w-5 sm:h-6 sm:w-6" />
        </IconLink>

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
