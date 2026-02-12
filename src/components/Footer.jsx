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

        {/* Contact */}
<div>
  <h4 className="text-white font-semibold mb-3">Contact</h4>

  <ul className="space-y-2 text-sm">
    {/* Email */}
    <li>
      <a
        href="mailto:joblinkhelpdesk@gmail.com"
        className="hover:text-white underline"
      >
        📧 joblinkhelpdesk@gmail.com
      </a>
    </li>

    {/* WhatsApp */}
    <li>
      <a
        href="https://wa.me/234XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white underline"
      >
        💬 WhatsApp
      </a>
    </li>

    {/* Telegram */}
    <li>
      <a
        href="https://t.me/YourTelegramUsername"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white underline"
      >
        ✈️ Telegram
      </a>
    </li>
  </ul>
</div>
      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Powered by Board Givers Multi Purpose Limited. All rights reserved.
      </div>
    </footer>
  );
}