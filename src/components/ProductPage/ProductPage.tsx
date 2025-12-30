// src/pages/ProductPage.tsx

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { StarIcon, HeartIcon, ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon, CheckIcon, RepeatIcon, ShieldIcon, MessageSquareIcon, ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';

const isDarkColor = (hex: string) => {
    const normalized = hex.replace("#", "");
    const value = normalized.length === 3
        ? normalized.split("").map((c) => c + c).join("")
        : normalized;
    if (value.length !== 6) {
        return false;
    }
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance < 140;
};

// Mock Data
const mockProduct = {
    id: 1,
    name: "پیراهن بهاره آستین بلند",
    images: [
        "https://via.placeholder.com/600x800?text=Image+1",
        "https://via.placeholder.com/600x800?text=Image+2",
        "https://via.placeholder.com/600x800?text=Image+3",
        "https://via.placeholder.com/600x800?text=Image+4"
    ],
    brand: {
        name: "برند مدآوران",
        logo: "https://via.placeholder.com/50x50?text=Brand",
        isOfficial: true,
        description: "مد امروز، سبک فردا"
    },
    price: 850000,
    originalPrice: 1200000,
    discountPercent: 29,
    discountEndsIn: "23:45:34", // This will be dynamic in real app
    rating: 4.8,
    reviewsCount: 148,
    questionsCount: 18,
    stock: 15,
    colors: [
        { id: 1, name: "سبز", hex: "#008000" },
        { id: 2, name: "آبی", hex: "#0000FF" },
        { id: 3, name: "مشکی", hex: "#000000" },
        { id: 4, name: "O3U?UOO_", hex: "#FFFFFF" }
    ],
    sizes: ["XXXL","XXL", "XL", "L", "M", "S"],
    features: [
        "پارچه کتان ۱۰۰٪ طبیعی و ارگانیک",
        "مقاوم در برابر چروک و پارگی",
        "دوخت تمیز و حرفه‌ای",
        "ضد باکتری و ضد بو",
        "تنفس‌پذیری عالی برای فصل گرم",
        "قابل شستشو در ماشین لباسشویی"
    ],
    specifications: {
        fabric: "کتان ۱۰۰٪ طبیعی",
        country: "ایران",
        collar: "یقه برگردان",
        sleeve: "آستین بلند",
        pattern: "ساده تک رنگ",
        season: "بهار و تابستان"
    },
    relatedProducts: [
        { id: 2, name: "CATWAREHOUSE Bussiness Not Boomin مدل", price: 531999, originalPrice: 699999, discount: 24, image: "https://via.placeholder.com/200x250?text=Related+1", colors: ["#FF6B6B", "#008000", "#000000"] },
        { id: 3, name: "CATWAREHOUSE Bussiness Not Boomin مدل", price: 531999, originalPrice: 699999, discount: 24, image: "https://via.placeholder.com/200x250?text=Related+2", colors: ["#FF6B6B", "#008000", "#000000"] },
        { id: 4, name: "CATWAREHOUSE Bussiness Not Boomin مدل", price: 531999, originalPrice: 699999, discount: 24, image: "https://via.placeholder.com/200x250?text=Related+3", colors: ["#FF6B6B", "#008000", "#000000"] },
        { id: 5, name: "CATWAREHOUSE Bussiness Not Boomin مدل", price: 531999, originalPrice: 699999, discount: 24, image: "https://via.placeholder.com/200x250?text=Related+4", colors: ["#FF6B6B", "#008000", "#000000"] },
        { id: 6, name: "CATWAREHOUSE Bussiness Not Boomin مدل", price: 531999, originalPrice: 699999, discount: 24, image: "https://via.placeholder.com/200x250?text=Related+5", colors: ["#FF6B6B", "#008000", "#000000"] },
    ],
    reviews: [
        {
            id: 1,
            user: "ایلیا موسوی",
            avatar: "https://via.placeholder.com/40x40?text=U1",
            rating: 5,
            text: "کیفیت محصولات این برند واقعاً عالیه. پارچه‌ها مرغوب هستند و دوخت محصولات بسیار تمیز و حرفه‌ای است.",
            helpful: 29,
            notHelpful: 2
        },
        {
            id: 2,
            user: "ریحانه کردگاری",
            avatar: "https://via.placeholder.com/40x40?text=U2",
            rating: 5,
            text: "بسته‌بندی محصولات خیلی شیک بود و ارسال هم سریع انجام شد. مانتوی که خریدم دقیقاً مطابق تصویر بود.",
            helpful: 36,
            notHelpful: 1
        }
    ],
    questions: [
        {
            id: 1,
            user: "شما",
            question: "آیا این پیراهن آب می‌رود؟",
            answer: "خیر، این محصول با پارچه کتان مرغوب و رنگ ثابت تولید شده و آب نمی‌رود.",
            answeredBy: "پاسخ فروشنده",
            daysAgo: 3
        },
        {
            id: 2,
            user: "شما",
            question: "برای قد ۱۸۰ سانتی متر چه سایزی مناسب است؟",
            answer: "برای قد ۱۸۰ سانتی متر، سایز XL یا L توصیه می‌شود. بهتر است جدول سایز را بررسی کنید.",
            answeredBy: "پاسخ فروشنده",
            daysAgo: 1
        }
    ]
};

// Custom Star Rating Component
const StarRating: React.FC<{
    value: number;
    onChange: (value: number) => void;
}> = ({ value, onChange }) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const handleClick = (newValue: number) => {
        onChange(newValue);
    };

    const handleMouseEnter = (newValue: number) => {
        setHoverValue(newValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(null);
    };

    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => {
                const filled = hoverValue ? star <= hoverValue : star <= value;
                return (
                    <StarIcon
                        key={star}
                        className={`w-6 h-6 cursor-pointer transition-colors ${filled ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                            }`}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                    />
                );
            })}
        </div>
    );
};

