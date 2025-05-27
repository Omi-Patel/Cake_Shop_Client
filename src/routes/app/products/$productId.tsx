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
  Plus,
  Minus,
  Share2,
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

  const images = product.images?.length > 0 ? product.images : [null];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="container mx-auto px-6 py-6">
        <Button
          variant="ghost"
          className="hover:bg-gray-100 rounded-xl"
          onClick={() => navigate({ to: "/app/products" })}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-square">
              {images[selectedImageIndex] ? (
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Cake className="w-24 h-24 text-gray-300" />
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleWishlist}
                  className="bg-white/90 hover:bg-white rounded-full p-2 shadow-md"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted ? "text-red-500 fill-current" : "text-gray-600"
                    }`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/90 hover:bg-white rounded-full p-2 shadow-md"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
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
                    className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-amber-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-20 h-20 object-contain"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 flex items-center justify-center">
                        <Cake className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <Badge variant="secondary" className="mb-4 bg-amber-100 text-amber-700">
                {product.category}
              </Badge>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium ml-1">4.8</span>
                </div>
                <span className="text-gray-500 text-sm">120+ reviews</span>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  Verified Quality
                </Badge>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Price</p>
                    <p className="text-3xl font-bold text-gray-900">₹{product.price}</p>
                  </div>
                  <Badge 
                    variant={product.isAvailable ? "default" : "secondary"}
                    className={product.isAvailable 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-600"
                    }
                  >
                    {product.isAvailable ? "Available Now" : "Coming Soon"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Ingredients */}
            { product.ingredients && product.ingredients.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center text-gray-800 mb-4">
                  <ChefHat className="h-5 w-5 mr-2 text-amber-500" />
                  <h3 className="text-lg font-semibold">Ingredients</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens */}
            {product.allergens && product.allergens.length > 0 && (
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <div className="flex items-center text-red-700 mb-3">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <h3 className="text-lg font-semibold">Allergen Information</h3>
                </div>
                <p className="text-red-700 font-medium">
                  Contains: {product.allergens.join(", ")}
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-gray-200 rounded-xl">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-xl"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-xl"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{product.price * quantity}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-200 hover:bg-gray-50 rounded-xl"
                  onClick={toggleWishlist}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${
                      isWishlisted ? "text-red-500 fill-current" : "text-gray-600"
                    }`}
                  />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
                <Button
                  disabled={!product.isAvailable}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {!product.isAvailable && (
                <div className="flex items-center justify-center text-red-600 bg-red-50 rounded-xl py-3">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="font-medium">Currently out of stock</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border border-gray-200 rounded-2xl">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 text-sm">
                100% fresh ingredients, baked daily with expertise
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-2xl">
            <CardContent className="p-6 text-center">
              <div className="bg-amber-100 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Artisan Made</h3>
              <p className="text-gray-600 text-sm">
                Handcrafted by expert bakers with years of experience
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-2xl">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Same-day delivery available for orders before 2 PM
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        <Card className="border border-gray-200 rounded-2xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((review) => (
                <div key={review} className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-700 font-medium">5.0</span>
                  </div>
                  <p className="text-gray-700 mb-3 italic">
                    "Absolutely divine! The texture was perfect and the flavors were incredible. 
                    Will definitely order again!"
                  </p>
                  <p className="text-gray-600 font-medium text-sm">- Happy Customer</p>
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