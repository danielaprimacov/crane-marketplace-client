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

export function buildCraneRequestBody(form) {
  const normalizedStatus = String(form.status || "")
    .trim()
    .toLowerCase();

  const requestBody = {
    producer: form.producer,
    seriesCode: form.seriesCode,
    capacityClassNumber: Number(form.capacityClassNumber),
    capacity: form.capacity ? Number(form.capacity) : undefined,
    height: Number(form.height),
    radius: Number(form.radius),
    variantRevision: form.variantRevision,
    images: form.images,
    description: form.description,
    location: form.location,
    status: normalizedStatus,
  };

  if (
    form.availability?.availabilityStart &&
    form.availability?.availabilityEnd
  ) {
    requestBody.availability = {
      from: new Date(form.availability.availabilityStart),
      to: new Date(form.availability.availabilityEnd),
    };
  } else {
    requestBody.availability = null;
  }

  if (normalizedStatus === "for sale") {
    requestBody.salePrice = Number(form.salePrice);
    requestBody.rentPrice = undefined;
  }

  if (normalizedStatus === "for rent") {
    requestBody.rentPrice = {
      amount: Number(form.rentAmount),
      interval: form.rentInterval || "day",
    };
    requestBody.salePrice = undefined;
  }
  return requestBody;
}

export function mapCraneToForm(crane) {
  const hasAvailability = crane.availability?.from && crane.availability?.to;

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
    images: crane.images || [],
    description: crane.description || "",
    location: crane.location || "",
    status: crane.status || "",
    availability: hasAvailability
      ? {
          availabilityStart: new Date(crane.availability.from)
            .toISOString()
            .slice(0, 10),
          availabilityEnd: new Date(crane.availability.to)
            .toISOString()
            .slice(0, 10),
        }
      : {
          availabilityStart: "",
          availabilityEnd: "",
        },
    isAvailable: Boolean(hasAvailability),
  };
}
