import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-2xl shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300">
                  <svg className="w-6 h-6 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl blur-lg opacity-30 -z-10"></div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Keep Vault
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-sm">
              Secure and modern note-taking application for all your needs. 
              Organize your thoughts with confidence and style in a beautifully crafted environment.
            </p>
            <div className="flex space-x-3">
              {/* Social Media Links */}
              <a
                href="#"
                className="group relative text-gray-400 hover:text-white transition-all duration-300 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/25"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="group relative text-gray-400 hover:text-white transition-all duration-300 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center hover:translate-x-2 relative"
                >
                  <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-indigo-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-400/50"></div>
                  <span className="relative">
                    Home
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/notes"
                  className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center hover:translate-x-2 relative"
                >
                  <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-indigo-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-400/50"></div>
                  <span className="relative">
                    My Notes
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/notes/new"
                  className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center hover:translate-x-2 relative"
                >
                  <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-indigo-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-400/50"></div>
                  <span className="relative">
                    Create Note
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-6 relative">
              Legal
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/privacy-policy"
                  className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center hover:translate-x-2 relative"
                >
                  <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-purple-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-400/50"></div>
                  <span className="relative">
                    Privacy Policy
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center hover:translate-x-2 relative"
                >
                  <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-purple-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-400/50"></div>
                  <span className="relative">
                    Terms of Service
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center hover:translate-x-2 relative"
                >
                  <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-3 group-hover:bg-purple-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-400/50"></div>
                  <span className="relative">
                    Cookie Policy
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-bold text-lg mb-6 relative">
              Contact
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:support@keepvault.com"
                  className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center hover:translate-x-1"
                >
                  <div className="relative mr-3">
                    <div className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl group-hover:border-pink-500/50 group-hover:bg-pink-500/10 transition-all duration-300">
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <span className="relative">
                    support@keepvault.com
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center hover:translate-x-1"
                >
                  <div className="relative mr-3">
                    <div className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl group-hover:border-rose-500/50 group-hover:bg-rose-500/10 transition-all duration-300">
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  <span className="relative">
                    (123) 456-7890
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-orange-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-gradient-to-r from-transparent via-white/20 to-transparent pt-8 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="text-center">
            <p className="text-sm text-gray-400 leading-relaxed">
              &copy; {currentYear} <span className="font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Keep Vault</span>. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2 flex items-center justify-center">
              Made with 
              <span className="mx-1 text-red-400 animate-pulse text-sm">❤️</span>
              for note-taking enthusiasts worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};