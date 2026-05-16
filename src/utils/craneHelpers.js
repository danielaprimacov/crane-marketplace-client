export function getCraneId(crane) {
  return crane?.id || crane?._id || null;
}

export function getImageUrl(crane) {
  if (!Array.isArray(crane?.images) || crane.images.length === 0) {
    return null;
  }

  const firstImage = crane.images[0];

  if (typeof firstImage === "string") {
    return firstImage;
  }

  return firstImage?.url || firstImage?.secure_url || null;
}

export function getOwnerId(crane) {
  if (!crane?.owner) return null;

  if (typeof crane.owner === "string") {
    return crane.owner;
  }

  return crane.owner.id || crane.owner._id || null;
}

export function getCraneModel(crane) {
  return [
    crane?.seriesCode,
    crane?.capacityClassNumber ? `${crane.capacityClassNumber}t` : "",
    crane?.variantRevision?.trim(),
  ]
    .filter(Boolean)
    .join(" ");
}

export const initialCraneState = {
  producer: "",
  seriesCode: "",
  capacityClassNumber: "",
  variantRevision: "",
  capacity: "",
  height: "",
  radius: "",
  salePrice: "",
  rentAmount: "",
  rentInterval: "day",
  images: [],
  description: "",
  location: "",
  status: "",
  availability: {
    availabilityStart: "",
    availabilityEnd: "",
  },
  isAvailable: false,
};

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function toNumberOrUndefined(value) {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : undefined;
}

function toDateStringOrUndefined(value) {
  if (!value) return undefined;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

export function buildCraneRequestBody(form) {
  const normalizedStatus = normalizeText(form.status).toLowerCase();

  const requestBody = {
    producer: normalizeText(form.producer),
    seriesCode: normalizeText(form.seriesCode),
    capacityClassNumber: toNumberOrUndefined(form.capacityClassNumber),
    capacity: toNumberOrUndefined(form.capacity),
    height: toNumberOrUndefined(form.height),
    radius: toNumberOrUndefined(form.radius),
    variantRevision: normalizeText(form.variantRevision),
    images: Array.isArray(form.images) ? form.images : [],
    description: normalizeText(form.description),
    location: normalizeText(form.location),
    status: normalizedStatus,
  };

  const availabilityStart = toDateStringOrUndefined(
    form.availability?.availabilityStart
  );

  const availabilityEnd = toDateStringOrUndefined(
    form.availability?.availabilityEnd
  );

  if (availabilityStart && availabilityEnd) {
    requestBody.availability = {
      from: availabilityStart,
      to: availabilityEnd,
    };
  }

  if (normalizedStatus === "for sale") {
    requestBody.salePrice = toNumberOrUndefined(form.salePrice);
  }

  if (normalizedStatus === "for rent") {
    requestBody.rentPrice = {
      amount: toNumberOrUndefined(form.rentAmount),
      interval: form.rentInterval || "day",
    };
  }

  return requestBody;
}

export function mapCraneToForm(crane) {
  const availabilityFrom = crane.availability?.from;
  const availabilityTo = crane.availability?.to;

  const hasAvailability = Boolean(availabilityFrom && availabilityTo);

  return {
    producer: crane.producer || "",
    seriesCode: crane.seriesCode || "",
    capacityClassNumber: crane.capacityClassNumber ?? "",
    variantRevision: crane.variantRevision || "",
    capacity: crane.capacity ?? "",
    height: crane.height ?? "",
    radius: crane.radius ?? "",

    salePrice: crane.status === "for sale" ? crane.salePrice ?? "" : "",

    rentAmount:
      crane.status === "for rent" ? crane.rentPrice?.amount ?? "" : "",

    rentInterval:
      crane.status === "for rent" ? crane.rentPrice?.interval ?? "day" : "day",

    images: Array.isArray(crane.images) ? crane.images : [],

    description: crane.description || "",
    location: crane.location || "",
    status: crane.status || "",

    availability: hasAvailability
      ? {
          availabilityStart: new Date(availabilityFrom)
            .toISOString()
            .slice(0, 10),
          availabilityEnd: new Date(availabilityTo).toISOString().slice(0, 10),
        }
      : {
          availabilityStart: "",
          availabilityEnd: "",
        },

    isAvailable: hasAvailability,
  };
}

export function getAvailabilityStatus(availability) {
  if (!availability?.from || !availability?.to) {
    return "not-set";
  }

  const now = new Date();
  const from = new Date(availability.from);
  const to = new Date(availability.to);

  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
    return "not-set";
  }

  if (now > to) {
    return "expired";
  }

  if (now < from) {
    return "upcoming";
  }

  return "available";
}
