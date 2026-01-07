import type {
  Product as ProductRecord,
  GetProductsResponse,
  CreateProductPayload,
  CreateProductResponse,
  UpdateProductPayload,
} from "../types/productTypes";

import { getData, postImageData, putImageData, deleteData } from "./services";

export type Review = {
  id: number;
  user_name: string;
  rating: number;
  comment?: string | null;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  old_price?: number;
  rating?: number;
  rating_count?: number;
  inventory_count?: number;
  images_list?: string[];
  image?: string | string[];
  images?: string | string[];
  description?: string | null;
  brand?: string | null;
  material?: string | null;
  color?: string[] | string | null;
  size?: string | null;
  market?: {
    brand?: string;
    description?: string;
    logo?: string | null;
  } | null;
};

export type ProductPageData = {
  product: Product;
  reviews: Review[];
};

const normalizeProduct = (product: any): ProductRecord => {
  const imageSource =
    product?.images ??
    product?.image ??
    product?.image_url ??
    product?.imageUrl ??
    product?.image_path ??
    product?.imagePath ??
    null;
  const images = Array.isArray(imageSource)
    ? imageSource
    : imageSource
    ? [imageSource]
    : [];
  const rawId =
    product?.id ?? product?.product_id ?? product?.productId ?? product?.product_serial ?? "";
  const rawPrice = product?.price ?? product?.unit_price ?? 0;
  const rawStock = product?.inventory_count ?? product?.stock ?? product?.inventory ?? 0;
  const price = Number(rawPrice);
  const stock = Number(rawStock);
  return {
    id: rawId ? String(rawId) : "",
    name: product?.name ?? "",
    images,
    category: product?.category ?? "",
    sku: product?.product_serial ?? product?.sku ?? "",
    stock: Number.isNaN(stock) ? 0 : stock,
    price: Number.isNaN(price) ? 0 : price,
    status: product?.status === "inactive" ? "inactive" : "active",
    description: product?.description ?? "",
    brand: product?.brand ?? "",
    color: product?.color ?? "",
    marketId:
      product?.market_id !== undefined && product?.market_id !== null
        ? Number(product.market_id)
        : product?.marketId !== undefined && product?.marketId !== null
        ? Number(product.marketId)
        : undefined,
    sex: product?.sex ?? undefined,
    model: product?.category_model ?? product?.model ?? undefined,
  };
};

const getMarketId = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("marketId") ?? localStorage.getItem("userId");
};

const appendFormValue = (
  formData: FormData,
  key: string,
  value: string | number | undefined | null
) => {
  if (value === undefined || value === null) return;
  formData.append(key, String(value));
};

const appendImageFiles = (formData: FormData, files?: File[]) => {
  if (!files || files.length === 0) return;
  files.forEach((file) => {
    if (file) {
      formData.append("images", file);
    }
  });
};

const buildProductFormData = (
  payload: CreateProductPayload | UpdateProductPayload
) => {
  const formData = new FormData();
  const marketId = getMarketId();
  if (marketId) {
    formData.append("market_id", marketId);
  }

  appendFormValue(formData, "name", payload.name);
  appendFormValue(formData, "brand", payload.brand);
  appendFormValue(formData, "product_serial", payload.sku);
  appendFormValue(formData, "price", payload.price);
  appendFormValue(formData, "description", payload.description);
  appendFormValue(formData, "category", payload.category);
  appendFormValue(formData, "category_model", payload.model);
  appendFormValue(formData, "color", payload.color);
  appendFormValue(formData, "inventory_count", payload.stock);
  appendImageFiles(formData, payload.imageFiles);

  return formData;
};

const unwrapProductResponse = (value: any): Product => {
  if (value?.product) return value.product;
  if (value?.data) return value.data;
  return value;
};

const unwrapReviewsResponse = (value: any): Review[] => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.reviews)) return value.reviews;
  if (Array.isArray(value?.data)) return value.data;
  return [];
};

export const getProductPageData = async (
  productId: string | number
): Promise<ProductPageData> => {
  const [productResponse, reviewsResponse] = await Promise.all([
    getData({ endPoint: `/api/product/${productId}` }),
    getData({ endPoint: `/api/product/${productId}/reviews` }),
  ]);

  return {
    product: unwrapProductResponse(productResponse),
    reviews: unwrapReviewsResponse(reviewsResponse),
  };
};

export const getProductsService = async (): Promise<GetProductsResponse> => {
  const products = await getData({
    endPoint: "/api/manager/Rproduct",
  });

  const source = Array.isArray(products)
    ? products
    : Array.isArray(products?.products)
    ? products.products
    : Array.isArray(products?.data)
    ? products.data
    : [];
  const normalizedProducts = source.map(normalizeProduct);

  return {
    products: normalizedProducts,
  };
};

export const createProductService = async (
  payload: CreateProductPayload
): Promise<CreateProductResponse> => {
  const formData = buildProductFormData(payload);
  const product = await postImageData({
    endPoint: "/api/manager/Cproduct",
    data: formData,
  });

  return {
    product: normalizeProduct(product),
  };
};

export const updateProductService = async (
  productId: string,
  payload: UpdateProductPayload
): Promise<ProductRecord> => {
  const formData = buildProductFormData(payload);
  const product = await putImageData({
    endPoint: `${"/api/manager/Uproduct"}/${productId}`,
    data: formData,
  });

  return normalizeProduct(product);
};

export const deleteProductService = async (
  productId: string
): Promise<void> => {
  await deleteData({
    endPoint: `${"/api/manager/Dproduct"}/${productId}`,
  });
};
