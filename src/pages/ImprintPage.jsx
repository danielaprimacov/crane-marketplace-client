import {
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

const companyDetails = {
  companyName: "KranHub GmbH",
  street: "Crane Way 123",
  city: "10115 Berlin",
  country: "Germany",
  managingDirector: "Anna Müller",
  registerCourt: "Berlin-Charlottenburg Local Court, HRB 98765",
  vatId: "DE123456789",
  phone: "+49 30 123 4567",
  phoneHref: "tel:+49301234567",
  email: "legal@kranhub.com",
  emailHref: "mailto:legal@kranhub.com",
};

function SectionTitle({ children }) {
  return (
    <h2 className="inline-block border-b-4 border-red-600 pb-1 text-xl font-semibold uppercase sm:text-2xl">
      {children}
    </h2>
  );
}

function InfoRow({ icon: Icon, children, alignStart = false }) {
  return (
    <div
      className={`flex gap-3 ${alignStart ? "items-start" : "items-center"}`}
    >
      <Icon
        className={`h-6 w-6 shrink-0 text-red-600 ${alignStart ? "mt-1" : ""}`}
      />
      <div className="min-w-0 text-gray-700">{children}</div>
    </div>
  );
}

function ImprintPage() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Hero */}
        <div className="bg-red-600 px-4 py-10 text-center sm:px-6 sm:py-12">
          <h1 className="text-3xl font-extrabold uppercase text-white sm:text-4xl lg:text-5xl">
            Imprint
          </h1>
          <p className="mt-3 text-sm text-red-100 sm:text-base">
            Legal disclosure and company information
          </p>
        </div>

        <div className="space-y-8 p-5 sm:space-y-10 sm:p-8 lg:p-10">
          {/* Company + Contact */}
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-5 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <SectionTitle>Company</SectionTitle>

              <InfoRow icon={BuildingOfficeIcon} alignStart>
                <div>
                  <p className="font-medium text-gray-900">
                    {companyDetails.companyName}
                  </p>
                  <address className="not-italic leading-7 text-gray-700">
                    {companyDetails.street}
                    <br />
                    {companyDetails.city}
                    <br />
                    {companyDetails.country}
                  </address>
                </div>
              </InfoRow>

              <InfoRow icon={IdentificationIcon} alignStart>
                <div className="space-y-2 leading-7">
                  <p>
                    <strong>Managing Director:</strong>{" "}
                    {companyDetails.managingDirector}
                  </p>
                  <p>
                    <strong>Register Court:</strong>{" "}
                    {companyDetails.registerCourt}
                  </p>
                  <p>
                    <strong>VAT ID:</strong> {companyDetails.vatId}
                  </p>
                </div>
              </InfoRow>
            </div>

            <div className="space-y-5 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <SectionTitle>Contact</SectionTitle>

              <InfoRow icon={PhoneIcon}>
                <a
                  href={companyDetails.phoneHref}
                  className="break-words text-gray-800 transition hover:text-red-600"
                >
                  {companyDetails.phone}
                </a>
              </InfoRow>

              <InfoRow icon={EnvelopeIcon}>
                <a
                  href={companyDetails.emailHref}
                  className="break-all text-gray-800 transition hover:text-red-600"
                >
                  {companyDetails.email}
                </a>
              </InfoRow>
            </div>
          </section>

          {/* Supervisory Authority */}
          <section className="rounded-2xl bg-gray-50 p-5 sm:p-6">
            <h2 className="mb-4 border-l-4 border-red-600 pl-3 text-xl font-semibold uppercase sm:text-2xl">
              Supervisory Authority
            </h2>
            <p className="leading-7 text-gray-700">
              IHK Berlin (Chamber of Commerce)
              <br />
              Fasanenstraße 85, 10623 Berlin
            </p>
          </section>

          {/* Dispute Resolution */}
          <section className="space-y-4 rounded-2xl bg-gray-50 p-5 sm:p-6">
            <h2 className="border-l-4 border-red-600 pl-3 text-xl font-semibold uppercase sm:text-2xl">
              Online Dispute Resolution
            </h2>

            <p className="leading-7 text-gray-700">
              Under EU Regulation 524/2013, consumers may file complaints via
              the EU’s Online Dispute Resolution platform{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noreferrer"
                className="break-all text-red-600 transition hover:underline"
              >
                ec.europa.eu/consumers/odr
              </a>
              .
            </p>

            <InfoRow icon={CheckBadgeIcon} alignStart>
              <p className="leading-7 text-gray-700">
                KranHub GmbH is willing to participate in dispute resolution
                proceedings before the Berlin Consumer Arbitration Board.
              </p>
            </InfoRow>
          </section>

          {/* Footer */}
          <footer className="border-t border-black/10 pt-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} KranHub GmbH. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ImprintPage;
