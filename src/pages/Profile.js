"use client"

import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"

/**
 * Profile.jsx
 * - مقدار اولیه را از location.state.data (اگر پاس شده) می‌گیرد.
 * - اگر نبود از localStorage ('signupData') می‌خواند.
 * - اگر آن هم نبود، از یک نمونه پیش‌فرض (مثال دادهٔ شما) استفاده می‌کند.
 *
 * ذخیره: هنگام زدن Save، داده‌ها در localStorage ثبت می‌شوند.
 */

export const Profile = () => {
  const { name } = useParams()
  const location = useLocation()

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
  }

  // مقدار اولیه — تلاش می‌کنیم از location.state، سپس localStorage، سپس SAMPLE استفاده کنیم
  const getInitial = () => {
    if (location && location.state && location.state.data) {
      const formData = location.state.data
      // Map the form data to the expected structure
      return {
        ...SAMPLE,
        name: formData.username, // Map username to name
        email: formData.email,
        age: formData.age,
        password: formData.password,
        confirmPass: formData.confirmPass,
        username: formData.username,
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        phone: formData.phone || "",
        bio: formData.bio || "",
        city: formData.city || "",
      }
    }
    try {
      const stored = localStorage.getItem("signupData")
      if (stored) return { ...SAMPLE, ...JSON.parse(stored) }
    } catch (e) {
      /* ignore */
    }
    return { ...SAMPLE }
  }

  const [form, setForm] = useState(getInitial())
  const [message, setMessage] = useState(null)
  const [errors, setErrors] = useState({})

  // اگر url name متفاوت با form.name بود (مثلاً url از navigate پر شد)، هماهنگش کن
  useEffect(() => {
    if (name && name !== form.name) {
      setForm((f) => ({ ...f, name }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    const e = {}
    if (!form.name || form.name.trim().length < 3) e.name = "نام باید حداقل ۳ حرف باشد."
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "ایمیل معتبر وارد کنید."
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) <= 0) e.age = "سن معتبر وارد کنید."
    if (!form.password || form.password.length < 6) e.password = "رمزحداقل ۶ کاراکتر باشد."
    if (form.password !== form.confirmPass) e.confirmPass = "تأیید رمز با رمز مطابقت ندارد."
    return e
  }

  const handleSave = (e) => {
    e.preventDefault()
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length > 0) {
      setMessage({ type: "error", text: "فرم را اصلاح کنید." })
      return
    }

    // ذخیره در localStorage (یا اینجا می‌تونی API call بزنی)
    try {
      localStorage.setItem("signupData", JSON.stringify(form))
      setMessage({ type: "success", text: "اطلاعات با موفقیت ذخیره شد." })
      // پاک کردن خطاها
      setErrors({})
      // هر پیام را بعد از 3 ثانیه پاک می‌کنیم
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      setMessage({ type: "error", text: "خطا در ذخیره‌سازی." })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{form.username || form.name || name}</h1>
            <p className="text-sm text-gray-500">ویرایش پروفایل</p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {message && (
              <div
                className={`p-3 rounded-xl text-sm text-center ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {message.text}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">نام کاربری</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-300 focus:outline-none text-right"
              />
              {errors.username && <p className="text-xs text-red-600 mt-1 text-right">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">ایمیل</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-300 focus:outline-none text-right"
              />
              {errors.email && <p className="text-xs text-red-600 mt-1 text-right">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">نام</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-300 focus:outline-none text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">نام خانوادگی</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-300 focus:outline-none text-right"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">سن</label>
                <input
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-300 focus:outline-none text-right"
                />
                {errors.age && <p className="text-xs text-red-600 mt-1 text-right">{errors.age}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">شماره تلفن</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="091xxxxxxxx"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-300 focus:outline-none text-right"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">درباره من</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-300 focus:outline-none resize-none text-right"
                placeholder="یک توضیح کوتاه درباره خودت بنویس"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">شهر</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-300 focus:outline-none text-right"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setForm(getInitial())
                  setMessage({ type: "success", text: "مقادیر بازنشانی شد." })
                  setTimeout(() => setMessage(null), 2500)
                }}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                بازنشانی
              </button>

              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
              >
                ذخیره تغییرات
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center leading-relaxed">
              این صفحه پروفایل کاربر <span className="font-semibold text-gray-900">{form.username || form.name}</span>{" "}
              است.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
