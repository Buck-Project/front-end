import type {
  Product,
  CreateProductPayload,
  CreateProductResponse,
  UpdateProductPayload,
} from "../types/productTypes";

import { getData, postData, putData, deleteData } from "./services";

export const getProductsService = async (): Promise<Product[]> => {
  return getData({
    endPoint: "/v1/products",
  });
};

export const createProductService = async (
  payload: CreateProductPayload
): Promise<CreateProductResponse> => {
  return postData({
    endPoint: "/v1/products",
    data: payload,
  });
};

export const updateProductService = async (
  productId: string,
  payload: UpdateProductPayload
): Promise<Product> => {
  return putData({
    endPoint: `/v1/products/${productId}`,
    data: payload,
  });
};

export const deleteProductService = async (
  productId: string
): Promise<void> => {
  return deleteData({
    endPoint: `/v1/products/${productId}`,
  });
};
