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
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-2xl mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-light mb-4">Stay Sweet with Us</h3>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto font-light">
              Subscribe to our newsletter for exclusive recipes, special offers,
              and the latest updates from our bakery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 rounded-lg h-12"
              />
              <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-lg h-12 px-8 font-medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-slate-800 p-3 rounded-2xl">
                <Cake className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-medium">Sweet Dreams</span>
                <div className="text-sm text-slate-400 font-medium">
                  Artisan Bakery
                </div>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed font-light">
              Creating magical moments and sweet memories since 2008. Every cake
              tells a story, every bite creates a memory.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-2 hover:bg-slate-800"
              >
                <Facebook className="h-5 w-5 text-slate-400 hover:text-white transition-colors" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-2 hover:bg-slate-800"
              >
                <Instagram className="h-5 w-5 text-slate-400 hover:text-white transition-colors" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-2 hover:bg-slate-800"
              >
                <Twitter className="h-5 w-5 text-slate-400 hover:text-white transition-colors" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-white">
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
                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group font-light"
                  >
                    <span className="w-2 h-2 bg-white rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-white">
              Our Services
            </h3>
            <ul className="space-y-3 text-slate-300">
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
                  className="flex items-center group cursor-pointer hover:text-white transition-colors font-light"
                >
                  <span className="w-2 h-2 bg-white rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-white">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-slate-300">
                <MapPin className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Visit Our Bakery</p>
                  <p className="font-light">123 Baker Street, Sweet City, SC 12345</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-slate-300">
                <Phone className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Call Us</p>
                  <p className="font-light">(555) 123-CAKE</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-slate-300">
                <Mail className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <p className="font-light">hello@sweetdreamsbakery.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-slate-300">
                <Clock className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Opening Hours</p>
                  <p className="font-light">Mon-Sat: 7AM-8PM</p>
                  <p className="font-light">Sunday: 8AM-6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Awards & Certifications */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-white">
                <Award className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Award Winning Bakery
                </span>
              </div>
              <div className="h-4 w-px bg-slate-700 hidden md:block"></div>
              <div className="text-sm text-slate-400 font-light">
                Certified Organic • Locally Sourced • Artisan Made
              </div>
            </div>
            <div className="text-sm text-slate-400 font-light">
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
