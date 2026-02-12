import { useState } from "react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-primary-lighter p-2 rounded-lg flex items-center justify-center">
              <span className="material-icons text-primary text-3xl">
                health_and_safety
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-text-primary leading-none">
                CareConnect <span className="text-primary">AI</span>
              </span>

              <span className="text-[10px] uppercase tracking-widest text-text-secondary font-semibold">
                Healthcare NGO
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <a
              className="text-sm font-medium text-primary border-b-2 border-primary pb-1"
              href="#"
            >
              Home
            </a>
            <a className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              Request Support
            </a>
            <a className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              Volunteer
            </a>
            <a className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              About
            </a>
            <a className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <a className="hidden lg:inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              Sign In
            </a>

            <button className="bg-primary hover:bg-primary-dark text-text-onPrimary px-6 py-2.5 rounded-lg font-semibold text-sm shadow-lg flex items-center gap-2">
              <span className="material-icons text-lg">medical_services</span>
              Request Help
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-text-primary"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="material-icons">menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a className="block text-text-primary">Home</a>
            <a className="block text-text-primary">Request Support</a>
            <a className="block text-text-primary">Volunteer</a>
            <a className="block text-text-primary">About</a>
            <a className="block text-text-primary">Contact</a>
          </div>
        )}
      </div>
    </header>
  );
}
