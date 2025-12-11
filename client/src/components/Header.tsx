import { Link } from "wouter";
import { Menu, X, Instagram, Facebook, Mail, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Workshops", href: "/workshops" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const servicesItems = [
    { label: "3D Scanning", href: "/services/3d-scanning" },
    { label: "Mural Art", href: "/services/murals" },
    { label: "3D Modelling", href: "/services/3d-modelling" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-900 shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/logo-main.png" alt="Scale Breakers" className="h-12 w-auto hover:scale-105 transition" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="relative group">
              <span className="text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 transition">
                {item.label}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}

          {/* Services Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 transition flex items-center gap-1">
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isServicesOpen && (
              <div className="absolute left-0 mt-0 w-48 bg-white border-2 border-gray-900 shadow-lg rounded-lg py-2 z-50">
                {servicesItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm font-bold text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="hidden lg:flex items-center gap-4">
          <a 
            href="https://instagram.com/scale.breakers" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-700 hover:text-blue-600 transition"
            title="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a 
            href="https://www.facebook.com/TheScaleBreakers/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-700 hover:text-blue-600 transition"
            title="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a 
            href="mailto:contact.scalebreakers@gmail.com" 
            className="text-gray-700 hover:text-blue-600 transition"
            title="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t-2 border-gray-900 p-6 space-y-4">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className="block text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile Services Dropdown */}
          <div>
            <button 
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="w-full text-left text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition flex items-center justify-between"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isServicesOpen && (
              <div className="pl-4 space-y-2 mt-2">
                {servicesItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="block text-sm font-bold text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsServicesOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <div className="pt-4 border-t-2 border-gray-200">
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/scale.breakers" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 hover:text-blue-600 transition"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/TheScaleBreakers/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 hover:text-blue-600 transition"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact.scalebreakers@gmail.com" 
                className="text-gray-700 hover:text-blue-600 transition"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
