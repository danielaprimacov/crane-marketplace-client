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
    status: form.status,
  };

  if (
    form.availability.availabilityStart &&
    form.availability.availabilityEnd
  ) {
    requestBody.availability = {
      from: new Date(form.availability.availabilityStart),
      to: new Date(form.availability.availabilityEnd),
    };
  }

  if (form.status === "for sale") {
    requestBody.salePrice = Number(form.salePrice);
  }

  if (form.status === "for rent") {
    requestBody.rentPrice = {
      amount: Number(form.rentAmount),
      interval: form.rentInterval,
    };
  }

  return requestBody;
}
