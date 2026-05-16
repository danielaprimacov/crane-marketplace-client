export const initialInquiryState = {
  customerName: "",
  email: "",
  message: "",
  address: "",
  needsTransport: false,
  needsInstallation: false,
  period: {
    periodStart: "",
    periodEnd: "",
  },
};

export function buildInquiryRequestBody(form, craneId) {
  const requestBody = {
    customerName: form.customerName.trim(),
    email: form.email.trim(),
    message: form.message.trim(),
    crane: craneId,
    needsTransport: form.needsTransport,
    needsInstallation: form.needsInstallation,
  };

  if (form.period.periodStart && form.period.periodEnd) {
    requestBody.period = {
      from: new Date(form.period.periodStart),
      to: new Date(form.period.periodEnd),
    };
  }

  if (form.needsTransport || form.needsInstallation) {
    requestBody.address = form.address.trim();
  }

  return requestBody;
}
