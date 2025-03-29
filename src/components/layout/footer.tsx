import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black py-10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl mb-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 tracking-tight">
              <span className="font-black">OZ</span>
              <span className="font-light">AUTO</span>
              <span className="font-black">VALUE</span>
            </h3>
            <p className="text-gray-400 mb-4">
              The leading Australian used car valuation tool, providing free and
              accurate car value assessments.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/valuation"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Valuation Tool
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Disclaimer
            </h4>
            <p className="text-gray-400">
              This website is a demonstration project only. Valuation results
              are for reference only and do not constitute any form of official
              appraisal or legal advice.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} OzAutoValue. For project demonstration
            only, not for commercial use.
          </p>
        </div>
      </div>
    </footer>
  );
}
