import { createFileRoute } from "@tanstack/react-router";
import { getProducts } from "@/lib/actions";
import type { Product } from "@/schema/product-schema";

interface ApiResponse {
  success: boolean;
  count: number;
  data: Product[];
}

export const Route = createFileRoute("/app/products/")({
  component: RouteComponent,
  loader: async () => {
    try {
      const response = await getProducts() as ApiResponse;
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {product.images[0] && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">₹{product.price}</span>
              <span className="text-sm text-gray-500">{product.category}</span>
            </div>
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Ingredients: </span>
                {product.ingredients.join(", ")}
              </div>
            )}
            {product.allergens && product.allergens.length > 0 && (
              <div className="mt-1 text-sm text-red-600">
                <span className="font-medium">Allergens: </span>
                {product.allergens.join(", ")}
              </div>
            )}
            {!product.isAvailable && (
              <div className="mt-2 text-red-500 text-sm">
                Currently Unavailable
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
