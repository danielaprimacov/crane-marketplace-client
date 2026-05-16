import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { Check, ChevronDown } from "lucide-react";

const optionClassName = ({ focus, selected }) =>
  `flex cursor-pointer items-center justify-between px-4 py-2 text-sm transition ${
    focus ? "bg-red-50 text-red-700" : "text-gray-700"
  } ${selected ? "font-medium" : ""}`;

function isEmptyFilterValue(value) {
  return value === "" || value === null || value === undefined;
}

function isOptionObject(option) {
  return option !== null && typeof option === "object";
}

function normalizeOption(option) {
  if (isOptionObject(option)) {
    return {
      value: option.value,
      label: option.label ?? String(option.value ?? ""),
    };
  }

  return {
    value: option,
    label: String(option ?? ""),
  };
}

function getDisplayLabel(label, value, options) {
  if (isEmptyFilterValue(value)) {
    return `All ${label}`;
  }

  const found = options.find((option) => {
    const normalized = normalizeOption(option);
    return normalized.value === value;
  });

  if (!found) return String(value);
  return normalizeOption(found).label;
}

function FilterDropDown({ label, options = [], value = "", onChange }) {
  const safeOptions = Array.isArray(options) ? options : [];
  // helper to get the display text
  const displayLabel = getDisplayLabel(label, value, options);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-full sm:w-auto sm:min-w-[11rem]">
        <ListboxButton
          className="flex h-11 w-full items-center justify-between text-left gap-3 px-4 border border-gray-300 rounded-lg transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600/15"
          aria-label={`Filter by ${label}`}
        >
          <span className="truncate text-sm text-gray-500">{displayLabel}</span>
          <ChevronDown
            className="w-4 h-4 shrink-0 text-gray-500"
            aria-hidden="true"
          />
        </ListboxButton>
        <Transition
          as={Fragment}
          enter="transition ease-in duration-150"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <ListboxOptions className="absolute mt-2 max-h-64 w-full py-1 overflow-auto bg-white border border-gray-200 rounded-xl shadow-lg z-20 focus:outline-none">
            <ListboxOption value="" className={optionClassName}>
              {({ selected }) => (
                <>
                  <span className="truncate">All {label}</span>
                  {selected && (
                    <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                  )}
                </>
              )}
            </ListboxOption>

            {safeOptions.map((option, index) => {
              const normalized = normalizeOption(option);

              return (
                <ListboxOption
                  key={`${String(normalized.value)}-${index}`}
                  value={normalized.value}
                  className={optionClassName}
                >
                  {({ selected }) => (
                    <>
                      <span className="truncate">{normalized.label}</span>
                      {selected && (
                        <Check
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </ListboxOption>
              );
            })}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}

export default FilterDropDown;
