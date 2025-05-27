"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createProduct, updateProduct } from "@/lib/actions";
import type { Product } from "@/schema/product-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Upload,
  X,
  AlertTriangle,
  ImageIcon,
  Loader2,
  Plus,
  Camera,
  Sparkles,
  Save,
  Eye,
  DollarSign,
  Package,
  Tag,
  Utensils,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ProductCategory = "Cake" | "Pastry" | "Cookie" | "Bread" | "Other";

interface ProductFormProps {
  product?: Product;
  mode?: "create" | "edit";
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface ImageFile {
  id: string;
  file?: File;
  url: string;
  isExisting?: boolean;
  preview?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];
const MAX_IMAGES = 8;

const categoryIcons = {
  Cake: "🍰",
  Pastry: "🥐",
  Cookie: "🍪",
  Bread: "🍞",
  Other: "📦",
};

export function ProductForm({ product, mode = "create" }: ProductFormProps) {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [activeStep, setActiveStep] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category: (product?.category as ProductCategory) || "Cake",
    ingredients: product?.ingredients || [],
    allergens: product?.allergens || [],
    isAvailable: product?.isAvailable ?? true,
  });

  const [images, setImages] = useState<ImageFile[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [newAllergen, setNewAllergen] = useState("");

  // Initialize images with proper preview URLs
  useEffect(() => {
    if (product?.images) {
      const initialImages: ImageFile[] = product.images.map((url, index) => ({
        id: `existing-${index}`,
        url,
        isExisting: true,
        preview: url,
      }));
      setImages(initialImages);
    }
  }, [product]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.preview && !img.isExisting) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, []);

  const validateField = useCallback(
    (field: string, value: any): string | undefined => {
      switch (field) {
        case "name":
          if (!value?.trim()) return "Product name is required";
          if (value.trim().length < 2)
            return "Name must be at least 2 characters";
          if (value.trim().length > 100)
            return "Name must be less than 100 characters";
          break;
        case "description":
          if (!value?.trim()) return "Description is required";
          if (value.trim().length < 10)
            return "Description must be at least 10 characters";
          break;
        case "price":
          if (!value || value <= 0) return "Price must be greater than 0";
          if (value > 100000) return "Price seems unrealistic";
          break;
        case "images":
          if (mode === "create" && images.length === 0)
            return "At least one image is required";
          break;
      }
      return undefined;
    },
    [mode, images.length]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    const imageError = validateField("images", null);
    if (imageError) newErrors.images = imageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const handleImageUpload = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);

      if (images.length + fileArray.length > MAX_IMAGES) {
        toast.error(`Maximum ${MAX_IMAGES} images allowed`);
        return;
      }

      const validFiles: File[] = [];

      fileArray.forEach((file) => {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          toast.error(`${file.name}: Invalid file type`);
          return;
        }
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`${file.name}: File too large (max 5MB)`);
          return;
        }
        validFiles.push(file);
      });

      if (validFiles.length > 0) {
        const newImages: ImageFile[] = validFiles.map((file, index) => {
          const preview = URL.createObjectURL(file);
          return {
            id: `new-${Date.now()}-${index}`,
            file,
            url: preview,
            preview,
            isExisting: false,
          };
        });

        setImages((prev) => [...prev, ...newImages]);

        if (errors.images) {
          setErrors((prev) => ({ ...prev, images: undefined }));
        }
      }
    },
    [images.length, errors.images]
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove?.preview && !imageToRemove.isExisting) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const handleDragEvents = {
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
    },
    onDragLeave: (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleImageUpload(files);
      }
    },
  };

  const addTag = useCallback(
    (type: "ingredients" | "allergens", value: string) => {
      if (!value.trim()) return;

      const currentList = formData[type];
      if (currentList.includes(value.trim())) {
        toast.error(`${value} is already added`);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], value.trim()],
      }));

      if (type === "ingredients") setNewIngredient("");
      if (type === "allergens") setNewAllergen("");
    },
    [formData]
  );

  const removeTag = useCallback(
    (type: "ingredients" | "allergens", index: number) => {
      setFormData((prev) => ({
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index),
      }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsLoading(true);

    try {
      const productData = new FormData();

      // Add form data
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "ingredients" || key === "allergens") {
          productData.append(key, JSON.stringify(value));
        } else {
          productData.append(key, value.toString());
        }
      });

      // Add new image files
      images.forEach((img) => {
        if (img.file) {
          productData.append("images", img.file);
        }
      });

      // Add existing image URLs for edit mode
      if (mode === "edit") {
        const existingImages = images
          .filter((img) => img.isExisting)
          .map((img) => img.url);
        productData.append("existingImages", JSON.stringify(existingImages));
      }

      if (mode === "create") {
        await createProduct(productData as any);
        toast.success("🎉 Product created successfully!");
        navigate({ to: "/app/products" });
      } else {
        await updateProduct(product!._id!, productData as any);
        toast.success("✨ Product updated successfully!");
        navigate({ to: `/app/products/${product!._id}` });
      }
    } catch (error) {
      console.error(`Failed to ${mode} product:`, error);
      toast.error(
        error instanceof Error ? error.message : `Failed to ${mode} product`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { id: 0, title: "Basic Info", icon: Package },
    { id: 1, title: "Images", icon: Camera },
    { id: 2, title: "Details", icon: Tag },
  ];

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  navigate({
                    to:
                      mode === "create"
                        ? "/app/products"
                        : `/app/products/${product!._id}`,
                  })
                }
                className="hover:bg-white/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {mode === "create" ? "Create Product" : "Edit Product"}
                </h1>
                <p className="text-sm text-gray-600">
                  {mode === "create"
                    ? "Add a new product to your catalog"
                    : "Update product information"}
                </p>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-8">
            <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Progress Steps */}
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <button
                        onClick={() => setActiveStep(step.id)}
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                          activeStep >= step.id
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                            : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                        )}
                      >
                        <step.icon className="h-5 w-5" />
                      </button>
                      <span
                        className={cn(
                          "ml-3 text-sm font-medium transition-colors",
                          activeStep >= step.id
                            ? "text-purple-600"
                            : "text-gray-500"
                        )}
                      >
                        {step.title}
                      </span>
                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            "w-16 h-0.5 mx-4 transition-colors",
                            activeStep > step.id
                              ? "bg-purple-500"
                              : "bg-gray-200"
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-8">
                {/* Step 0: Basic Info */}
                {activeStep === 0 && (
                  <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Product Name *
                        </Label>
                        <div className="relative">
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }));
                              const error = validateField(
                                "name",
                                e.target.value
                              );
                              setErrors((prev) => ({ ...prev, name: error }));
                            }}
                            placeholder="Delicious Chocolate Cake"
                            className={cn(
                              "pl-10 h-12 rounded-xl border-2 transition-all duration-200",
                              errors.name
                                ? "border-red-300 focus:border-red-500"
                                : "border-gray-200 focus:border-purple-500"
                            )}
                          />
                          <Package className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        </div>
                        {errors.name && (
                          <div className="flex items-center text-sm text-red-600 animate-in slide-in-from-top-1">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            {errors.name}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="price"
                          className="text-sm font-semibold text-gray-700"
                        >
                          Price (₹) *
                        </Label>
                        <div className="relative">
                          <Input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.price || ""}
                            onChange={(e) => {
                              const value =
                                Number.parseFloat(e.target.value) || 0;
                              setFormData((prev) => ({
                                ...prev,
                                price: value,
                              }));
                              const error = validateField("price", value);
                              setErrors((prev) => ({ ...prev, price: error }));
                            }}
                            placeholder="299.00"
                            className={cn(
                              "pl-10 h-12 rounded-xl border-2 transition-all duration-200",
                              errors.price
                                ? "border-red-300 focus:border-red-500"
                                : "border-gray-200 focus:border-purple-500"
                            )}
                          />
                          <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        </div>
                        {errors.price && (
                          <div className="flex items-center text-sm text-red-600 animate-in slide-in-from-top-1">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            {errors.price}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="category"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Category *
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            category: value as ProductCategory,
                          }));
                          const error = validateField("category", value);
                          setErrors((prev) => ({ ...prev, category: error }));
                        }}
                      >
                        <SelectTrigger
                          className={cn(
                            "h-12 rounded-xl border-2 transition-all duration-200",
                            errors.category
                              ? "border-red-300"
                              : "border-gray-200 focus:border-purple-500"
                          )}
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(categoryIcons).map(
                            ([category, icon]) => (
                              <SelectItem key={category} value={category}>
                                <div className="flex items-center">
                                  <span className="mr-2">{icon}</span>
                                  {category}
                                </div>
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <div className="flex items-center text-sm text-red-600 animate-in slide-in-from-top-1">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          {errors.category}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="description"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                          const error = validateField(
                            "description",
                            e.target.value
                          );
                          setErrors((prev) => ({
                            ...prev,
                            description: error,
                          }));
                        }}
                        placeholder="Describe your delicious product..."
                        rows={4}
                        className={cn(
                          "rounded-xl border-2 transition-all duration-200 resize-none",
                          errors.description
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-purple-500"
                        )}
                      />
                      <div className="flex justify-between items-center">
                        {errors.description ? (
                          <div className="flex items-center text-sm text-red-600">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            {errors.description}
                          </div>
                        ) : (
                          <div />
                        )}
                        <span className="text-xs text-gray-500">
                          {formData.description.length}/1000
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <div className="flex items-center space-x-3">
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full transition-colors",
                            formData.isAvailable
                              ? "bg-green-500"
                              : "bg-gray-400"
                          )}
                        />
                        <Label
                          htmlFor="isAvailable"
                          className="text-sm font-medium text-gray-700"
                        >
                          Product is available for sale
                        </Label>
                      </div>
                      <Switch
                        id="isAvailable"
                        checked={formData.isAvailable}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            isAvailable: checked,
                          }))
                        }
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl"
                    >
                      Next: Add Images
                      <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                    </Button>
                  </div>
                )}

                {/* Step 1: Images */}
                {activeStep === 1 && (
                  <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Product Images
                      </h3>
                      <p className="text-sm text-gray-600">
                        {mode === "create"
                          ? "Add at least one image"
                          : "Update or add more images"}
                      </p>
                    </div>

                    {/* Upload Area */}
                    <div
                      {...handleDragEvents}
                      className={cn(
                        "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer",
                        isDragOver
                          ? "border-purple-400 bg-purple-50 scale-105"
                          : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/50",
                        errors.images ? "border-red-300" : ""
                      )}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          e.target.files && handleImageUpload(e.target.files)
                        }
                        className="hidden"
                      />

                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-700">
                            {isDragOver
                              ? "Drop images here"
                              : "Upload Product Images"}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Drag & drop or click to browse • PNG, JPG, WebP •
                            Max 5MB each
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-xl"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    {errors.images && (
                      <div className="flex items-center justify-center text-sm text-red-600 animate-in slide-in-from-top-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.images}
                      </div>
                    )}

                    {/* Image Previews */}
                    {images.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">
                          Uploaded Images ({images.length}/{MAX_IMAGES})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {images.map((image) => (
                            <div
                              key={image.id}
                              className="relative group aspect-square rounded-xl overflow-hidden border-2 border-gray-200 hover:border-purple-300 transition-all duration-200"
                            >
                              <img
                                src={
                                  image.preview ||
                                  image.url ||
                                  "/placeholder.svg?height=200&width=200"
                                }
                                alt="Product preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src =
                                    "/placeholder.svg?height=200&width=200";
                                }}
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(image.id);
                                }}
                                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                              {image.isExisting && (
                                <Badge className="absolute bottom-2 left-2 text-xs bg-blue-500">
                                  Existing
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveStep(0)}
                        className="flex-1 h-12 rounded-xl"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl"
                      >
                        Next: Add Details
                        <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Details */}
                {activeStep === 2 && (
                  <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
                    {/* Ingredients */}
                    <div className="space-y-4">
                      <Label className="text-sm font-semibold text-gray-700 flex items-center">
                        <Utensils className="h-4 w-4 mr-2" />
                        Ingredients
                      </Label>
                      <div className="flex space-x-2">
                        <Input
                          value={newIngredient}
                          onChange={(e) => setNewIngredient(e.target.value)}
                          placeholder="Add an ingredient"
                          className="flex-1 h-10 rounded-xl border-2 border-gray-200 focus:border-purple-500"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag("ingredients", newIngredient);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => addTag("ingredients", newIngredient)}
                          disabled={!newIngredient.trim()}
                          className="h-10 px-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {formData.ingredients.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.ingredients.map((ingredient, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                            >
                              {ingredient}
                              <button
                                type="button"
                                onClick={() => removeTag("ingredients", index)}
                                className="ml-1 hover:text-red-600 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Allergens */}
                    <div className="space-y-4">
                      <Label className="text-sm font-semibold text-gray-700 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Allergens
                      </Label>
                      <div className="flex space-x-2">
                        <Input
                          value={newAllergen}
                          onChange={(e) => setNewAllergen(e.target.value)}
                          placeholder="Add an allergen"
                          className="flex-1 h-10 rounded-xl border-2 border-gray-200 focus:border-purple-500"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag("allergens", newAllergen);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => addTag("allergens", newAllergen)}
                          disabled={!newAllergen.trim()}
                          className="h-10 px-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {formData.allergens.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.allergens.map((allergen, index) => (
                            <Badge
                              key={index}
                              variant="destructive"
                              className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                            >
                              {allergen}
                              <button
                                type="button"
                                onClick={() => removeTag("allergens", index)}
                                className="ml-1 hover:text-red-600 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveStep(1)}
                        className="flex-1 h-12 rounded-xl"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            {mode === "create" ? "Creating..." : "Updating..."}
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            {mode === "create"
                              ? "Create Product"
                              : "Update Product"}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                    Live Preview
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {mode === "create" ? "New" : "Edit"}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {/* Preview Image */}
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                    {images.length > 0 ? (
                      <img
                        src={
                          images[0].preview ||
                          images[0].url ||
                          "/placeholder.svg?height=300&width=300"
                        }
                        alt="Product preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg?height=300&width=300";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            No image uploaded
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Preview Content */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800 truncate">
                        {formData.name || "Product Name"}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {categoryIcons[formData.category]} {formData.category}
                      </Badge>
                    </div>

                    <p className="text-2xl font-bold text-purple-600">
                      ₹{formData.price || "0.00"}
                    </p>

                    <p className="text-sm text-gray-600 line-clamp-3">
                      {formData.description ||
                        "Product description will appear here..."}
                    </p>

                    {formData.ingredients.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">
                          Ingredients:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {formData.ingredients
                            .slice(0, 3)
                            .map((ingredient, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {ingredient}
                              </Badge>
                            ))}
                          {formData.ingredients.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{formData.ingredients.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {formData.allergens.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">
                          Allergens:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {formData.allergens
                            .slice(0, 2)
                            .map((allergen, index) => (
                              <Badge
                                key={index}
                                variant="destructive"
                                className="text-xs"
                              >
                                {allergen}
                              </Badge>
                            ))}
                          {formData.allergens.length > 2 && (
                            <Badge variant="destructive" className="text-xs">
                              +{formData.allergens.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-xs text-gray-500">
                        Availability
                      </span>
                      <div className="flex items-center space-x-1">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            formData.isAvailable
                              ? "bg-green-500"
                              : "bg-gray-400"
                          )}
                        />
                        <span className="text-xs font-medium">
                          {formData.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
