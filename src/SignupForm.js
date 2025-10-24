import {useNavigate, Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

export const SignupForm = () => {
    const navigate = useNavigate()

    const schema = yup.object().shape({
        name: yup.string().required("فیلد نام اجباری است."),
        email: yup.string().email("ایمیل نامعتبر است.").required("ایمیل اجباری است."),
        age: yup.number().positive().min(18).max(100).required("سن اجباری است."),
        password: yup.string().min(6).max(20).matches(/[a-z]+/)
        .matches(/[A-Z]+/).matches(/\d+/).required("رمز اجباری است."),
        confirmPass: yup.string().oneOf([yup.ref('password')], "پسوورد مشابه نیست").required("رمز اجباری است.")
    })
    const {register, handleSubmit, formState:{errors}} =
    useForm({resolver: yupResolver(schema)})

    const onFormSubmit = (data) => {
        console.log('form is submited', data);
        navigate("/")
    }

    return (
        <div className="flex items-center justify-center min-h-[75vh] py-12 px-4">
            <div className="w-full max-w-md">
                <div className="bg-customlight rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-800">ساخت حساب جدید</h2>
                        <p className="text-slate-600 mt-2">به خانواده ما بپیوندید</p>
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                نام
                            </label>
                            <input
                                type="text"
                                placeholder="نام خود را وارد کنید"
                                {...register("name")}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                            />
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                سن
                            </label>
                            <input
                                type="number"
                                placeholder="سن خود را وارد کنید"
                                {...register("age")}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                            />
                            {errors.age && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.age.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                ایمیل
                            </label>
                            <input
                                type="email"
                                placeholder="example@email.com"
                                {...register("email")}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                رمز عبور
                            </label>
                            <input
                                type="password"
                                placeholder="رمز عبور خود را وارد کنید"
                                {...register("password")}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                تکرار رمز عبور
                            </label>
                            <input
                                type="password"
                                placeholder="رمز عبور را دوباره وارد کنید"
                                {...register("confirmPass")}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                            />
                            {errors.confirmPass && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.confirmPass.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-customBlack text-white py-3 px-4 rounded-lg hover:bg-customGray transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                        >
                            ثبت نام
                        </button>

                        <div className="text-center pt-4 border-t border-slate-200">
                            <p className="text-slate-600 mb-2">قبلا ثبت نام کردید؟</p>
                            <Link
                                to='/login'
                                className="text-customBlack hover:text-customGray font-medium transition-colors duration-200"
                            >
                                ورود به حساب
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};