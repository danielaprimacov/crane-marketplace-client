import { Popover, Transition } from "@headlessui/react";
import { Range, getTrackBackground } from "react-range";
import { Fragment, useState, useEffect } from "react";

function RangeDropDown({
  label,
  min,
  max,
  step = 1,
  value = [min, max],
  onChange,
  onApply,
}) {
  const [local, setLocal] = useState(value);

  // if parent value changes (e.g. reset filters), sync
  useEffect(() => {
    setLocal(value);
  }, [value.join()]);

  return (
    <Popover className="relative inline-block text-left">
      <Popover.Button className="flex items-center gap-1 px-4 py-2 border border-gray-400 rounded hover:bg-gray-50">
        <span className="text-sm">{label}</span>
        <svg
          className="w-4 h-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5 8l5 5 5-5H5z" />
        </svg>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg p-4">
          {/* Slider track */}
          <Range
            values={local}
            step={step}
            min={min}
            max={max}
            onChange={(vals) => {
              setLocal(vals);
              onChange && onChange(vals);
            }}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 flex w-full rounded-lg"
                style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: local,
                    colors: ["#E5E7EB", "#e53935", "#e53935"],
                    min,
                    max,
                  }),
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-4 w-4 rounded-full bg-white border border-gray-400 shadow"
              />
            )}
          />

          {/* Numeric inputs */}
          <div className="mt-4 flex justify-between items-center space-x-2">
            <input
              type="number"
              className="w-1/2 p-1 border border-gray-300 rounded"
              value={local[0]}
              min={min}
              max={local[1]}
              onChange={(e) => {
                const v = Math.min(Number(e.target.value), local[1]);
                setLocal([v, local[1]]);
              }}
            />
            <span>–</span>
            <input
              type="number"
              className="w-1/2 p-1 border border-gray-300 rounded"
              value={local[1]}
              min={local[0]}
              max={max}
              onChange={(e) => {
                const v = Math.max(Number(e.target.value), local[0]);
                setLocal([local[0], v]);
              }}
            />
          </div>

          {/* Apply */}
          <button
            onClick={() => onApply(local)}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded"
          >
            Apply
          </button>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default RangeDropDown;
