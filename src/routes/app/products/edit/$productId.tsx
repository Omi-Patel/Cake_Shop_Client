import { createFileRoute } from '@tanstack/react-router'
import { ProductForm } from '../-components/create-form'
import { getProductById } from '@/lib/actions'
import type { Product } from '@/schema/product-schema'

interface ApiResponse {
  success: boolean;
  data: Product;
}

export const Route = createFileRoute('/app/products/edit/$productId')({
  component: EditProductPage,
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
})

function EditProductPage() {
  const { product } = Route.useLoaderData();
  
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductForm product={product} mode="edit" />
    </div>
  );
} 