import logo from './assets/logo.png';

export const Home = () => {
    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="text-center max-w-2xl mx-auto px-4">
                <div className="bg-customlight rounded-2xl shadow-xl p-12">
                    <div className="mb-6">
                          <img 
                             src={logo} 
                              alt="لوگو" 
                              className="w-[250px] h-[250px] mx-auto"
                             />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">
                        خوش آمدید
                    </h1>
                    <p className="text-lg text-slate-600 mb-8">
                        به صفحه اصلی اپلیکیشن خود خوش آمدید. برای استفاده از امکانات، لطفاً وارد شوید یا ثبت نام کنید.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <a
                            href="/login"
                            className="px-8 py-3 bg-customBlack text-white rounded-lg hover:bg-customGray transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                        >
                            ورود
                        </a>
                        <a
                            href="/signUp"
                            className="px-8 py-3 bg-customBlack text-white rounded-lg hover:bg-customGray transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                        >
                            ثبت نام
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};