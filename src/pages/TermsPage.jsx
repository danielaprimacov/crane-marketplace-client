const COMPANY = {
  name: "KranHub GmbH",
  phone: "+49 30 123 4567",
  phoneHref: "tel:+49301234567",
  email: "legal@kranhub.com",
  emailHref: "mailto:legal@kranhub.com",
};

const termsSections = [
  {
    title: "Scope and Applicability",
    content: [
      "These Terms and Conditions govern the use of the KranHub platform and the services provided through it.",
      "KranHub may provide marketplace, listing, inquiry, communication, or related digital services. The exact scope of service depends on the selected offer, listing, or written agreement.",
      "Conflicting or deviating terms only apply if KranHub has expressly accepted them in writing.",
    ],
  },
  {
    title: "Platform Use and User Accounts",
    content: [
      "Users are responsible for providing accurate and up-to-date account, company, contact, and listing information.",
      "KranHub may restrict or suspend access if users misuse the platform, provide false information, violate legal obligations, or interfere with the security or operation of the website.",
    ],
  },
  {
    title: "Listings and Inquiries",
    content: [
      "Crane listings, technical details, availability, prices, images, and related information are provided for informational and commercial communication purposes.",
      "Unless expressly stated otherwise, listings do not constitute a legally binding offer. A contract is concluded only after individual confirmation by the relevant contracting party.",
      "KranHub may review, moderate, edit, reject, or remove listings that are incomplete, misleading, unlawful, outdated, or inconsistent with platform standards.",
    ],
  },
  {
    title: "Conclusion of Contract",
    content: [
      "A contract is concluded only when an offer is expressly accepted or confirmed by the responsible contracting party.",
      "Automatic confirmations, contact forms, inquiry submissions, or system messages do not by themselves constitute final acceptance of a contract unless expressly stated.",
    ],
  },
  {
    title: "Prices and Payment",
    content: [
      "Prices, fees, taxes, transport costs, installation costs, insurance, and additional services are shown or agreed separately where applicable.",
      "Unless otherwise stated, prices are net prices plus applicable VAT for business customers.",
      "Invoices are payable within the agreed payment period. In the event of late payment, statutory default interest may apply.",
    ],
  },
  {
    title: "Availability, Delivery, Transport, and Installation",
    content: [
      "Availability dates, delivery dates, transport dates, and installation dates are only binding if they have been expressly confirmed as binding.",
      "Delays caused by force majeure, third-party service providers, technical issues, missing customer information, permits, site restrictions, or other circumstances outside reasonable control may extend the agreed timeline.",
      "If transport or installation services are involved, the customer must provide correct site information, access conditions, safety information, and any required permissions.",
    ],
  },
  {
    title: "User Obligations",
    content: [
      "Users must not upload unlawful, misleading, infringing, unsafe, or technically harmful content.",
      "Users must ensure that uploaded images, technical data, descriptions, and company information are accurate and that they have the necessary rights to provide such content.",
      "Users must keep login credentials confidential and inform KranHub without undue delay if unauthorized account access is suspected.",
    ],
  },
  {
    title: "Warranty and Liability",
    content: [
      "Statutory warranty rights apply where legally required.",
      "For business customers, inspection and notification obligations may apply depending on the type of contract and applicable law.",
      "KranHub is not liable for incorrect information provided by users, suppliers, owners, customers, or other third parties unless KranHub is legally responsible for such information.",
      "Liability for intent, gross negligence, injury to life, body, or health, and mandatory statutory liability remains unaffected.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "The website, design, branding, software, texts, images, and other platform content may be protected by intellectual property rights.",
      "Users may not copy, reproduce, distribute, scrape, reverse engineer, or commercially exploit platform content without permission, except where legally permitted.",
      "By uploading content, users grant KranHub the rights necessary to display, process, store, and use that content for operating the platform.",
    ],
  },
  {
    title: "Data Protection",
    content: [
      "The processing of personal data is described separately in the Privacy Policy.",
      "Users must ensure that any personal data they provide through the platform is submitted lawfully.",
    ],
  },
  {
    title: "Changes to These Terms",
    content: [
      "KranHub may update these Terms when the platform, legal requirements, or business processes change.",
      "The current version is published on this website. Material changes may be communicated separately where required.",
    ],
  },
  {
    title: "Governing Law and Jurisdiction",
    content: [
      "German law applies, unless mandatory consumer protection law provides otherwise.",
      "If the user is a merchant, legal entity under public law, or special fund under public law, the place of jurisdiction may be the registered office of KranHub, where legally permitted.",
    ],
  },
];

function Section({ number, title, content }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-semibold text-white">
          {number}
        </span>

        <h2 className="pt-1 text-xl font-bold text-gray-900 sm:text-2xl">
          {title}
        </h2>
      </div>

      <div className="space-y-4 text-sm leading-7 text-gray-700 sm:text-base">
        {content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function ContactLink({ href, children }) {
  return (
    <a
      href={href}
      className="break-all font-medium text-red-600 underline-offset-4 transition hover:underline"
    >
      {children}
    </a>
  );
}

function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <article className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <header className="bg-red-600 px-5 py-10 text-center sm:px-8 sm:py-14">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-red-100">
            Legal Information
          </p>

          <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
            Terms &amp; Conditions
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-red-100 sm:text-base">
            Please read these Terms and Conditions carefully before using
            KranHub.
          </p>
        </header>

        <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
            <strong>Important:</strong> This page is a template. It must be
            adapted to the real KranHub business model, especially if the
            platform offers paid listings, crane rental, crane sales, transport,
            installation, brokerage, B2B-only services, or consumer contracts.
          </div>

          {termsSections.map((section, index) => (
            <Section
              key={section.title}
              number={index + 1}
              title={section.title}
              content={section.content}
            />
          ))}

          <section className="rounded-2xl bg-gray-900 p-5 text-white sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Questions about these terms?
                </h2>
                <p className="mt-1 text-sm text-gray-300">
                  Contact KranHub legal support.
                </p>
              </div>

              <div className="flex flex-col gap-2 text-sm sm:items-end">
                <ContactLink href={COMPANY.emailHref}>
                  {COMPANY.email}
                </ContactLink>

                <ContactLink href={COMPANY.phoneHref}>
                  {COMPANY.phone}
                </ContactLink>
              </div>
            </div>
          </section>

          <footer className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights
            reserved.
          </footer>
        </div>
      </article>
    </main>
  );
}

export default TermsPage;
