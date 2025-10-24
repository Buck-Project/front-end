import {useNavigate, Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

export const Validayion=() =>{
    const navigate = useNavigate()
    const schema = yup.object().shape({
        code: yup.string().required("کد تایید اجباری است.")
    })
    const {register, handleSubmit, formState:{errors}} =
    useForm({resolver: yupResolver(schema)})
    
    const onFormSubmit = (data) => {
        console.log('user is loged in', data);
        navigate("/")
    }
    return (
        <div className="flex items-center justify-center min-h-[75vh] py-12 px-4">
            <div className="w-full max-w-md">
                <div className="bg-customlight rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-800">احراز هویت</h2>
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                کد تایید
                            </label>
                            <input
                                type="string"
                                placeholder="X X X X X"
                                {...register("code")}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                            />
                            {errors.code && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-customBlack text-white py-3 px-4 rounded-lg hover:bg-customGray transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                        >
                            تایید
                        </button>

                        <div className="text-center pt-4 border-t border-slate-200">
                            <p className="text-slate-600 mb-2">کد تایید دریافت نکردید؟</p>
                            <Link
                                to='/validation'
                                className="text-customlight-600 hover:text-customBlack-700 font-medium transition-colors duration-200"
                            >
                                ارسال دوباره
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};