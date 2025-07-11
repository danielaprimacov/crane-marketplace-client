function RevocationPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Page Title */}
      <header className="text-center">
        <h1 className="text-5xl font-extrabold mb-4">Right of Withdrawal</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          You have the right to revoke this contract within fourteen days
          without giving any reason.
        </p>
      </header>

      {/* 1. Your Right to Withdraw */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">1. Your Right to Withdraw</h2>
        <p className="text-gray-700 leading-relaxed">
          You may withdraw from this agreement within fourteen days without
          giving any reason. The withdrawal period is fourteen days from the day
          on which you or a third party designated by you, who is not the
          carrier, acquires physical possession of the goods.
        </p>
      </section>

      {/* 2. Effects of Withdrawal */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">2. Effects of Withdrawal</h2>
        <p className="text-gray-700 leading-relaxed">
          If you withdraw from this agreement, we shall reimburse to you all
          payments received from you, including the costs of delivery (except
          for the supplementary costs resulting from your choice of a type of
          delivery other than the least expensive type of standard delivery
          offered by us), without undue delay and in any event not later than
          fourteen days from the day on which we are informed about your
          decision to withdraw from this agreement.
        </p>
        <p className="text-gray-700 leading-relaxed">
          We will carry out such reimbursement using the same means of payment
          as you used for the initial transaction, unless you have expressly
          agreed otherwise; in any event, you will not incur any fees as a
          result of such reimbursement.
        </p>
      </section>

      {/* 3. How to Exercise Your Right */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">3. How to Exercise Your Right</h2>
        <p className="text-gray-700 leading-relaxed">
          To exercise your right of withdrawal, you must inform us (KranHub
          GmbH, 1234 Crane Way, Lift City,
          <a
            href="mailto:revocation@kranhub.example.com"
            className="text-red-600 hover:underline"
          >
            {" "}
            revocation@kranhub.example.com
          </a>
          , +49 123 456789) of your decision by means of a clear statement (e.g.
          a letter sent by post, fax or email). You may use the attached sample
          withdrawal form, but it is not obligatory.
        </p>

        <div className="mt-4 p-6 bg-gray-50 border rounded-lg">
          <h3 className="font-semibold mb-2">Sample Withdrawal Form</h3>
          <p className="text-gray-700 whitespace-pre-line text-sm">
            {`(Complete and return this form only if you wish to withdraw from the contract.)
            
              To: KranHub GmbH
                  Crane Way 1234
                  Lift City, Germany
                  Email: revocation@kranhub.example.com

              I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract of sale of the following goods (*): 
              Description: ________________________________________________________
              Order date (*) / Receipt date (*): ____________________________________
              Name of consumer(s): ________________________________________________
              Address of consumer(s): _____________________________________________
              Signature of consumer(s) (only if this form is notified on paper):
              Date: ______________________________________
              (*) Delete as appropriate.`}
          </p>
        </div>
      </section>

      {/* 4. Returning the Goods */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">4. Returning the Goods</h2>
        <p className="text-gray-700 leading-relaxed">
          You shall send back the goods or hand them over to us without undue
          delay and in any event not later than fourteen days from the day on
          which you communicate your withdrawal from this contract to us. The
          deadline is met if you send back the goods before the period of
          fourteen days has expired.
        </p>
        <p className="text-gray-700 leading-relaxed">
          You will bear the direct cost of returning the goods.
        </p>
      </section>

      {/* Contact & Support */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Need Help?</h2>
        <p className="text-gray-700">
          If you have any questions about revocation, please contact our support
          team:
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a href="tel:+49123456789" className="text-red-600 hover:underline">
            +49 123 456 789
          </a>
          <a
            href="mailto:support@kranhub.example.com"
            className="text-red-600 hover:underline"
          >
            support@kranhub.example.com
          </a>
        </div>
      </section>
    </div>
  );
}

export default RevocationPage;
