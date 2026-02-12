import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">JobLink</h3>
          <p className="text-sm leading-relaxed">
            JobLink helps applicants prepare professionally, hunt for job
            opportunities, and get ready for interviews with confidence.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/apply" className="hover:text-white">
                Apply for Jobs
              </Link>
            </li>
          </ul>
        </div>

        {/* Optional third column (you can remove if not needed) */}
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm">joblinkhelpdesk@gmail.com</p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Powered by Board Givers Multi Purpose Limited. All rights reserved.
      </div>
    </footer>
  );
}