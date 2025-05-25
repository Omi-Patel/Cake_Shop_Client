import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { isAuthenticated, getUser, removeToken } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
    navigate({ to: "/" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between bg-white text-black border-b">
      <nav className="flex items-center gap-6">
        <Link to="/" className="font-bold text-lg">
          CackShop
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-gray-600 transition-colors">
            Home
          </Link>
          <Link
            to="/app/about"
            className="hover:text-gray-600 transition-colors"
          >
            About
          </Link>
          <Link
            to="/app/products"
            className="hover:text-gray-600 transition-colors"
          >
            Products
          </Link>
          <Link
            to="/app/contact-us"
            className="hover:text-gray-600 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </nav>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://avatar.vercel.sh/${user?.name}`} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button asChild>
            <Link to="/auth/login">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
