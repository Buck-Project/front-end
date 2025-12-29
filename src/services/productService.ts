import axios from 'axios';

// ۱. تعریف Interface ها برای جلوگیری از ارورهای تایپ اسکریپت
export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    old_price?: number;
    description: string;
    images: string;
    images_list?: string[];
    material?: string;
    category?: string;
    category_model?: string;
    is_wishlisted?: boolean;
    rating?: number;
}

export interface Review {
    id: number;
    user_name: string;
    comment: string;
    rating: number;
}

// ۲. تنظیم آدرس پایه
const BASE_URL = 'http://buckgallery.ir/api';

/**
 * دریافت اطلاعات کامل محصول و نظرات (مطابق روت‌های ۲ و ۳ شما)
 */
export const getProductPageData = async (id: string | number) => {
    try {
        const [productRes, reviewsRes] = await Promise.all([
            axios.get<Product>(`${BASE_URL}/product-profiles/${id}`),
            axios.get<Review[]>(`${BASE_URL}/product-profiles/${id}/reviews`)
        ]);

        let productData = productRes.data;

        // اصلاح فرمت تصاویر (اگر رشته JSON بود به آرایه تبدیل شود)
        const rawImages = productData.images;
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

        productData.images = imageList[0] ?? "";
        productData.images_list = imageList;

        return {
            product: productData,
            reviews: reviewsRes.data
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
    const response = await axios.get<Product[]>(`${BASE_URL}/product-profiles`);
    return response.data;
};
