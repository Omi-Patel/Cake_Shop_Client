"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getProducts } from "@/lib/actions";
import type { Product } from "@/schema/product-schema";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  Star,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  ChefHat,
  Cake,
  Eye,
} from "lucide-react";
import { useState, useMemo } from "react";

interface ApiResponse {
  success: boolean;
  count: number;
  data: Product[];
}

export const Route = createFileRoute("/app/products/")({
  component: RouteComponent,
  loader: async () => {
    try {
      const response = (await getProducts()) as ApiResponse;
      if (!response.success) {
        throw new Error("Failed to load products");
      }
      return { products: response.data };
    } catch (error) {
      throw new Error("Failed to load products");
    }
  },
});

function RouteComponent() {
  const { products } = Route.useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(products.map((product: Product) => product.category))
    );
    return cats;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product: Product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a: Product, b: Product) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Cake className="h-5 w-5 mr-2" />
              <span className="font-medium">Artisan Bakery Collection</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
              Sweet Delights
            </h1>
            <p className="text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Handcrafted with passion, baked with love. Discover our exquisite
              collection of premium cakes and treats made from the finest
              ingredients.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-orange-100">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-200 rounded-full mr-2"></div>
                Fresh Daily
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-200 rounded-full mr-2"></div>
                Premium Ingredients
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-200 rounded-full mr-2"></div>
                Artisan Made
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Enhanced Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-12 ">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              {/* Enhanced Search */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-xl blur opacity-50"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 h-5 w-5" />
                  <Input
                    placeholder="Search our delicious cakes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 border-2 border-orange-200 focus:border-orange-400 rounded-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder:text-gray-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Enhanced Category Filter */}
              <div className="relative">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full sm:w-56 border-2 border-orange-200 focus:border-orange-400 rounded-xl bg-white/90 backdrop-blur-sm py-3 px-4 text-gray-800 transition-all duration-300">
                    <Filter className="h-5 w-5 mr-2 text-orange-500" />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-orange-200 bg-white/95 backdrop-blur-sm">
                    <SelectItem value="all" className="rounded-lg">
                      All Categories
                    </SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="rounded-lg"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Enhanced Sort */}
              <div className="relative">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-56 border-2 border-orange-200 focus:border-orange-400 rounded-xl bg-white/90 backdrop-blur-sm py-3 px-4 text-gray-800 transition-all duration-300">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-orange-200 bg-white/95 backdrop-blur-sm">
                    <SelectItem value="name" className="rounded-lg">
                      Name A-Z
                    </SelectItem>
                    <SelectItem value="price-low" className="rounded-lg">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high" className="rounded-lg">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

           
          </div>

          {/* Enhanced Results Count */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-gray-600 font-medium">
              Showing{" "}
              <span className="text-orange-600 font-bold">
                {filteredProducts.length}
              </span>{" "}
              of{" "}
              <span className="text-orange-600 font-bold">
                {products.length}
              </span>{" "}
              delicious treats
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Fresh inventory updated daily
            </div>
          </div>
        </div>

        {/* Enhanced Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-16 max-w-lg mx-auto">
              <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Search className="h-12 w-12 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No delicious treats found
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Try adjusting your search criteria or browse our full collection
                of handcrafted cakes and pastries.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProducts.map((product: Product, index) => (
              <div
                key={product._id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  product={product}
                  isWishlisted={wishlist.includes(product._id)}
                  onToggleWishlist={() => toggleWishlist(product._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
}: ProductCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate({ to: `/app/products/${product._id}` });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
      <div className="flex flex-row">
        {/* Image Section - Left Side */}
        <div className="relative w-1/3 min-w-[300px] overflow-hidden">
          {product.images[0] ? (
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-200 via-pink-200 to-rose-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
              <Cake className="h-20 w-20 text-orange-400" />
            </div>
          )}

          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="absolute top-4 left-4">
            <Badge
              className={`${
                product.isAvailable
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg"
                  : "bg-gradient-to-r from-red-500 to-rose-500 shadow-lg"
              } text-white font-medium px-3 py-1 rounded-full`}
            >
              {product.isAvailable ? "✨ Available" : "⏰ Out of Stock"}
            </Badge>
          </div>

          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleWishlist}
              className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Heart
                className={`h-4 w-4 transition-colors duration-300 ${
                  isWishlisted ? "text-red-500 fill-current" : "text-gray-600"
                }`}
              />
            </Button>
          </div>

          <Badge className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium px-3 py-1 rounded-full shadow-lg">
            {product.category}
          </Badge>
        </div>

        {/* Content Section - Right Side */}
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl font-bold text-gray-800 line-clamp-1 group-hover:text-orange-600 transition-colors duration-300">
              {product.name}
            </CardTitle>
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">4.8</span>
            </div>
          </div>

          <CardDescription className="text-gray-600 line-clamp-2 leading-relaxed mb-6">
            {product.description}
          </CardDescription>

          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-700 mb-2">
                <ChefHat className="h-4 w-4 mr-2 text-orange-500" />
                <span className="font-semibold">Ingredients:</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-1 bg-orange-50 rounded-lg px-3 py-2">
                {product.ingredients.slice(0, 3).join(", ")}
                {product.ingredients.length > 3 && "..."}
              </p>
            </div>
          )}

          {product.allergens && product.allergens.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center text-sm text-red-600 mb-2">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span className="font-semibold">Allergens:</span>
              </div>
              <p className="text-sm text-red-600 line-clamp-1 bg-red-50 rounded-lg px-3 py-2">
                {product.allergens.join(", ")}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              ₹{product.price}
            </span>
            {!product.isAvailable && (
              <div className="flex items-center text-red-500 text-sm">
                <Clock className="h-4 w-4 mr-2" />
                Out of Stock
              </div>
            )}
          </div>

          <Button
            disabled={!product.isAvailable}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white disabled:opacity-50 rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={handleViewDetails}
          >
            <Eye className="h-5 w-5 mr-2" />
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default RouteComponent;
