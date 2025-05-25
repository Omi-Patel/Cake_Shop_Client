import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  name: z
    .string()
    .min(1, "Please add a product name")
    .max(100, "Name cannot be more than 100 characters")
    .trim(),

  description: z
    .string()
    .min(1, "Please add a description")
    .max(500, "Description cannot be more than 500 characters"),

  price: z.number().min(0, "Price cannot be negative"),

  category: z.enum(["Cake", "Pastry", "Cookie", "Bread", "Other"], {
    required_error: "Please add a category",
  }),

  images: z.array(z.string()).min(1, "Please add at least one image"),

  ingredients: z.array(z.string()).optional(),

  allergens: z.array(z.string()).optional(),

  isAvailable: z.boolean().default(true),

  createdAt: z.date().default(() => new Date()),

  updatedAt: z.date().default(() => new Date()),
});

export type Product = z.infer<typeof productSchema>;

// Form schema with optional fields for partial updates
export const productFormSchema = productSchema.partial({
  ingredients: true,
  allergens: true,
  isAvailable: true,
  createdAt: true,
  updatedAt: true,
});

export type ProductFormData = z.infer<typeof productFormSchema>;