// Product Image Gallery Component
const ProductImageGallery: React.FC<{
    images: string[];
}> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const selectImage = (index: number) => {
        setCurrentIndex(index);
    };

    const thumbnailImages = images.slice(0, 4);

    return (
        <div className="space-y-4">
            <div className="relative w-[500px] h-[500px] bg-gray-100 rounded-xl overflow-hidden mx-auto">
                <img
                    src={images[currentIndex]}
                    alt={`Product Image ${currentIndex + 1}`}
                    className="w-full h-full object-contain"
                />
                <button
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all"
                >
                    <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                </button>
            </div>
            <div className="flex gap-[10px] overflow-x-auto justify-center">
                {thumbnailImages.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`w-[90px] h-[90px] rounded-lg overflow-hidden border-2 transition-all ${currentIndex === index ? 'border-pink-500' : 'border-gray-200'
                            }`}
                    >
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

// Product Details Component
const ProductDetails: React.FC<{
    product: typeof mockProduct;
}> = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
      const [selectedColor, setSelectedColor] = useState<number | null>(
          () => product.colors[0]?.id ?? null
      );
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews' | 'questions'>('description');
    const [discountEndsIn, setDiscountEndsIn] = useState(product.discountEndsIn);

    const handleAddToCart = () => {
        alert(`محصول ${product.name} با تعداد ${quantity} به سبد خرید اضافه شد.`);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
        if (!product.discountEndsIn) return;
        const parts = product.discountEndsIn.split(":").map(Number);
        if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) return;

        let remaining = parts[0] * 3600 + parts[1] * 60 + parts[2];
        const tick = () => {
            const clamped = Math.max(0, remaining);
            const hours = String(Math.floor(clamped / 3600)).padStart(2, "0");
            const minutes = String(Math.floor((clamped % 3600) / 60)).padStart(2, "0");
            const seconds = String(clamped % 60).padStart(2, "0");
            setDiscountEndsIn(`${hours}:${minutes}:${seconds}`);
            remaining -= 1;
        };

        tick();
        const intervalId = window.setInterval(tick, 1000);
        return () => window.clearInterval(intervalId);
    }, [product.discountEndsIn]);

    return (
        <div className="bg-white rounded-xl shadow-md p-6 w-full w-[720px] mx-auto">
            {/* Header with Favorite */}
            <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <button
                    onClick={toggleFavorite}
                    className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-gray-500 bg-transparent hover:text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                >
                    <HeartIcon className={`w-6 h-6 transition-colors ${isFavorite ? "fill-red-500" : "fill-none"}`} />
                </button>
            </div>

            {/* Product Image Gallery */}
            <ProductImageGallery images={product.images} />

            {/* Brand Section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg w-full w-[720px] mx-auto">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">B</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">{product.brand.name}</span>
                            {product.brand.isOfficial && (
                                <Badge variant="secondary" className="bg-pink-500 text-white">برند رسمی</Badge>
                            )}
                        </div>
                        <p className="text-sm text-gray-600">{product.brand.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">{product.rating}</span>
                        <StarIcon className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span>امتیاز</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">{product.reviewsCount}</span>
                        <span>دنبال کننده</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-semibold">{product.stock}</span>
                        <span>فروش</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={toggleFollow}>
                        {isFollowing ? 'دنبال می‌کنید' : 'دنبال کردن'}
                    </Button>
                </div>
            </div>

            {/* Discount Banner */}
            {product.discountPercent > 0 && (
                <div className="mt-4 p-4 bg-gradient-to-r from-[#ED775A] to-[#E4004B] rounded-lg text-white w-full mx-auto">
                    <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-white/30 text-white">تخفیف {product.discountPercent}%</Badge>
                        <div className="flex items-center gap-2">
                            <span>پیشنهاد ویژه محدود</span>
                            <ClockIcon className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="mt-2 text-xl font-bold">{discountEndsIn}</div>
                    <div className="mt-1 text-sm">تا پایان تخفیف باقی مانده ...</div>
                </div>
            )}

            {/* Price Section */}
            <div className="mt-6 w-full w-[720px] mx-auto">
                <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-pink-600">{product.price.toLocaleString()} تومان</span>
                    {product.originalPrice > product.price && (
                        <span className="text-gray-500 line-through">{product.originalPrice.toLocaleString()} تومان</span>
                    )}
                </div>
                {product.originalPrice > product.price && (
                    <div className="mt-1 text-green-600 text-sm">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% تخفیف شما
                    </div>
                )}
                <div className="mt-4 w-full bg-gray-300 h-2 rounded-full">
                    <div
                        className="bg-black h-full rounded-full"
                        style={{ width: `${(product.stock / 100) * 100}%` }}
                    ></div>
                </div>
                <div className="mt-1 text-xs text-gray-500">فقط {product.stock} عدد باقی مانده!</div>
            </div>

            {/* Selection Options */}
            <div className="mt-6 flex flex-col md:flex-row-reverse gap-16 w-full max-w-[720px] mx-auto">
                <div className="flex-1 p-3">
                    <Label className="block mb-2 text-right">تعداد:</Label>
                    <div className="flex items-center justify-start gap-2">
                        <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                            -
                        </Button>
                        <span className="w-8 text-center">{quantity}</span>
                        <Button variant="outline" size="icon" onClick={increaseQuantity} disabled={quantity >= product.stock}>
                            +
                        </Button>
                    </div>
                </div>

                <div className="flex-1 p-3">
                    <Label className="block mb-2 text-right">انتخاب سایز:</Label>
                    <div className="flex justify-center gap-2">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3 py-1 border rounded-md transition-all ${selectedSize === size ? 'bg-pink-100 border-pink-500' : 'border-gray-300'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 p-3">
                    <Label className="block mb-2 text-right">رنگ:</Label>
                    <div className="flex justify-end gap-2">
                        {product.colors.map((color) => (
                            <button
                                key={color.id}
                                type="button"
                                onClick={() => setSelectedColor(color.id)}
                                className={`relative w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color.id ? 'border-black' : 'border-gray-300'
                                    }`}
                                style={{ backgroundColor: color.hex }}
                            >
                                {selectedColor === color.id && (
                                    <span
                                        className={`absolute inset-0 flex items-center justify-center ${isDarkColor(color.hex)
                                            ? "text-white"
                                            : "text-gray-800"
                                            }`}
                                    >
                                        <CheckIcon className="w-4 h-4" />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {/* Add to Cart Button */}
            <Button
                className="mt-6 w-full mx-auto bg-gradient-to-r from-[#ED775A] to-[#E4004B] hover:from-[#ED775A]/90 hover:to-[#E4004B]/90 text-white"
                onClick={handleAddToCart}
            >
                <ShoppingCartIcon className="ml-2 w-5 h-5" />
                افزودن به سبد خرید
            </Button>

            {/* Trust Icons */}
            <div className="mt-6 flex justify-around w-full w-[720px] mx-auto">
                <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-sm">پرداخت امن</div>
                </div>
                <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <RepeatIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-sm">بازگشت آسان</div>
                </div>
                <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <ShieldIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-sm">تضمین اصالت</div>
                </div>
            </div>
        </div>
    );
};

// Tabs Component for Description, Specifications, Reviews, Questions
const ProductTabs: React.FC<{
    product: typeof mockProduct;
}> = ({ product }) => {
    const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews' | 'questions'>('description');
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [reviews, setReviews] = useState(() => product.reviews);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [showAllQuestions, setShowAllQuestions] = useState(false);

    const submitReview = () => {
        if (reviewRating === 0 || reviewText.trim() === '') {
            alert('لطفاً امتیاز و نظر خود را وارد کنید.');
            return;
        }
        const newReview = {
            id: Math.max(0, ...reviews.map((review) => review.id)) + 1,
            user: "You",
            rating: reviewRating,
            text: reviewText,
            helpful: 0,
            notHelpful: 0,
        };
        setReviews((prev) => [newReview, ...prev]);
        setReviewRating(0);
        setReviewText('');
    };

    const toggleReviewVote = (reviewId: number, vote: "helpful" | "notHelpful") => {
        setReviews((prev) =>
            prev.map((review) => {
                if (review.id !== reviewId) {
                    return review;
                }
                let { helpful, notHelpful, userVote } = review as { helpful: number; notHelpful: number; userVote?: "helpful" | "notHelpful" | null };
                if (userVote === vote) {
                    userVote = null;
                    if (vote === "helpful") helpful = Math.max(0, helpful - 1);
                    if (vote === "notHelpful") notHelpful = Math.max(0, notHelpful - 1);
                } else {
                    if (userVote === "helpful") helpful = Math.max(0, helpful - 1);
                    if (userVote === "notHelpful") notHelpful = Math.max(0, notHelpful - 1);
                    userVote = vote;
                    if (vote === "helpful") helpful += 1;
                    if (vote === "notHelpful") notHelpful += 1;
                }
                return { ...review, helpful, notHelpful, userVote };
            })
        );
    };

    const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 2);
    const visibleQuestions = showAllQuestions ? product.questions : product.questions.slice(0, 2);

    const submitQuestion = () => {
        if (questionText.trim() === '') {
            alert('لطفاً سوال خود را وارد کنید.');
            return;
        }
        alert('سوال شما با موفقیت ثبت شد.');
        setQuestionText('');
    };

    return (
        <div className="mt-6 bg-white rounded-xl shadow-md mx-auto w-full w-[720px]">
            <div className="border-b">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'description'
                                ? 'bg-blue-100 text-blue-800 border-b-2 border-blue-500'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        توضیحات
                    </button>
                    <button
                        onClick={() => setActiveTab('specifications')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'specifications'
                                ? 'bg-orange-100 text-orange-800 border-b-2 border-orange-500'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        مشخصات
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'reviews'
                                ? 'bg-green-100 text-green-800 border-b-2 border-green-500'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        نظرات ({product.reviewsCount})
                    </button>
                    <button
                        onClick={() => setActiveTab('questions')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'questions'
                                ? 'bg-purple-100 text-purple-800 border-b-2 border-purple-500'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        پرسش و پاسخ ({product.questionsCount})
                    </button>
                </div>
            </div>

            <div className="p-6">
                {activeTab === 'description' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">درباره این محصول</h2>
                        <p className="mb-6">
                            این پیراهن کتان با طراحی مینیمال و مدرن، انتخابی عالی برای استایل روزمره شماست. پارچه کتان با کیفیت بالا، نرم و راحتی فوق‌العاده‌ای را به شما هدیه می‌دهد. مناسب برای فصل بهار و تابستان.
                        </p>
                        <h3 className="text-lg font-semibold mb-3">ویژگی‌های برجسته</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {product.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <CheckIcon className="w-5 h-5 text-green-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'specifications' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">مشخصات فنی</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="font-semibold">جنس پارچه</div>
                                <div>{product.specifications.fabric}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="font-semibold">کشور سازنده</div>
                                <div>{product.specifications.country}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="font-semibold">نوع یقه</div>
                                <div>{product.specifications.collar}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="font-semibold">نوع استین</div>
                                <div>{product.specifications.sleeve}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="font-semibold">الگو</div>
                                <div>{product.specifications.pattern}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="font-semibold">فصل مناسب</div>
                                <div>{product.specifications.season}</div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">نظرات مشتریان</h2>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-2xl font-bold">{product.rating}</div>
                            <div className="flex items-center gap-1">
                                <StarIcon className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                <span>از {product.reviewsCount} نظر</span>
                            </div>
                        </div>

                        {/* Write Review */}
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <span>شما</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <StarRating value={reviewRating} onChange={setReviewRating} />
                                </div>
                                <Input
                                    placeholder="نظر خود را ثبت کنید ..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    className="mb-4 rounded-[30px] placeholder:text-gray-400"
                                />
                                <div className="mt-2 flex justify-end">
                                    <Button onClick={submitReview} className="bg-[#E4004B] text-white rounded-[30px] hover:bg-[#E4004B]/90">{"\u062b\u0628\u062a \u0646\u0638\u0631 \u062c\u062f\u06cc\u062f"}</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Reviews List */}
                        {visibleReviews.map((review) => (
                            <Card key={review.id} className="mb-4">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                        <span>{review.user}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIcon
                                                key={star}
                                                className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4">{review.text}</p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleReviewVote(review.id, "helpful")}
                                            className={`flex items-center gap-1 hover:text-black ${review.userVote === "helpful" ? "bg-green-500 text-white border-green-500" : ""}`}
                                        >
                                            <ThumbsUpIcon className="w-4 h-4" /> مفید بود ({review.helpful})
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleReviewVote(review.id, "notHelpful")}
                                            className={`flex items-center gap-1 hover:text-black ${review.userVote === "notHelpful" ? "bg-red-500 text-white border-red-500" : ""}`}
                                        >
                                            <ThumbsDownIcon className="w-4 h-4" /> مفید نبود ({review.notHelpful})
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {!showAllReviews && (
                            <div className="flex justify-center">
                                <Button
                                    variant="outline"
                                    className="bg-gradient-to-r from-[#ED775A] to-[#E4004B] text-white rounded-[30px] hover:from-[#ED775A]/90 hover:to-[#E4004B]/90"
                                    onClick={() => setShowAllReviews(true)}
                                >
                                    {"\u0645\u0634\u0627\u0647\u062f\u0647 \u06cc \u0647\u0645\u0647 \u0646\u0638\u0631\u0627\u062a"}
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'questions' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">پرسش و پاسخ</h2>

                        {/* Ask Question */}
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <span>شما</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <StarRating value={reviewRating} onChange={setReviewRating} />
                                </div>
                                <Input
                                    placeholder="\u067e\u0631\u0633\u0634 \u062e\u0648\u062f \u0631\u0627 \u062b\u0628\u062a \u06a9\u0646\u06cc\u062f ..."
                                    value={questionText}
                                    onChange={(e) => setQuestionText(e.target.value)}
                                    className="mb-4 rounded-[30px] placeholder:text-gray-400"
                                />
                                <div className="mt-2 flex justify-end">
                                    <Button onClick={submitQuestion} className="bg-[#E4004B] text-white rounded-[30px] hover:bg-[#E4004B]/90">{"\u062b\u0628\u062a \u067e\u0631\u0633\u0634 \u062c\u062f\u06cc\u062f"}</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Questions List */}
                        {visibleQuestions.map((q) => (
                            <Card key={q.id} className="mb-4 bg-green-50">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <MessageSquareIcon className="w-5 h-5 text-green-600" />
                                        <span>{q.question}</span>
                                    </div>
                                    <div className="text-xs text-green-600 mt-1">پیش {q.daysAgo} روز</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-white p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckIcon className="w-4 h-4 text-green-600" />
                                            <span className="text-green-600">{q.answeredBy}</span>
                                        </div>
                                        <p>{q.answer}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {!showAllQuestions && product.questions.length > 2 && (
                            <div className="flex justify-center">
                                <Button
                                    variant="outline"
                                    className="bg-gradient-to-r from-[#ED775A] to-[#E4004B] text-white rounded-[30px] hover:from-[#ED775A]/90 hover:to-[#E4004B]/90"
                                    onClick={() => setShowAllQuestions(true)}
                                >
                                    {"\u0645\u0634\u0627\u0647\u062f\u0647 \u06cc \u0647\u0645\u0647 \u067e\u0631\u0633\u0634 \u0647\u0627"}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// Related Products Carousel
const RelatedProducts: React.FC<{
    products: typeof mockProduct.relatedProducts;
}> = ({ products }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    };

    const visibleProducts = products.slice(currentIndex, currentIndex + 4);

    return (
        <div className="mt-6 mx-auto w-full w-[720px]">
            <h2 className="text-xl font-bold mb-4">محصولات مرتبط</h2>
            <div className="relative">
                <div className="flex gap-4">
                    {visibleProducts.map((product) => (
                        <Card key={product.id} className="w-48 flex-shrink-0">
                            <div className="relative">
                                {product.discount > 0 && (
                                    <Badge variant="secondary" className="absolute top-2 left-2 bg-orange-500 text-white">
                                        {product.discount}%
                                    </Badge>
                                )}
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                    <button className="absolute top-2 right-2 p-1 bg-white/70 rounded-full">
                                        <HeartIcon className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                            <CardContent className="p-3">
                                <div className="text-xs text-gray-500 mb-1">{product.name}</div>
                                <div className="flex items-center gap-1 mb-2">
                                    <span className="text-sm font-bold text-pink-600">{product.price.toLocaleString()}</span>
                                    {product.originalPrice > product.price && (
                                        <span className="text-xs line-through text-gray-400">{product.originalPrice.toLocaleString()}</span>
                                    )}
                                </div>
                                <div className="flex gap-1 mb-2">
                                    {product.colors.map((color, index) => (
                                        <div
                                            key={index}
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: color }}
                                        ></div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <button
                    onClick={goToPrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all"
                >
                    <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                </button>
            </div>
        </div>
    );
};

// Clock Icon for Timer (Simple version)
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
);

// Main Product Page Component
const ProductPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-8 max-w-5xl text-right" dir="rtl">
            <div className="grid grid-cols-1 gap-8 items-start">
                <div className="flex flex-col items-center">
                    <ProductDetails product={mockProduct} />
                    <ProductTabs product={mockProduct} />
                    <RelatedProducts products={mockProduct.relatedProducts} />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;



