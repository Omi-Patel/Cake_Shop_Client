import { Link } from "@tanstack/react-router";
import {
  Cake,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-2 rounded-full">
                  <Cake className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Sweet Dreams Bakery</span>
              </div>
              <p className="text-gray-400">
                Creating sweet memories one cake at a time since 2008.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/app/products" className="hover:text-white">
                    Our Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/app/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/app/contact-us" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Custom Cakes</li>
                <li>Wedding Cakes</li>
                <li>Birthday Cakes</li>
                <li>Corporate Events</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  123 Baker Street, Sweet City
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  (555) 123-CAKE
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  hello@sweetdreamsbakery.com
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Sweet Dreams Bakery. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
