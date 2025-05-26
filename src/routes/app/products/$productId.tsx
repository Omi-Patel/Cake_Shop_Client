"use client";

import { createFileRoute } from "@tanstack/react-router";
import { getProductById } from "@/lib/actions";
import type { Product } from "@/schema/product-schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  ShoppingCart,
  Star,
  ChefHat,
  AlertTriangle,
  Clock,
  ArrowLeft,
  Cake,
  Shield,
  Award,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

interface ApiResponse {
  success: boolean;
  data: Product;
}

export const Route = createFileRoute("/app/products/$productId")({
  component: ProductDetailsPage,
  loader: async ({ params }) => {
    try {
      const response = (await getProductById(params.productId)) as ApiResponse;
      if (!response.success) {
        throw new Error("Failed to load product");
      }
      return { product: response.data };
    } catch (error) {
      throw new Error("Failed to load product");
    }
  },
});

function ProductDetailsPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Placeholder images if product has multiple images
  const images =
    product.images.length > 0 ? product.images : ["/placeholder.svg"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Enhanced Navigation */}
      <div className=" ">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            className="hover:bg-orange-100 rounded-xl transition-colors duration-300"
            onClick={() => navigate({ to: "/app/products" })}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Enhanced Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-100 to-pink-100">
              {images[selectedImageIndex] &&
              images[selectedImageIndex] !== "/placeholder.svg" ? (
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-[500px] lg:h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-[500px] lg:h-[600px] bg-gradient-to-br from-orange-200 via-pink-200 to-rose-200 flex items-center justify-center">
                  <Cake className="w-32 h-32 text-orange-400" />
                </div>
              )}

              {/* Enhanced Status Badge */}
              <div className="absolute top-6 left-6">
                <Badge
                  className={`${
                    product.isAvailable
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg"
                      : "bg-gradient-to-r from-red-500 to-rose-500 shadow-lg"
                  } text-white font-medium px-4 py-2 rounded-full text-base`}
                >
                  {product.isAvailable ? "✨ Available Now" : "⏰ Coming Soon"}
                </Badge>
              </div>

              {/* Wishlist Button */}
              <div className="absolute top-6 right-6">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={toggleWishlist}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                  <Heart
                    className={`h-6 w-6 transition-colors duration-300 ${
                      isWishlisted
                        ? "text-red-500 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                </Button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "border-orange-500 shadow-lg"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    {image && image !== "/placeholder.svg" ? (
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-20 h-20 object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
                        <Cake className="w-8 h-8 text-orange-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Product Details */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <Badge className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 mb-4 font-medium px-4 py-2 rounded-full text-base">
                {product.category}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating Section */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">4.8</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <span className="text-gray-600">120+ reviews</span>
                <div className="h-4 w-px bg-gray-300"></div>
                <span className="text-green-600 font-medium">
                  ✓ Verified Quality
                </span>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border border-orange-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Special Price</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                      ₹{product.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full">
                      Fresh Today
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                About This Treat
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center text-gray-700 mb-4">
                  <ChefHat className="h-6 w-6 mr-3 text-orange-500" />
                  <h3 className="text-xl font-bold">Premium Ingredients</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-gray-600">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens */}
            {product.allergens && product.allergens.length > 0 && (
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <div className="flex items-center text-red-600 mb-4">
                  <AlertTriangle className="h-6 w-6 mr-3" />
                  <h3 className="text-xl font-bold">Allergen Information</h3>
                </div>
                <p className="text-red-600 font-medium">
                  Contains: {product.allergens.join(", ")}
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quantity</h3>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-full w-10 h-10 border-orange-200 hover:border-orange-400"
                >
                  -
                </Button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-full w-10 h-10 border-orange-200 hover:border-orange-400"
                >
                  +
                </Button>
                <div className="ml-4 text-sm text-gray-600">
                  Total:{" "}
                  <span className="font-bold text-orange-600">
                    ₹{product.price * quantity}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleWishlist}
                  className="flex-1 border-2 border-orange-200 hover:border-orange-400 rounded-xl py-4 font-medium transition-all duration-300 hover:bg-orange-50"
                >
                  <Heart
                    className={`h-5 w-5 mr-2 transition-colors duration-300 ${
                      isWishlisted
                        ? "text-red-500 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
                <Button
                  size="lg"
                  disabled={!product.isAvailable}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white disabled:opacity-50 rounded-xl py-4 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {!product.isAvailable && (
                <div className="flex items-center justify-center text-red-500 bg-red-50 rounded-xl py-3">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    Currently out of stock - Available soon!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">
                Quality Guarantee
              </h3>
              <p className="text-gray-600 text-sm">
                100% fresh ingredients, baked daily with love
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Artisan Made</h3>
              <p className="text-gray-600 text-sm">
                Handcrafted by expert bakers with years of experience
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20 rounded-2xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Same-day delivery available for orders before 2 PM
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section Placeholder */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Customer Reviews
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((review) => (
                <div
                  key={review}
                  className="bg-white/50 rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 font-medium">
                      5.0
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 italic">
                    "Absolutely delicious! The texture was perfect and the
                    flavors were incredible. Will definitely order again!"
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    - Happy Customer
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
