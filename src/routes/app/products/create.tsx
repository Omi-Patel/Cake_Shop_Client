import { createFileRoute } from "@tanstack/react-router";
import { ProductForm } from "./-components/create-form";

export const Route = createFileRoute("/app/products/create")({
  component: CreateProductPage,
});

function CreateProductPage() {
  return <ProductForm mode="create" />;
}
