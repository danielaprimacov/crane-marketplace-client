import {
  ShieldCheckIcon,
  DocumentTextIcon,
  LockClosedIcon,
  UserCircleIcon,
  ServerIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const COMPANY = {
  name: "KranHub GmbH",
  street: "Crane Way 123",
  city: "10115 Berlin",
  country: "Germany",
  phone: "+49 30 123 4567",
  email: "privacy@kranhub.com",
};

const lastUpdated = "June 2025";

function Section({ icon: Icon, title, children }) {
  return (
    <section className="space-y-4">
      <div className="flex items-start gap-3 border-b border-red-600 pb-3">
        {Icon && (
          <Icon
            className="mt-1 h-6 w-6 shrink-0 text-red-600"
            aria-hidden="true"
          />
        )}

        <h2 className="text-xl font-semibold uppercase tracking-wide text-gray-900 sm:text-2xl">
          {title}
        </h2>
      </div>

      <div className="space-y-3 text-sm leading-7 text-gray-700 sm:text-base">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <article className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <header className="bg-red-600 px-6 py-10 text-center sm:px-10 sm:py-12">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-red-100">
            KranHub
          </p>

          <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-red-100 sm:text-base">
            How we collect, use, store, and protect personal data.
          </p>

          <p className="mt-4 text-xs text-red-100">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="space-y-10 px-5 py-8 sm:space-y-12 sm:px-8 sm:py-10 lg:px-10">
          <Section icon={ShieldCheckIcon} title="Data Controller">
            <address className="not-italic">
              <p className="font-semibold text-gray-900">{COMPANY.name}</p>
              <p>{COMPANY.street}</p>
              <p>
                {COMPANY.city}, {COMPANY.country}
              </p>
              <p>Phone: {COMPANY.phone}</p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="font-medium text-red-600 underline-offset-4 hover:underline"
                >
                  {COMPANY.email}
                </a>
              </p>
            </address>
          </Section>

          <Section icon={DocumentTextIcon} title="Personal Data We Collect">
            <p>
              Depending on how you use our website, we may collect the following
              categories of personal data:
            </p>

            <BulletList
              items={[
                "Account information such as name, email address, and password.",
                "Profile details such as company name, address, and phone number.",
                "Crane listings, technical details, images, and related content uploaded by users.",
                "Contact form messages and inquiry messages.",
                "Communication records related to listings, inquiries, and support requests.",
                "Technical data such as IP address, browser type, device information, and access logs.",
              ]}
            />
          </Section>

          <Section icon={ServerIcon} title="Cookies and Technical Data">
            <p>
              We may use cookies and similar technologies to operate the
              website, secure user sessions, remember preferences, and improve
              performance.
            </p>

            <BulletList
              items={[
                "Essential cookies required for login, authentication, and security.",
                "Preference cookies used to remember settings and filters.",
                "Analytics or performance tools, if enabled, to understand website usage.",
              ]}
            />

            <p>
              You can disable cookies in your browser settings. Some website
              functions may no longer work properly if essential cookies are
              blocked.
            </p>
          </Section>

          <Section icon={UserCircleIcon} title="How We Use Your Data">
            <BulletList
              items={[
                "To provide, operate, and maintain the marketplace platform.",
                "To process user accounts, crane listings, inquiries, and communication requests.",
                "To respond to contact forms, expert requests, and support questions.",
                "To protect the website against fraud, misuse, unauthorized access, and security incidents.",
                "To comply with legal, tax, accounting, and regulatory obligations.",
                "To improve website functionality, usability, and performance.",
              ]}
            />
          </Section>

          <Section icon={DocumentTextIcon} title="Legal Bases for Processing">
            <p>
              Where the GDPR applies, we process personal data only where a
              legal basis exists. Depending on the situation, processing may be
              based on:
            </p>

            <BulletList
              items={[
                "Contract performance or pre-contractual steps.",
                "Compliance with legal obligations.",
                "Legitimate interests, such as website security, fraud prevention, and service improvement.",
                "Consent, where consent is legally required, for example for optional cookies or marketing.",
              ]}
            />
          </Section>

          <Section icon={DocumentTextIcon} title="Data Sharing and Recipients">
            <p>
              We do not sell personal data. We may share personal data with
              selected recipients where necessary for operating the service or
              complying with legal obligations.
            </p>

            <BulletList
              items={[
                "Hosting, infrastructure, and IT service providers.",
                "Email and communication service providers.",
                "Payment processors, if paid services are offered.",
                "Professional advisers such as tax consultants, lawyers, or auditors.",
                "Public authorities, courts, or regulators where legally required.",
              ]}
            />
          </Section>

          <Section icon={LockClosedIcon} title="Data Retention">
            <p>
              We retain personal data only for as long as necessary for the
              purposes described in this policy, unless longer retention is
              required by law.
            </p>

            <p>
              Account, transaction, invoice, and business records may be subject
              to statutory retention periods. Contact and inquiry messages are
              usually retained only as long as needed to process the request,
              document communication, or defend legal claims.
            </p>
          </Section>

          <Section icon={ShieldCheckIcon} title="Your Rights">
            <p>
              Depending on the applicable law, you may have the following rights
              regarding your personal data:
            </p>

            <BulletList
              items={[
                "Right of access.",
                "Right to rectification.",
                "Right to erasure.",
                "Right to restriction of processing.",
                "Right to data portability.",
                "Right to object to certain types of processing.",
                "Right to withdraw consent at any time, where processing is based on consent.",
                "Right to lodge a complaint with a competent supervisory authority.",
              ]}
            />

            <p>
              To exercise your rights, contact us at{" "}
              <a
                href={`mailto:${COMPANY.email}`}
                className="font-medium text-red-600 underline-offset-4 hover:underline"
              >
                {COMPANY.email}
              </a>
              .
            </p>
          </Section>

          <Section icon={LockClosedIcon} title="Security Measures">
            <p>
              We use technical and organizational measures intended to protect
              personal data against unauthorized access, loss, misuse,
              alteration, or destruction.
            </p>

            <p>
              These measures may include access controls, encrypted
              communication, secure authentication, server-side authorization,
              regular updates, and limited access to personal data.
            </p>
          </Section>

          <Section
            icon={ExclamationTriangleIcon}
            title="Updates to This Policy"
          >
            <p>
              We may update this privacy policy when our services, legal
              obligations, or data processing activities change. The current
              version is identified by the “Last updated” date above.
            </p>
          </Section>

          <footer className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights
            reserved.
          </footer>
        </div>
      </article>
    </main>
  );
}

export default PrivacyPolicyPage;
