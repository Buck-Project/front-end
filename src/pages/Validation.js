import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState, useEffect } from 'react'
import { verifyCode } from '../services/api'


export const Validation = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [phone, setPhone] = useState('')

    // دریافت شماره تلفن از state
    useEffect(() => {
        if (location.state?.phone) {
            setPhone(location.state.phone)
        } else {
            // اگر شماره نداشت، برگرد به صفحه لاگین
            navigate('/login')
        }
    }, [location, navigate])

    const schema = yup.object().shape({
        code: yup.string()
            .required("کد تایید اجباری است.")
            .matches(/^[0-9]{6}$/, "کد تایید باید 6 رقم باشد.")
    })

    const { register, handleSubmit, formState: { errors } } =
        useForm({ resolver: yupResolver(schema) })

    const onFormSubmit = async (data) => {
        setLoading(true)
        setErrorMessage('')

        try {
            // ارسال کد تایید به Backend
            const result = await verifyCode(phone, data.code)

            if (result.success) {
                // بررسی پاسخ Backend
                if (result.data.valid === true) {
                    // کد صحیح است - ورود موفق
                    console.log('کد تایید صحیح است - ورود موفق')
                    
                    // ذخیره اطلاعات کاربر (مثلاً token) در localStorage
                    if (result.data.token) {
                        localStorage.setItem('authToken', result.data.token)
                    }
                    
                    // هدایت به صفحه اصلی یا پروفایل
                    navigate("/")
                } else {
                    // کد اشتباه است
                    setErrorMessage('کد تایید نامعتبر است. لطفاً دوباره تلاش کنید.')
                }
            } else {
                // خطا در ارتباط با سرور
                setErrorMessage(result.message)
            }
        } catch (error) {
            console.error('خطا در تایید کد:', error)
            setErrorMessage('خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.')
        } finally {
            setLoading(false)
        }
    }

    const handleResendCode = async () => {
        setErrorMessage('')
        setLoading(true)

        try {
            // دوباره درخواست ارسال کد
            const { checkPhone } = await import('../services/api')
            const result = await checkPhone(phone)

            if (result.success) {
                setErrorMessage('')
                alert('کد تایید مجدداً ارسال شد.')
            } else {
                setErrorMessage(result.message)
            }
        } catch (error) {
            setErrorMessage('خطا در ارسال مجدد کد')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[75vh] py-12 px-4">
            <div className="w-full max-w-md">
                <div className="bg-customlight rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-800">احراز هویت</h2>
                        {phone && (
                            <p className="text-sm text-slate-600 mt-2">
                                کد تایید به شماره <span className="font-bold">{phone}</span> ارسال شد
                            </p>
                        )}
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                        {/* نمایش خطای کلی */}
                        {errorMessage && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                <p className="text-sm">{errorMessage}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                کد تایید
                            </label>
                            <input
                                type="text"
                                placeholder="12345"
                                maxLength="5"
                                {...register("code")}
                                disabled={loading}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-center text-2xl tracking-widest disabled:bg-slate-100 disabled:cursor-not-allowed"
                            />
                            {errors.code && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1 justify-center">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.code.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-customBlack text-white py-3 px-4 rounded-lg hover:bg-customGray transition-colors duration-200 font-medium shadow-md hover:shadow-lg disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    در حال بررسی...
                                </>
                            ) : (
                                'تایید'
                            )}
                        </button>

                        <div className="text-center pt-4 border-t border-slate-200">
                            <p className="text-slate-600 mb-2">کد تایید دریافت نکردید؟</p>
                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={loading}
                                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 disabled:text-slate-400"
                            >
                                ارسال دوباره
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};