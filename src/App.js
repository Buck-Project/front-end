import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LoginForm } from './pages/LoginForm';
import { Home } from './pages/Home';
import { SignupForm } from './pages/SignupForm';
import { Profile } from './pages/Profile';
import { Validation } from './pages/Validation';
// import { Valid } from './pages/valid'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center gap-6 text-lg">
              <Link
                to='/'
                className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                خانه
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                to='/login'
                className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                ورود
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                to='/signUp'
                className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                ثبت نام
              </Link>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signUp' element={<SignupForm />} />
            <Route path='/validation' element={<Validation />} />
            {/* <Route path='/valid' element={<Valid />} /> */}
            <Route path='/profile/:name' element={<Profile />} />
            <Route path='*' element={
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
                  <p className="text-2xl text-slate-600">صفحه مورد نظر یافت نشد</p>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
