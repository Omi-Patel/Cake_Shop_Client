"use client";

import { createFileRoute } from "@tanstack/react-router";
import { deleteProduct, getProductById } from "@/lib/actions";
import type { Product } from "@/schema/product-schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Star,
  ChefHat,
  AlertTriangle,
  ArrowLeft,
  Cake,
  Shield,
  Award,
  Truck,
  Share2,
  Pencil,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { isAuthenticated } from "@/lib/auth";

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

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const images = product.images?.length > 0 ? product.images : [null];

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully");
      navigate({ to: "/app/products" });
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Navigation */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button
            variant="ghost"
            className="hover:bg-slate-100 rounded-lg self-start"
            onClick={() => navigate({ to: "/app/products" })}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>

          {isAuthenticated() && (
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto">
              <Button
                variant="outline"
                className="hover:bg-slate-100 border-slate-200 rounded-lg w-full sm:w-auto"
                onClick={() => {
                  if (!product._id) return;
                  navigate({
                    to: "/app/products/edit/$productId",
                    params: { productId: product._id },
                  });
                }}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Product
              </Button>

              <Button
                variant="destructive"
                className="hover:bg-red-800 rounded-lg w-full sm:w-auto"
                onClick={() => {
                  if (!product._id) return;
                  handleDeleteProduct(product._id);
                }}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Product
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square">
              {images[selectedImageIndex] ? (
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Cake className="w-24 h-24 text-slate-300" />
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleWishlist}
                  className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted
                        ? "text-rose-500 fill-current"
                        : "text-slate-600"
                    }`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <Share2 className="h-5 w-5 text-slate-600" />
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
                        ? "border-slate-900"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-20 h-20 object-contain"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-slate-100 flex items-center justify-center">
                        <Cake className="w-6 h-6 text-slate-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4 lg:space-y-6">
            {/* Header */}
            <div>
              <Badge
                variant="secondary"
                className="mb-3 lg:mb-4 bg-slate-100 text-slate-700 border border-slate-200"
              >
                {product.category}
              </Badge>

              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-medium text-slate-900 mb-3 lg:mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-slate-700 font-medium ml-1">4.8</span>
                </div>
                <span className="text-slate-500 text-sm font-light">
                  120+ reviews
                </span>
                <Badge
                  variant="outline"
                  className="text-emerald-600 border-emerald-200"
                >
                  Verified Quality
                </Badge>
              </div>

              {/* Price */}
              <div className="bg-slate-50 rounded-2xl p-4 lg:p-6 mb-4 lg:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1 font-light">
                      Price
                    </p>
                    <p className="text-2xl lg:text-3xl font-semibold text-slate-900">
                      ₹{product.price}
                    </p>
                  </div>
                  <Badge
                    variant={product.isAvailable ? "default" : "secondary"}
                    className={
                      product.isAvailable
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200 self-start sm:self-auto"
                        : "bg-slate-100 text-slate-600 border-slate-200 self-start sm:self-auto"
                    }
                  >
                    {product.isAvailable ? "Available Now" : "Coming Soon"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-50 rounded-2xl p-4 lg:p-6">
              <h3 className="text-lg font-medium text-slate-900 mb-3">
                Description
              </h3>
              <p className="text-slate-700 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-4 lg:p-6">
                <div className="flex items-center text-slate-800 mb-4">
                  <ChefHat className="h-5 w-5 mr-2 text-slate-600" />
                  <h3 className="text-lg font-medium">Ingredients</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                      <span className="text-slate-700 text-sm font-light">
                        {ingredient}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens */}
            {product.allergens && product.allergens.length > 0 && (
              <div className="bg-rose-50 rounded-2xl p-4 lg:p-6 border border-rose-100">
                <div className="flex items-center text-rose-700 mb-3">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <h3 className="text-lg font-medium">Allergen Information</h3>
                </div>
                <p className="text-rose-700 font-medium">
                  Contains: {product.allergens.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="border border-slate-200 rounded-2xl shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <div className="bg-slate-100 rounded-2xl p-3 lg:p-4 w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-slate-600" />
              </div>
              <h3 className="font-medium text-slate-900 mb-2 text-sm lg:text-base">
                Quality Guarantee
              </h3>
              <p className="text-slate-600 text-xs lg:text-sm font-light">
                100% fresh ingredients, baked daily with expertise
              </p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 rounded-2xl shadow-lg">
            <CardContent className="p-4 lg:p-6 text-center">
              <div className="bg-slate-100 rounded-2xl p-3 lg:p-4 w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                <Award className="h-6 w-6 lg:h-8 lg:w-8 text-slate-600" />
              </div>
              <h3 className="font-medium text-slate-900 mb-2 text-sm lg:text-base">
                Artisan Made
              </h3>
              <p className="text-slate-600 text-xs lg:text-sm font-light">
                Handcrafted by expert bakers with years of experience
              </p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 rounded-2xl shadow-lg sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 lg:p-6 text-center">
              <div className="bg-slate-100 rounded-2xl p-3 lg:p-4 w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                <Truck className="h-6 w-6 lg:h-8 lg:w-8 text-slate-600" />
              </div>
              <h3 className="font-medium text-slate-900 mb-2 text-sm lg:text-base">
                Fast Delivery
              </h3>
              <p className="text-slate-600 text-xs lg:text-sm font-light">
                Same-day delivery available for orders before 2 PM
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        <Card className="border border-slate-200 rounded-2xl shadow-lg">
          <CardContent className="p-6 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-medium text-slate-900 mb-4 lg:mb-6">
              Customer Reviews
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {[1, 2].map((review) => (
                <div
                  key={review}
                  className="bg-slate-50 rounded-2xl p-4 lg:p-6"
                >
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-amber-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-slate-700 font-medium">5.0</span>
                  </div>
                  <p className="text-slate-700 mb-3 italic font-light text-sm lg:text-base">
                    "Absolutely divine! The texture was perfect and the flavors
                    were incredible. Will definitely order again!"
                  </p>
                  <p className="text-slate-600 font-medium text-xs lg:text-sm">
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
