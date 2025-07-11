import {
  ShieldCheckIcon,
  DocumentTextIcon
} from "@heroicons/react/outline";

function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Hero */}
        <div className="bg-red-600 py-12 text-center">
          <h1 className="text-4xl font-extrabold text-white uppercase">
            Privacy Policy
          </h1>
          <p className="mt-2 text-red-200">
            How we collect, use, and protect your data
          </p>
        </div>

        <div className="p-8 space-y-12">
          {/* 1. Controller */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-semibold uppercase border-b-4 border-red-600 pb-1">
              <ShieldCheckIcon className="w-6 h-6 text-red-600 mr-2" />
              Data Controller
            </h2>
            <p className="text-gray-700">
              KranHub GmbH
              <br />
              Crane Way 123, 10115 Berlin, Germany
              <br />
              Phone: +49 30 123 4567
              <br />
              Email:{" "}
              <a
                href="mailto:privacy@kranhub.com"
                className="text-red-600 hover:underline"
              >
                privacy@kranhub.com
              </a>
            </p>
          </section>

          {/* 2. Data We Collect */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-semibold uppercase border-b-4 border-red-600 pb-1">
              <DocumentTextIcon className="w-6 h-6 text-red-600 mr-2" />
              Personal Data We Collect
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Account information (name, email, password)</li>
              <li>Profile details (company, address, phone number)</li>
              <li>Crane listings and images you upload</li>
              <li>Contact form and inquiry messages</li>
              <li>Payment and transaction records</li>
            </ul>
          </section>

          {/* 3. Cookies & Tracking */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-semibold uppercase border-b-4 border-red-600 pb-1">
              <DocumentTextIcon className="w-6 h-6 text-red-600 mr-2" />
              Cookies & Tracking
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Keep you logged in and secure</li>
              <li>Remember your preferences and filter settings</li>
              <li>Analyze site usage and improve performance</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You may disable cookies via your browser settings, but some
              features may no longer work.
            </p>
          </section>

          {/* 4. How We Use Your Data */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold uppercase border-b-4 border-red-600 pb-1">
              How We Use Your Data
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To provide and maintain our marketplace services</li>
              <li>To process your listings, inquiries, and transactions</li>
              <li>To communicate updates, promotions, and legal notices</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* 5. Data Sharing & Retention */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold uppercase border-b-4 border-red-600 pb-1">
              Data Sharing & Retention
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may share your data with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Payment processors and shipping partners</li>
              <li>Regulatory authorities as required by law</li>
              <li>Service providers under confidentiality agreements</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We retain personal data only as long as needed for the purposes
              outlined here, or as required by law.
            </p>
          </section>

          {/* 6. Your Rights */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold uppercase border-b-4 border-red-600 pb-1">
              Your Rights
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent at any time</li>
              <li>Object to processing for direct marketing</li>
              <li>Request data portability</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="text-gray-700">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:privacy@kranhub.com"
                className="text-red-600 hover:underline"
              >
                privacy@kranhub.com
              </a>
              .
            </p>
          </section>

          {/* 7. Security Measures */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold uppercase border-b-4 border-red-600 pb-1">
              Security Measures
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard technical and organizational
              measures to protect your data against unauthorized access,
              alteration, or deletion.
            </p>
          </section>

          {/* Changes */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold uppercase border-b-4 border-red-600 pb-1">
              Updates to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this policy periodically. The “Last updated” date at
              the top will indicate any changes.
            </p>
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

export default PrivacyPolicyPage;
