import type { Product } from "@/schema/product-schema";
import type {
  LoginInput,
  UserRegistration,
  UserResponse,
} from "@/schema/user-schema";

import axios from "axios";

export function getBackendUrl() {
  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  return backendUrl;
}

// Base API URL
const API_BASE_URL = `${getBackendUrl()}/api/v1`;

export async function createUser(
  userInput: UserRegistration
): Promise<UserResponse> {
  try {
    const response = await axios.post<UserResponse>(
      `${API_BASE_URL}/auth/register`,
      userInput,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

export async function loginUser(loginInput: LoginInput): Promise<UserResponse> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      loginInput,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to login user");
  }
}

interface ApiResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

interface SingleProductResponse {
  success: boolean;
  data: Product;
}

// Products
export async function getProducts(): Promise<ApiResponse<Product>> {
  try {
    const response = await axios.get<ApiResponse<Product>>(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get products");
  }
}

export async function getProductById(id: string): Promise<SingleProductResponse> {
  try {
    const response = await axios.get<SingleProductResponse>(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get product by ID");
  }
}

export async function createProduct(product: Product): Promise<Product> {
  try {
    const response = await axios.post<Product>(
      `${API_BASE_URL}/products`,
      product
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create product");
  }
}

export async function updateProduct(
  id: string,
  product: Product
): Promise<Product> {
  try {
    const response = await axios.put<Product>(
      `${API_BASE_URL}/products/${id}`,
      product
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/products/${id}`);
  } catch (error) {
    throw new Error("Failed to delete product");
  }
}
