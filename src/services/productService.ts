import type {
  Product,
  GetProductsResponse,
  CreateProductPayload,
  CreateProductResponse,
  UpdateProductPayload,
} from "../types/productTypes";

import { getData, postData, putData, deleteData } from "./services";

const PRODUCTS_ENDPOINT = "/table";

const normalizeProduct = (product: any): Product => {
  const images = Array.isArray(product?.images)
    ? product.images
    : product?.image
    ? [product.image]
    : [];
  return {
    ...product,
    images,
  };
};

export const getProductsService = async (): Promise<GetProductsResponse> => {
  const products = await getData({
    endPoint: PRODUCTS_ENDPOINT,
  });

  const normalizedProducts = Array.isArray(products)
    ? products.map(normalizeProduct)
    : [];

  return {
    products: normalizedProducts,
  };
};

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
    product: normalizeProduct(product),
  };
};

export const updateProductService = async (
  productId: string,
  payload: UpdateProductPayload
): Promise<Product> => {
  const product = await putData({
    endPoint: `${PRODUCTS_ENDPOINT}/${productId}`,
    data: payload,
  });

  return normalizeProduct(product);
};

export const deleteProductService = async (
  productId: string
): Promise<void> => {
  await deleteData({
    endPoint: `${PRODUCTS_ENDPOINT}/${productId}`,
  });
};
