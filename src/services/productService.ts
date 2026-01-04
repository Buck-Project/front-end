import axios from 'axios';
import { baseURL } from './services';

// ۱. تعریف Interface ها برای جلوگیری از ارورهای تایپ اسکریپت
export interface Product {
    id: number;
    market_id?: number;
    name: string;
    brand?: string;
    price: number;
    old_price?: number;
    product_serial?: string | null;
    description?: string | null;
    images?: string | string[];
    image?: string | string[];
    images_list?: string[];
    tags?: string[] | null;
    color?: string[];
    size?: string | null;
    gender?: string | null;
    inventory_count?: number;
    material?: string;
    category?: string;
    category_model?: string;
    is_wishlisted?: boolean;
    rating?: number;
    rating_count?: number;
    sales?: number;
    status?: string;
    created_at?: string;
    updated_at?: string;
    market?: {
        id: number;
        manager_id?: number;
        brand?: string;
        description?: string | null;
        logo?: string | null;
        baner?: string | null;
        email?: string | null;
        mobile?: string | null;
        address?: string | null;
        created_at?: string;
        updated_at?: string;
    };
}

export interface Review {
    id: number;
    user_name: string;
    comment: string;
    rating: number;
}

type ApiResponse<T> = {
    status?: string;
    data?: T;
};

const unwrapData = <T>(payload: ApiResponse<T> | T): T => {
    return (payload as ApiResponse<T>).data ?? (payload as T);
};

const normalizeReviews = (payload: ApiResponse<Review[]> | Review[]) => {
    const reviews = unwrapData(payload);
    return Array.isArray(reviews) ? reviews : [];
};
// ۲. تنظیم آدرس پایه
const BASE_URL = baseURL;

/**
 * دریافت اطلاعات کامل محصول و نظرات (مطابق روت‌های ۲ و ۳ شما)
 */
export const getProductPageData = async (id: string | number) => {
    try {
        console.log("[productService] getProductPageData", id);
        const [productRes, reviewsRes] = await Promise.all([
            axios.get<ApiResponse<Product> | Product>(`${BASE_URL}/product-profiles/${id}`),
            axios.get<ApiResponse<Review[]> | Review[]>(`${BASE_URL}/product-profiles/${id}/reviews`)
        ]);

        const productData = unwrapData(productRes.data);
        const reviews = normalizeReviews(reviewsRes.data);
        console.log("[productService] product payload", {
            id: productData?.id,
            images: productData?.images,
            image: productData?.image,
            images_list: productData?.images_list,
            reviewsCount: reviews.length
        });

        // اصلاح فرمت تصاویر (اگر رشته JSON بود به آرایه تبدیل شود)
        const rawImages = productData.images_list ?? productData.images ?? productData.image;
        let imageList: string[] = [];

        if (typeof rawImages === 'string') {
            try {
                imageList = JSON.parse(rawImages);
            } catch {
                imageList = [rawImages];
            }
        } else if (Array.isArray(rawImages)) {
            imageList = rawImages;
        }

        if (!productData.images_list || productData.images_list.length === 0) {
            productData.images_list = imageList;
        }

        if (!productData.images && imageList.length > 0) {
            productData.images = imageList;
        }

        return {
            product: productData,
            reviews
        };
    } catch (error) {
        console.error("خطا در دریافت اطلاعات محصول:", error);
        throw error;
    }
};

/**
 * متد لایک/آن‌لایک (اصلاح شده مطابق عکسی که فرستادی)
 */
export const toggleWishlist = async (id: string | number) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error("توکن پیدا نشد. لطفا وارد شوید.");
    }

    // سینتکس دقیق برای رفع اروری که در عکس داشتی:
    // آرگومان اول: URL
    // آرگومان دوم: Body (چون خالیه {} می‌ذاریم)
    // آرگومان سوم: Config (شامل Headers)
    return axios.post(
        `${BASE_URL}/product-profiles/${id}/wishlist-toggle`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

/**
 * دریافت لیست محصولات برای گرید (روت شماره ۱ شما)
 */
export const getAllProductProfiles = async () => {
    const response = await axios.get<ApiResponse<Product[]> | Product[]>(`${BASE_URL}/product-profiles`);
    const payload = unwrapData(response.data);
    return Array.isArray(payload) ? payload : [];
};



