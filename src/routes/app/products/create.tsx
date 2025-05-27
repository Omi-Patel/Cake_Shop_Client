import { createFileRoute, redirect } from "@tanstack/react-router";
import { ProductForm } from "./-components/create-form";
import { getToken } from "@/lib/auth";

export const Route = createFileRoute("/app/products/create")({
  component: CreateProductPage,
  loader: async () => {
    const token = getToken();
    if (!token) {
      return redirect({ to: "/auth/login" });
    }
  },
});

function CreateProductPage() {
  return <ProductForm mode="create" />;
}
