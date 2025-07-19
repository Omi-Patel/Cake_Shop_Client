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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
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
                className="hover:bg-slate-100 text-slate-600 transition-colors duration-200 w-fit"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
              <div className="hidden sm:block h-8 w-px bg-slate-200" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                  {mode === "create" ? "Create New Product" : "Edit Product"}
                </h1>
                <p className="text-sm sm:text-base text-slate-600">
                  {mode === "create"
                    ? "Add a delicious new product to your catalog"
                    : "Update your product information and details"}
                </p>
              </div>
            </div>
            <div className="flex sm:hidden items-center space-x-2">
              <div className="px-3 py-1 bg-slate-100 rounded-full">
                <span className="text-sm font-medium text-slate-700">
                  {mode === "create" ? "New Product" : "Editing"}
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="px-3 py-1 bg-slate-100 rounded-full">
                <span className="text-sm font-medium text-slate-700">
                  {mode === "create" ? "New Product" : "Editing"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Progress Steps */}
              <div className="p-6 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex flex-col items-center space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 md:space-x-6"
                    >
                      {/* Step Button and Title Container */}
                      <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3 min-w-0">
                        {/* Step Button */}
                        <button
                          onClick={() => setActiveStep(step.id)}
                          className={cn(
                            "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 rounded-full transition-all duration-300 flex-shrink-0",
                            "focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2",
                            "hover:scale-105 active:scale-95",
                            activeStep >= step.id
                              ? "bg-slate-900 text-white shadow-lg hover:shadow-xl"
                              : "bg-slate-200 text-slate-500 hover:bg-slate-300 hover:text-slate-600"
                          )}
                          aria-label={`Step ${step.id}: ${step.title}`}
                        >
                          <step.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>

                        {/* Step Title */}
                        <span
                          className={cn(
                            "text-xs sm:text-sm md:text-base font-medium transition-colors text-center sm:text-left",
                            "max-w-[120px] sm:max-w-none truncate sm:truncate-none",
                            activeStep >= step.id
                              ? "text-slate-900"
                              : "text-slate-500"
                          )}
                          title={step.title} // Tooltip for truncated text
                        >
                          {step.title}
                        </span>
                      </div>

                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div className="flex items-center justify-center flex-shrink-0">
                          <div
                            className={cn(
                              "transition-all duration-300",
                              // Mobile: vertical line
                              "w-0.5 h-4 xs:h-6",
                              // Small screens and up: horizontal line
                              "sm:w-8 sm:h-0.5 md:w-12 lg:w-16",
                              activeStep > step.id
                                ? "bg-slate-900 sm:bg-slate-900"
                                : "bg-slate-200"
                            )}
                          />
                        </div>
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
                          className="text-sm font-semibold text-slate-700"
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
                                : "border-slate-200 focus:border-slate-500"
                            )}
                          />
                          <Package className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
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
                          className="text-sm font-semibold text-slate-700"
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
                                : "border-slate-200 focus:border-slate-500"
                            )}
                          />
                          <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
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
                        className="text-sm font-semibold text-slate-700"
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
                              : "border-slate-200 focus:border-slate-500"
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
                        className="text-sm font-semibold text-slate-700"
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
                            : "border-slate-200 focus:border-slate-500"
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
                        <span className="text-xs text-slate-500">
                          {formData.description.length}/1000
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center space-x-3">
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full transition-colors",
                            formData.isAvailable
                              ? "bg-green-500"
                              : "bg-slate-400"
                          )}
                        />
                        <Label
                          htmlFor="isAvailable"
                          className="text-sm font-medium text-slate-700"
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
                      className="w-full h-12 bg-slate-900 hover:bg-slate-800 rounded-xl"
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
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        Product Images
                      </h3>
                      <p className="text-sm text-slate-600">
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
                          ? "border-slate-400 bg-slate-50 scale-105"
                          : "border-slate-300 hover:border-slate-400 hover:bg-slate-50/50",
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
                        <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-slate-700">
                            {isDragOver
                              ? "Drop images here"
                              : "Upload Product Images"}
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
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
                        <h4 className="font-medium text-slate-700">
                          Uploaded Images ({images.length}/{MAX_IMAGES})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {images.map((image) => (
                            <div
                              key={image.id}
                              className="relative group aspect-square rounded-xl overflow-hidden border-2 border-slate-200 hover:border-slate-300 transition-all duration-200"
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
                                <Badge className="absolute bottom-2 left-2 text-xs bg-slate-600">
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
                        className="flex-1 h-12 bg-slate-900 hover:bg-slate-800 rounded-xl"
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
                      <Label className="text-sm font-semibold text-slate-700 flex items-center">
                        <Utensils className="h-4 w-4 mr-2" />
                        Ingredients
                      </Label>
                      <div className="flex space-x-2">
                        <Input
                          value={newIngredient}
                          onChange={(e) => setNewIngredient(e.target.value)}
                          placeholder="Add an ingredient"
                          className="flex-1 h-10 rounded-xl border-2 border-slate-200 focus:border-slate-500"
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
                          className="h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800"
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
                              className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
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
                      <Label className="text-sm font-semibold text-slate-700 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Allergens
                      </Label>
                      <div className="flex space-x-2">
                        <Input
                          value={newAllergen}
                          onChange={(e) => setNewAllergen(e.target.value)}
                          placeholder="Add an allergen"
                          className="flex-1 h-10 rounded-xl border-2 border-slate-200 focus:border-slate-500"
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
                          className="h-10 px-4 rounded-xl bg-red-600 hover:bg-red-700"
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
                        className="flex-1 h-12 bg-slate-900 hover:bg-slate-800 rounded-xl"
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
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-slate-600" />
                    Live Preview
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {mode === "create" ? "New" : "Edit"}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {/* Preview Image */}
                  <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100">
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
                          <ImageIcon className="h-12 w-12 mx-auto text-slate-400 mb-2" />
                          <p className="text-sm text-slate-500">
                            No image uploaded
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Preview Content */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-800 truncate">
                        {formData.name || "Product Name"}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {categoryIcons[formData.category]} {formData.category}
                      </Badge>
                    </div>

                    <p className="text-2xl font-bold text-slate-900">
                      ₹{formData.price || "0.00"}
                    </p>

                    <p className="text-sm text-slate-600 line-clamp-3">
                      {formData.description ||
                        "Product description will appear here..."}
                    </p>

                    {formData.ingredients.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-slate-700 mb-1">
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
                        <p className="text-xs font-medium text-slate-700 mb-1">
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

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-xs text-slate-500">
                        Availability
                      </span>
                      <div className="flex items-center space-x-1">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            formData.isAvailable
                              ? "bg-green-500"
                              : "bg-slate-400"
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
