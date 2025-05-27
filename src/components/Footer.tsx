import { Link } from "@tanstack/react-router";
import {
  Cake,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Clock,
  Award,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Stay Sweet with Us</h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive recipes, special offers,
              and the latest updates from our bakery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12"
              />
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl h-12 px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-2xl">
                <Cake className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">Sweet Dreams</span>
                <div className="text-sm text-amber-400 font-medium">
                  Artisan Bakery
                </div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Creating magical moments and sweet memories since 2008. Every cake
              tells a story, every bite creates a memory.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-2 hover:bg-white/10"
              >
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-2 hover:bg-white/10"
              >
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-2 hover:bg-white/10"
              >
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/app/products", label: "Our Cakes" },
                { to: "/app/about", label: "About Us" },
                { to: "/app/contact-us", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Our Services
            </h3>
            <ul className="space-y-3 text-gray-300">
              {[
                "Custom Cakes",
                "Wedding Cakes",
                "Birthday Celebrations",
                "Corporate Events",
                "Cake Decorating Classes",
                "Catering Services",
              ].map((service) => (
                <li
                  key={service}
                  className="flex items-center group cursor-pointer hover:text-amber-400 transition-colors"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Visit Our Bakery</p>
                  <p>123 Baker Street, Sweet City, SC 12345</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <Phone className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Call Us</p>
                  <p>(555) 123-CAKE</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <Mail className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <p>hello@sweetdreamsbakery.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <Clock className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Opening Hours</p>
                  <p>Mon-Sat: 7AM-8PM</p>
                  <p>Sunday: 8AM-6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Certifications */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-amber-400">
                <Award className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Award Winning Bakery
                </span>
              </div>
              <div className="h-4 w-px bg-gray-600 hidden md:block"></div>
              <div className="text-sm text-gray-400">
                Certified Organic • Locally Sourced • Artisan Made
              </div>
            </div>
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Sweet Dreams Bakery. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
