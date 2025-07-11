import {
  MailIcon,
  PhoneIcon,
  IdentificationIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";

function ImprintPage() {
  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Hero */}
        <div className="bg-red-600 py-12 text-center">
          <h1 className="text-4xl font-extrabold text-white uppercase">
            Imprint
          </h1>
          <p className="mt-2 text-red-200">
            Legal disclosure and company information
          </p>
        </div>

        <div className="p-8 space-y-12">
          {/* Company Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold uppercase border-b-4 border-red-600 inline-block pb-1">
                Company
              </h2>
              <div className="flex items-start gap-3">
                <OfficeBuildingIcon className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <p className="font-medium">KranHub GmbH</p>
                  <address className="not-italic text-gray-700">
                    Crane Way 123
                    <br />
                    10115 Berlin
                    <br />
                    Germany
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <IdentificationIcon className="w-6 h-6 text-red-600 mt-1" />
                <div className="text-gray-700">
                  <p>
                    <strong>Managing Director:</strong> Anna Müller
                  </p>
                  <p>
                    <strong>Register Court:</strong> Berlin‐Charlottenburg Local
                    Court, HRB 98765
                  </p>
                  <p>
                    <strong>VAT‐ID:</strong> DE123456789
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold uppercase border-b-4 border-red-600 inline-block pb-1">
                Contact
              </h2>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-6 h-6 text-red-600" />
                <a
                  href="tel:+49301234567"
                  className="text-gray-800 hover:text-red-600"
                >
                  +49 30 123 4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon className="w-6 h-6 text-red-600" />
                <a
                  href="mailto:legal@kranhub.com"
                  className="text-gray-800 hover:text-red-600"
                >
                  legal@kranhub.com
                </a>
              </div>
            </div>
          </section>

          {/* Supervisory Authority */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold uppercase border-l-4 border-red-600 pl-3 mb-4">
              Supervisory Authority
            </h2>
            <p className="text-gray-700">
              IHK Berlin (Chamber of Commerce)
              <br />
              Fasanenstraße 85, 10623 Berlin
            </p>
          </section>

          {/* Dispute Resolution */}
          <section className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold uppercase border-l-4 border-red-600 pl-3">
              Online Dispute Resolution
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Under EU Regulation 524/2013, consumers may file complaints via
              the EU’s Online Dispute Resolution platform&nbsp;
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noreferrer"
                className="text-red-600 hover:underline"
              >
                ec.europa.eu/consumers/odr
              </a>
              .
            </p>
            <div className="flex items-center gap-3 text-gray-700">
              <CheckBadgeIcon className="w-6 h-6 text-red-600" />
              <p>
                KranHub GmbH is willing to participate in dispute resolution
                proceedings before the Berlin Consumer Arbitration Board.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} KranHub GmbH. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ImprintPage;
