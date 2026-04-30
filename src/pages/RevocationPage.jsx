const COMPANY = {
  name: "KranHub GmbH",
  street: "Crane Way 123",
  city: "10115 Berlin",
  country: "Germany",
  phone: "+49 30 123 4567",
  phoneHref: "tel:+49301234567",
  email: "revocation@kranhub.com",
  emailHref: "mailto:revocation@kranhub.com",
  supportEmail: "support@kranhub.com",
  supportEmailHref: "mailto:support@kranhub.com",
};

function Section({ number, title, children }) {
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
        {children}
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

function SampleWithdrawalForm() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Sample Withdrawal Form
      </h3>

      <p className="mb-4 text-sm leading-6 text-gray-600">
        Complete and return this form only if you wish to withdraw from the
        contract.
      </p>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white p-4">
        <pre className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-700">
          {`To:
${COMPANY.name}
${COMPANY.street}
${COMPANY.city}
${COMPANY.country}
Email: ${COMPANY.email}

I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract for the provision of the following service / the purchase of the following goods (*):

Description:
________________________________________________________

Ordered on (*) / received on (*):
________________________________________________________

Name of consumer(s):
________________________________________________________

Address of consumer(s):
________________________________________________________

Signature of consumer(s) only if this form is submitted on paper:
________________________________________________________

Date:
________________________________________________________

(*) Delete as appropriate.`}
        </pre>
      </div>
    </div>
  );
}

function RevocationPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <article className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <header className="bg-red-600 px-5 py-10 text-center sm:px-8 sm:py-14">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-red-100">
            Consumer Information
          </p>

          <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
            Right of Withdrawal
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-red-100 sm:text-base">
            Information about your statutory right to withdraw from certain
            consumer contracts.
          </p>
        </header>

        <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
            <strong>Important:</strong> This page is a template. The exact
            wording must be adapted to your real business model, especially if
            you provide services, digital products, marketplace intermediation,
            or B2B-only services.
          </div>

          <Section number="1" title="Your Right to Withdraw">
            <p>
              If you are a consumer and the statutory right of withdrawal
              applies, you have the right to withdraw from the contract within
              fourteen days without giving any reason.
            </p>

            <p>
              The withdrawal period is generally fourteen days. The exact start
              of the period depends on the type of contract, for example whether
              the contract concerns goods, services, or digital content.
            </p>
          </Section>

          <Section number="2" title="How to Exercise Your Right">
            <p>
              To exercise your right of withdrawal, you must inform us of your
              decision to withdraw from the contract by means of a clear
              statement, for example by letter or email.
            </p>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">{COMPANY.name}</p>
              <address className="not-italic leading-7">
                {COMPANY.street}
                <br />
                {COMPANY.city}
                <br />
                {COMPANY.country}
              </address>

              <p className="mt-2">
                Email:{" "}
                <ContactLink href={COMPANY.emailHref}>
                  {COMPANY.email}
                </ContactLink>
              </p>

              <p>
                Phone:{" "}
                <ContactLink href={COMPANY.phoneHref}>
                  {COMPANY.phone}
                </ContactLink>
              </p>
            </div>

            <p>
              You may use the sample withdrawal form below, but this is not
              mandatory.
            </p>

            <SampleWithdrawalForm />
          </Section>

          <Section number="3" title="Effects of Withdrawal">
            <p>
              If you withdraw from the contract, we shall reimburse all payments
              received from you, including standard delivery costs where
              applicable, without undue delay and no later than fourteen days
              from the day on which we receive your withdrawal notice.
            </p>

            <p>
              Reimbursement will be made using the same means of payment that
              you used for the original transaction, unless expressly agreed
              otherwise. You will not incur any fees because of this
              reimbursement.
            </p>
          </Section>

          <Section number="4" title="Return of Goods">
            <p>
              If the contract concerns goods, you must send back or hand over
              the goods without undue delay and no later than fourteen days from
              the day on which you informed us about the withdrawal.
            </p>

            <p>
              The deadline is met if you send the goods before the fourteen-day
              period has expired.
            </p>

            <p>
              You bear the direct cost of returning the goods, unless we have
              agreed otherwise or are legally required to bear those costs.
            </p>
          </Section>

          <Section number="5" title="Services and Digital Content">
            <p>
              If the contract concerns services or digital content, special
              rules may apply. The right of withdrawal may expire earlier in
              certain legally defined cases, for example where performance has
              begun with the consumer’s prior express consent and the legal
              requirements are met.
            </p>

            <p>
              This section must be adapted carefully if KranHub charges users
              for services, subscriptions, listings, brokerage, digital tools,
              or other non-physical products.
            </p>
          </Section>

          <section className="rounded-2xl bg-gray-900 p-5 text-white sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold">Need help?</h2>
                <p className="mt-1 text-sm text-gray-300">
                  Contact us if you have questions about withdrawal.
                </p>
              </div>

              <div className="flex flex-col gap-2 text-sm sm:items-end">
                <a
                  href={COMPANY.phoneHref}
                  className="text-red-300 underline-offset-4 hover:underline"
                >
                  {COMPANY.phone}
                </a>

                <a
                  href={COMPANY.supportEmailHref}
                  className="break-all text-red-300 underline-offset-4 hover:underline"
                >
                  {COMPANY.supportEmail}
                </a>
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

export default RevocationPage;
