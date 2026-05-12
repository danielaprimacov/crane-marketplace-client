import { Popover, Transition } from "@headlessui/react";
import { Range, getTrackBackground } from "react-range";
import { Fragment, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeRange(value, min, max) {
  if (!Array.isArray(value) || value.length !== 2) {
    return [min, max];
  }

  const rawMin = Number(value[0]);
  const rawMax = Number(value[1]);

  const safeMin = Number.isFinite(rawMin) ? rawMin : min;
  const safeMax = Number.isFinite(rawMax) ? rawMax : max;

  const clampedMin = clamp(safeMin, min, max);
  const clampedMax = clamp(safeMax, clampedMin, max);

  return [clampedMin, clampedMax];
}

function RangeDropDown({
  label,
  min,
  max,
  step = 1,
  value = [min, max],
  onChange,
  onApply,
}) {
  const controlledValue = normalizeRange(value, min, max);
  const [local, setLocal] = useState(controlledValue);

  // if parent value changes (e.g. reset filters), sync
  useEffect(() => {
    setLocal(controlledValue);
  }, [controlledValue[0], controlledValue[1]]);

  const updateLocal = (nextValue) => {
    const normalized = normalizeRange(nextValue, min, max);

    setLocal(normalized);
    onChange?.(normalized);
  };

  const handleMinInputChange = (rawValue) => {
    if (rawValue === "") {
      setLocal([min, local[1]]);
      return;
    }

    const parsedValue = Number(rawValue);

    if (!Number.isFinite(parsedValue)) {
      return;
    }

    const nextMin = clamp(parsedValue, min, local[1]);

    updateLocal([nextMin, local[1]]);
  };

  const handleMaxInputChange = (rawValue) => {
    if (rawValue === "") {
      setLocal([local[0], max]);
      return;
    }

    const parsedValue = Number(rawValue);

    if (!Number.isFinite(parsedValue)) {
      return;
    }

    const nextMin = clamp(parsedValue, min, local[1]);

    updateLocal([nextMin, local[1]]);
  };

  return (
    <Popover className="relative w-full sm:w-auto sm:min-w-[12rem]">
      {({ open }) => (
        <>
          <Popover.Button
            aria-label={`Open ${label} range filter`}
            className="flex h-11 w-full items-center justify-between gap-3 rounded-lg border border-gray-300 bg-white px-4 text-left transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600/15"
          >
            <span className="truncate text-sm text-gray-800">{label}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
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
            <Popover.Panel className="absolute z-20 mt-2 w-full min-w-[16rem] max-w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-gray-200 bg-white p-4 shadow-lg focus:outline-none sm:w-72">
              {({ close }) => (
                <>
                  <div className="mb-4">
                    <div className="mb-5 px-1">
                      <Range
                        values={local}
                        step={step}
                        min={min}
                        max={max}
                        onChange={updateLocal}
                        renderTrack={({ props, children }) => {
                          const { key, ...trackProps } = props;

                          return (
                            <div
                              key={key}
                              {...trackProps}
                              className="flex h-2 w-full rounded-lg"
                              style={{
                                ...trackProps.style,
                                background: getTrackBackground({
                                  values: local,
                                  colors: ["#E5E7EB", "#ef4444", "#E5E7EB"],
                                  min,
                                  max,
                                }),
                              }}
                            >
                              {children}
                            </div>
                          );
                        }}
                        renderThumb={({ props }) => {
                          const { key, ...thumbProps } = props;

                          return (
                            <div
                              key={key}
                              {...thumbProps}
                              className="h-4 w-4 rounded-full border border-gray-400 bg-white shadow"
                            />
                          );
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        aria-label={`${label} minimum value`}
                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-red-500"
                        value={local[0]}
                        min={min}
                        max={local[1]}
                        onChange={(e) => handleMinInputChange(e.target.value)}
                      />
                      <span className="shrink-0 text-sm text-gray-500">–</span>
                      <input
                        type="number"
                        aria-label={`${label} maximum value`}
                        className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-red-500"
                        value={local[1]}
                        min={local[0]}
                        max={max}
                        onChange={(e) => handleMaxInputChange(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onApply?.(local);
                      close();
                    }}
                    className="h-11 w-full rounded-lg bg-red-500 text-sm font-medium text-white transition hover:bg-red-600"
                  >
                    Apply
                  </button>
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default RangeDropDown;
