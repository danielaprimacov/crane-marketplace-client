import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

function FilterDropDown({ label, options, value, onChange }) {
  // helper to get the display text
  const getDisplay = () => {
    if (!value) return `All ${label}`;
    const found = options.find((opt) => 
      typeof opt === "object" ? opt.value === value : opt === value
    );
    // if it’s an object use its label, otherwise it’s a string
    return typeof found === "object" ? found.label : found || value;
  };

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="flex items-center gap-1 px-4 py-2 border border-gray-400 rounded hover:bg-gray-50">
          <span className="text-sm">{getDisplay()}</span>
          <svg
            className="w-4 h-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5 8l5 5 5-5H5z" />
          </svg>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-10">
            <Listbox.Option
              key="__all__"
              value=""
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              All {label}
            </Listbox.Option>
            {options.map((opt) => {
              const optValue = typeof opt === "object" ? opt.value : opt;
              const optLabel = typeof opt === "object" ? opt.label : opt;
              return (
                <Listbox.Option
                  key={optValue}
                  value={optValue}
                  className="px-4 py-2 pl-5 text-sm hover:bg-red-300 cursor-pointer"
                >
                  {optLabel}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default FilterDropDown;
