import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

/**
 * Profile.jsx
 * - مقدار اولیه را از location.state.data (اگر پاس شده) می‌گیرد.
 * - اگر نبود از localStorage ('signupData') می‌خواند.
 * - اگر آن هم نبود، از یک نمونه پیش‌فرض (مثال دادهٔ شما) استفاده می‌کند.
 *
 * ذخیره: هنگام زدن Save، داده‌ها در localStorage ثبت می‌شوند.
 */

export const Profile = () => {
  const { name } = useParams();
  const location = useLocation();

  // نمونه داده‌ای که فرستادی (فقط به‌عنوان fallback)
  const SAMPLE = {
    name: "Amirmohammad_amrayi",
    email: "amiramrayi56@gmail.com",
    age: 21,
    password: "Amir1234",
    confirmPass: "Amir1234",
    // چند فیلد اضافه
    phone: "",
    bio: "",
    city: "",
  };

  // مقدار اولیه — تلاش می‌کنیم از location.state، سپس localStorage، سپس SAMPLE استفاده کنیم
  const getInitial = () => {
    if (location && location.state && location.state.data) {
      const formData = location.state.data;
      // Map the form data to the expected structure
      return { 
        ...SAMPLE, 
        name: formData.username, // Map username to name
        email: formData.email,
        age: formData.age,
        password: formData.password,
        confirmPass: formData.confirmPass,
        username: formData.username,
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        phone: formData.phone || '',
        bio: formData.bio || '',
        city: formData.city || ''
      };
    }
    try {
      const stored = localStorage.getItem("signupData");
      if (stored) return { ...SAMPLE, ...JSON.parse(stored) };
    } catch (e) {
      /* ignore */
    }
    return { ...SAMPLE };
  };

  const [form, setForm] = useState(getInitial());
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  // اگر url name متفاوت با form.name بود (مثلاً url از navigate پر شد)، هماهنگش کن
  useEffect(() => {
    if (name && name !== form.name) {
      setForm((f) => ({ ...f, name }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 3) e.name = "نام باید حداقل ۳ حرف باشد.";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "ایمیل معتبر وارد کنید.";
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) <= 0) e.age = "سن معتبر وارد کنید.";
    if (!form.password || form.password.length < 6) e.password = "رمزحداقل ۶ کاراکتر باشد.";
    if (form.password !== form.confirmPass) e.confirmPass = "تأیید رمز با رمز مطابقت ندارد.";
    return e;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setMessage({ type: "error", text: "فرم را اصلاح کنید." });
      return;
    }

    // ذخیره در localStorage (یا اینجا می‌تونی API call بزنی)
    try {
      localStorage.setItem("signupData", JSON.stringify(form));
      setMessage({ type: "success", text: "اطلاعات با موفقیت ذخیره شد." });
      // پاک کردن خطاها
      setErrors({});
      // هر پیام را بعد از 3 ثانیه پاک می‌کنیم
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: "error", text: "خطا در ذخیره‌سازی." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <svg className="w-20 h-20 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{form.username || form.name || name}</h1>
              <p className="text-slate-600">صفحه پروفایل کاربری</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {message && (
                <div
                  className={`p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {message.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">نام کاربری</label>
                  <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
                  />
                  {errors.username && <p className="text-xs text-red-600 mt-1">{errors.username}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">ایمیل</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">نام</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">نام خانوادگی</label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">سن</label>
                  <input
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
                  />
                  {errors.age && <p className="text-xs text-red-600 mt-1">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">شماره تلفن</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="مثال: 091xxxxxxxx"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">درباره من</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
                  placeholder="یک توضیح کوتاه درباره خودت بنویس"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">شهر</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    // بازنشانی به محتوای ذخیره شده در localStorage یا نمونه
                    setForm(getInitial());
                    setMessage({ type: "success", text: "مقادیر بازنشانی شد." });
                    setTimeout(() => setMessage(null), 2500);
                  }}
                  className="px-4 py-2 rounded-lg border"
                >
                  بازنشانی
                </button>

                <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white">
                  ذخیره تغییرات
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4">درباره کاربر</h2>
              <p className="text-slate-600 leading-relaxed">
                این صفحه پروفایل کاربر <span className="font-semibold text-blue-600">{form.username || form.name}</span> است.
                اطلاعات بیشتری در آینده اضافه خواهد شد.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
