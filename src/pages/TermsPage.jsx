function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Hero */}
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold uppercase">
          Terms &amp; Conditions
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please read these terms and conditions carefully before using KranHub.
        </p>
      </header>

      {/* 1. Scope */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">1. Scope & Applicability</h2>
        <p className="text-gray-700 leading-relaxed">
          These Terms govern all deliveries, services, and listings on KranHub
          GmbH (“KranHub”). Any conflicting terms in user agreements are
          expressly overridden. Deviations are only binding if confirmed in
          writing by KranHub.
        </p>
      </section>

      {/* 2. Contract Formation */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">2. Conclusion of Contract</h2>
        <p className="text-gray-700 leading-relaxed">
          All offers on KranHub are non-binding. A contract is concluded only
          once KranHub issues a written confirmation of your order.
        </p>
      </section>

      {/* 3. Prices */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">3. Prices</h2>
        <p className="text-gray-700 leading-relaxed">
          Unless otherwise stated, all prices are ex-works (EXW) plus applicable
          VAT. Packaging, shipping, insurance, and any special services are
          charged separately.
        </p>
      </section>

      {/* 4. Payment Terms */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">4. Payment Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          Invoices are due no later than the 5th day of the month following
          delivery. Late payments incur interest: 5% above the base rate for
          consumers, 9% for businesses. KranHub may withhold performance until
          outstanding invoices are paid.
        </p>
      </section>

      {/* 5. Delivery Periods */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">5. Delivery Periods & Dates</h2>
        <p className="text-gray-700 leading-relaxed">
          All delivery dates are approximate unless explicitly confirmed in
          writing as binding. Delays due to force majeure or supplier issues
          will be communicated promptly with a revised schedule.
        </p>
      </section>

      {/* 6. Shipment & Risk */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">6. Shipment &amp; Risk</h2>
        <p className="text-gray-700 leading-relaxed">
          Shipment is at the customer’s expense and risk. Risk transfers when
          the goods leave KranHub’s facility, or—if shipped directly by a
          supplier—upon dispatch from the supplier.
        </p>
      </section>

      {/* 7. Warranty */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">7. Warranty</h2>
        <p className="text-gray-700 leading-relaxed">
          Customers must inspect goods upon receipt and report defects within 8
          working days. For verified defects, KranHub will at its choice repair
          or replace free of charge, or offer a price reduction.
        </p>
      </section>

      {/* Contact */}
      <footer className="text-center space-y-4">
        <p className="text-gray-700">
          For questions about these terms, please contact:
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="mailto:legal@kranhub.example.com"
            className="text-red-600 hover:underline"
          >
            legal@kranhub.example.com
          </a>
          <a href="tel:+491234567890" className="text-red-600 hover:underline">
            +49 123 456 7890
          </a>
        </div>
      </footer>
    </div>
  );
}

export default TermsPage;
