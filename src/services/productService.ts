import type {
  Product,
  GetProductsResponse,
  CreateProductPayload,
  CreateProductResponse,
  UpdateProductPayload,
} from "../types/productTypes";

import { getData, postData, putData, deleteData } from "./services";

const PRODUCTS_ENDPOINT = "/table";

/**
 * GET /products
 * MockAPI returns: Product[]
 * App expects: { products: Product[] }
 */
export const getProductsService = async (): Promise<GetProductsResponse> => {
  const products = await getData({
    endPoint: PRODUCTS_ENDPOINT,
  });

  return {
    products: products as Product[],
  };
};

/**
 * POST /products
 */
export const createProductService = async (
  payload: CreateProductPayload
): Promise<CreateProductResponse> => {
  const product = await postData({
    endPoint: PRODUCTS_ENDPOINT,
    data: {
      ...payload,
      status: "active", // default
    },
  });

  return {
    product: product as Product,
  };
};

/**
 * PUT /products/:id
 */
export const updateProductService = async (
  productId: string,
  payload: UpdateProductPayload
): Promise<Product> => {
  return putData({
    endPoint: `${PRODUCTS_ENDPOINT}/${productId}`,
    data: payload,
  });
};

/**
 * DELETE /products/:id
 */
export const deleteProductService = async (
  productId: string
): Promise<void> => {
  await deleteData({
    endPoint: `${PRODUCTS_ENDPOINT}/${productId}`,
  });
};
