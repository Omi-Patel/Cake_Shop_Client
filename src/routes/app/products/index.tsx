"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/actions";
import type { Product } from "@/schema/product-schema";
import { Button } from "@/components/ui/button";
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
  Star,
  Search,
  Filter,
  AlertTriangle,
  Eye,
  SlidersHorizontal,
  Loader2,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import { useState, useMemo } from "react";

interface ApiResponse {
  success: boolean;
  count: number;
  data: Product[];
}

export const Route = createFileRoute("/app/products/")({
  component: RouteComponent,
});

// Loading Component
function LoadingComponent() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <Loader2 className="h-12 w-12 text-slate-600 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-medium text-slate-900 mb-2">
                Loading Products
              </h3>
              <p className="text-slate-600 font-light">
                Preparing our delicious collection...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Error Component
function ErrorComponent({ onRetry }: { error: any; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 max-w-md">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-slate-900 mb-2">
                Something went wrong
              </h3>
              <p className="text-slate-600 mb-6 font-light">
                We couldn't load our products right now.
              </p>
              <Button
                onClick={onRetry}
                className="bg-slate-900 hover:bg-slate-800 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Fetch products using useQuery
  const {
    data: productsResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = (await getProducts()) as ApiResponse;
      if (!response.success) {
        throw new Error("Failed to load products");
      }
      return response;
    },
  });

  const products = productsResponse?.data || [];

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

  const toggleWishlist = (productId: string | null | undefined) => {
    if (!productId) return;
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Loading state
  if (isLoading) {
    return <LoadingComponent />;
  }

  // Error state
  if (isError) {
    return <ErrorComponent error={error} onRetry={() => refetch()} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Title and Results */}
            <div className="flex items-center justify-between lg:justify-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Our Delicious Collection
                </h1>
                <p className="text-slate-600 font-light">
                  Discover {filteredProducts.length} of {products.length}{" "}
                  handcrafted delights
                </p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1 lg:max-w-2xl">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search for your favorite cakes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 border border-slate-200 focus:border-slate-400 rounded-xl bg-white shadow-sm"
                />
              </div>

              {/* Category Filter */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-44 border border-slate-200 focus:border-slate-400 rounded-xl py-3 bg-white shadow-sm">
                  <Filter className="h-4 w-4 mr-2 text-slate-400" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-44 border border-slate-200 focus:border-slate-400 rounded-xl py-3 bg-white shadow-sm">
                  <SlidersHorizontal className="h-4 w-4 mr-2 text-slate-400" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl p-16 shadow-lg border border-slate-100 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                No products found
              </h3>
              <p className="text-slate-600 font-light text-lg">
                Try adjusting your search criteria or browse our full
                collection.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product: Product) => (
              <ProductCard
                key={product._id}
                product={product}
                isWishlisted={wishlist.includes(product._id || "")}
                onToggleWishlist={() => toggleWishlist(product._id)}
              />
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

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate({ to: `/app/products/${product._id}` });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Cake":
        return "🍰";
      case "Pastry":
        return "🥐";
      case "Cookie":
        return "🍪";
      case "Bread":
        return "🍞";
      default:
        return "📦";
    }
  };

  return (
    <div className="group hover:shadow-2xl transition-all duration-500 border border-slate-200 shadow-lg overflow-hidden bg-white rounded-3xl hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={
            product.images[0] ||
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          }
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 backdrop-blur-sm text-slate-700 border border-slate-200 font-medium px-4 py-2 rounded-full shadow-lg">
            <span className="mr-2">{getCategoryIcon(product.category)}</span>
            {product.category}
          </Badge>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          <Badge
            className={`${
              product.isAvailable
                ? "bg-green-500/90 text-white border-green-600"
                : "bg-slate-500/90 text-white border-slate-600"
            } backdrop-blur-sm border font-medium px-4 py-2 rounded-full shadow-lg`}
          >
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                product.isAvailable ? "bg-white" : "bg-slate-300"
              }`}
            />
            {product.isAvailable ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            onClick={handleViewDetails}
            className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <Eye className="h-4 w-4 mr-2" />
            Quick View
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Product Info */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-slate-900 line-clamp-1 mb-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4 ? "text-amber-400 fill-current" : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-600 font-medium">
                4.8 (24 reviews)
              </span>
            </div>
          </div>
          <div className="text-right ml-4">
            <span className="text-2xl font-bold text-slate-900">
              ₹{product.price}
            </span>
            <div className="text-sm text-slate-500 font-light">per piece</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 bg-slate-100 mb-2 px-1 rounded-sm line-clamp-2 font-light text-sm leading-relaxed h-12">
          {product.description}
        </p>

        {/* Like Button - Moved to content section */}
        <div className="flex items-center justify-between ">
          <div></div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-xl px-4 py-2 font-medium transition-all duration-200"
          >
            View Details
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RouteComponent;
