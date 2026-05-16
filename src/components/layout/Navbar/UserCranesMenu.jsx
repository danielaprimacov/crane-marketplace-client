import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";

import Badge from "../../ui/Badge";

import craneIcon from "../../../assets/icons/crane.png";

function UserCranesMenu({ myCranesCount, cranesTargetPath = "/cranes" }) {
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

export default UserCranesMenu;
