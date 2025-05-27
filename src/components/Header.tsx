"use client";

import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { isAuthenticated, getUser, removeToken } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Menu,
  Cake,
  Home,
  Info,
  Package,
  Phone,
  User,
  LogOut,
  Settings,
  ShoppingCart,
  Heart,
  PlusCircle,
  AlignRight,
  LogIn,
} from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [user, setUser] = useState(getUser());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
    setIsMobileMenuOpen(false);
    navigate({ to: "/" });
  };

  const navigationItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/app/about", label: "About", icon: Info },
    { to: "/app/products", label: "Products", icon: Package },
    { to: "/app/contact-us", label: "Contact Us", icon: Phone },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-2 rounded-full group-hover:scale-105 transition-transform">
              <Cake className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Sweet Dreams Bakery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 font-medium transition-colors group"
              >
                <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3 gap-2">
                {/* Cart Icon */}
                <Link to="/app/products/create">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-green-400 hover:bg-green-500"
                  >
                    <PlusCircle className="h-5 w-5 text-gray-600" />
                    Add Product
                  </Button>
                </Link>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${user?.name}`}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-orange-400 to-pink-400 text-white">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user?.name || "User"}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" asChild>
                  <Link to="/auth/login">
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </Link>
                </Button>
                <Link to="/app/products">
                  <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                    <ShoppingCart className="h-5 w-5" />
                    Order Now
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <AlignRight className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <SheetHeader className="px-6 py-4 border-b">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-2 rounded-full">
                        <Cake className="h-5 w-5 text-white" />
                      </div>
                      <SheetTitle className="font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                        Sweet Dreams
                      </SheetTitle>
                    </div>
                    <SheetDescription className="text-sm text-gray-500"></SheetDescription>
                  </SheetHeader>

                  <div className="flex items-center justify-end m-4">
                    {isLoggedIn && (
                      <Link to="/app/products/create">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex items-center gap-2 bg-green-400"
                        >
                          <PlusCircle className="h-5 w-5 " />
                          Add Product
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 px-4">
                    <div className="space-y-3">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={closeMobileMenu}
                          className="flex items-center space-x-3 px-4 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    {isLoggedIn && (
                      <>
                        <div className="border-t my-6"></div>
                        <div className="space-y-3">
                          <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className="flex items-center space-x-3 px-4 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          >
                            <Heart className="h-5 w-5" />
                            <span className="font-medium">Wishlist</span>
                          </Link>
                          <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className="flex items-center space-x-3 px-4 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          >
                            <User className="h-5 w-5" />
                            <span className="font-medium">Profile</span>
                          </Link>
                          <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className="flex items-center space-x-3 px-4 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          >
                            <Settings className="h-5 w-5" />
                            <span className="font-medium">Settings</span>
                          </Link>
                        </div>
                      </>
                    )}
                  </nav>

                  {/* Mobile Footer */}
                  <div className="border-t p-6">
                    {isLoggedIn ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={`https://avatar.vercel.sh/${user?.name}`}
                            />
                            <AvatarFallback className="bg-gradient-to-r from-orange-400 to-pink-400 text-white">
                              {user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {user?.name || "User"}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {user?.email || "user@example.com"}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={handleLogout}
                          className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button asChild className="w-full" variant="outline">
                          <Link to="/auth/login" onClick={closeMobileMenu}>
                            <LogIn className="h-5 w-5" />
                            Sign In
                          </Link>
                        </Button>
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                        >
                          <Link to="/app/products" onClick={closeMobileMenu}>
                            <ShoppingCart className="h-5 w-5" />
                            Order Now
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
