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
  Sparkles,
  SlidersHorizontal,
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
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 py-32">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Sparkles className="h-5 w-5 mr-2" />
              <span className="font-semibold">Artisan Cake Collection</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Sweet <span className="text-amber-200">Masterpieces</span>
            </h1>
            <p className="text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover our exquisite collection of handcrafted cakes, each one a
              work of art made with premium ingredients and boundless
              creativity.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-orange-100">
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-orange-200 rounded-full mr-2"></div>
                Fresh Daily
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-orange-200 rounded-full mr-2"></div>
                Premium Ingredients
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-orange-200 rounded-full mr-2"></div>
                Artisan Made
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Enhanced Filters and Search */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 mb-16">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              {/* Enhanced Search */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl blur opacity-50"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 h-5 w-5" />
                  <Input
                    placeholder="Search our delicious cakes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-4 border-2 border-amber-200 focus:border-amber-400 rounded-2xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder:text-gray-500 transition-all duration-300 text-lg"
                  />
                </div>
              </div>

              {/* Enhanced Category Filter */}
              <div className="relative">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full sm:w-64 border-2 border-amber-200 focus:border-amber-400 rounded-2xl bg-white/90 backdrop-blur-sm py-4 px-4 text-gray-800 transition-all duration-300">
                    <Filter className="h-5 w-5 mr-2 text-amber-500" />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-amber-200 bg-white/95 backdrop-blur-sm">
                    <SelectItem value="all" className="rounded-xl">
                      All Categories
                    </SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="rounded-xl"
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
                  <SelectTrigger className="w-full sm:w-64 border-2 border-amber-200 focus:border-amber-400 rounded-2xl bg-white/90 backdrop-blur-sm py-4 px-4 text-gray-800 transition-all duration-300">
                    <SlidersHorizontal className="h-5 w-5 mr-2 text-amber-500" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-amber-200 bg-white/95 backdrop-blur-sm">
                    <SelectItem value="name" className="rounded-xl">
                      Name A-Z
                    </SelectItem>
                    <SelectItem value="price-low" className="rounded-xl">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high" className="rounded-xl">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Enhanced Results Count */}
          <div className="mt-8 flex items-center justify-between">
            <div className="text-gray-700 font-semibold text-lg">
              Showing{" "}
              <span className="text-amber-600 font-bold">
                {filteredProducts.length}
              </span>{" "}
              of{" "}
              <span className="text-amber-600 font-bold">
                {products.length}
              </span>{" "}
              delicious treats
            </div>
            <div className="flex items-center text-sm text-gray-600 bg-green-50 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Fresh inventory updated daily
            </div>
          </div>
        </div>

        {/* Enhanced Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-32">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-20 max-w-lg mx-auto">
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <Search className="h-16 w-16 text-amber-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                No delicious treats found
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Try adjusting your search criteria or browse our full collection
                of handcrafted cakes and pastries.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filteredProducts.map((product: Product, index) => (
              <div
                key={product._id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  product={product}
                  isWishlisted={wishlist.includes(product._id || "")}
                  onToggleWishlist={() => toggleWishlist(product._id || "")}
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
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white rounded-3xl py-0 gap-0">
      <div className="flex flex-col lg:flex-row h-auto lg:h-96">
        {/* Enhanced Image Section */}
        <div className="relative w-full lg:w-2/5 h-72 lg:h-full overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100" />

          {/* Product Image */}
          <div className="relative w-full h-full flex items-center justify-center p-6">
            {product.images[0] ? (
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-all duration-700 ease-out drop-shadow-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-all duration-700 ease-out">
                <Cake className="h-24 w-24 text-amber-500 drop-shadow-lg" />
              </div>
            )}
          </div>

          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Status Badge */}
            <div className="absolute top-6 left-6">
              <Badge
                className={`${
                  product.isAvailable
                    ? "bg-gradient-to-r from-emerald-500 to-green-500"
                    : "bg-gradient-to-r from-red-500 to-rose-500"
                } text-white font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border-0`}
              >
                {product.isAvailable ? (
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    Available
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Coming Soon
                  </span>
                )}
              </Badge>
            </div>

            {/* Category Badge */}
            <div className="absolute bottom-6 left-6">
              <Badge className="bg-white/90 text-amber-700 font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border-0">
                <span className="flex items-center gap-1.5">
                  <Cake className="h-3.5 w-3.5" />
                  {product.category}
                </span>
              </Badge>
            </div>
          </div>

          {/* Wishlist Button */}
          <div className="absolute top-6 right-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleWishlist}
              className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-0"
            >
              <Heart
                className={`h-4 w-4 transition-all duration-300 ${
                  isWishlisted
                    ? "text-red-500 fill-current scale-110"
                    : "text-gray-600"
                }`}
              />
            </Button>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="flex-1 p-8 flex flex-col justify-between bg-gradient-to-br from-white to-gray-50/50">
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 line-clamp-2 group-hover:text-amber-600 transition-colors duration-300 leading-tight">
                  {product.name}
                </CardTitle>

                {/* Rating */}
                <div className="flex items-center gap-2 bg-amber-50 rounded-full px-3 py-1.5 shrink-0">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-900 ml-1">
                      {4.8}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">({123})</span>
                </div>
              </div>

              <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed text-base">
                {product.description}
              </CardDescription>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <ChefHat className="h-4 w-4 text-amber-500" />
                    Key Ingredients
                  </div>
                  <div className="bg-amber-50 rounded-2xl px-4 py-3">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {product.ingredients.slice(0, 4).join(", ")}
                      {product.ingredients.length > 4 && "..."}
                    </p>
                  </div>
                </div>
              )}

              {product.allergens && product.allergens.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    Allergen Information
                  </div>
                  <div className="bg-red-50 rounded-2xl px-4 py-3">
                    <p className="text-sm text-red-700 line-clamp-1">
                      Contains: {product.allergens.join(", ")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  ₹{product.price}
                </span>
                <span className="text-sm text-gray-500 font-medium">
                  per piece
                </span>
              </div>
              {!product.isAvailable && (
                <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  Currently Unavailable
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleViewDetails}
                className="rounded-2xl px-6 py-3 font-semibold border-2 border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300 transition-all duration-300 hover:scale-105"
              >
                <Eye className="h-4 w-4 mr-2" />
                Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default RouteComponent;
