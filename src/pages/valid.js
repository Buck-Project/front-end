"use client"

import { useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState, useEffect, useRef } from "react"
import { verifyCode } from "../services/api"

export const Valid = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef([])

  useEffect(() => {
    if (location.state?.phone) {
      setPhone(location.state.phone)
    } else {
      navigate("/login")
    }
  }, [location, navigate])

  const schema = yup.object().shape({
    code: yup
      .string()
      .required("کد تایید اجباری است.")
      .matches(/^[0-9]{6}$/, "کد تایید باید 6 رقم باشد."),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) })

  const handleInputChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      setValue("code", newCode.join(""))

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const onFormSubmit = async (data) => {
    setLoading(true)
    setErrorMessage("")

    try {
      const result = await verifyCode(phone, data.code)

      if (result.success) {
        if (result.data.valid === true) {
          console.log("کد تایید صحیح است - ورود موفق")

          if (result.data.token) {
            localStorage.setItem("authToken", result.data.token)
          }

          navigate("/")
        } else {
          setErrorMessage("کد تایید نامعتبر است. لطفاً دوباره تلاش کنید.")
        }
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      console.error("خطا در تایید کد:", error)
      setErrorMessage("خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.")
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    setErrorMessage("")
    setLoading(true)

    try {
      const { checkPhone } = await import("../services/api")
      const result = await checkPhone(phone)

      if (result.success) {
        setErrorMessage("")
        alert("کد تایید مجدداً ارسال شد.")
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage("خطا در ارسال مجدد کد")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[75vh] py-12 px-4 bg-gray-50">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">عضویت/ورود</h2>
            {phone && (
              <p className="text-base text-gray-700 leading-relaxed">
                لطفا کد ارسال شده برای شماره <span className="font-semibold">{phone}</span> وارد کنید.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <div>
              <div className="flex justify-center gap-3 mb-4" dir="ltr">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={code[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={loading}
                    className="w-14 h-14 md:w-16 md:h-16 border-2 border-gray-300 rounded-2xl text-center text-2xl font-medium focus:border-gray-400 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                ))}
              </div>
              <input type="hidden" {...register("code")} />
              {errors.code && <p className="mt-2 text-sm text-red-600 text-center">{errors.code.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-4 px-4 rounded-2xl hover:bg-gray-800 transition-colors duration-200 font-semibold text-lg shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  در حال بررسی...
                </>
              ) : (
                "ورود"
              )}
            </button>

            <div className="text-center pt-6">
              <p className="text-gray-700 text-base">
                کد را دریافت نکردید؟{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={loading}
                  className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200 disabled:text-gray-400"
                >
                  ارسال مجدد
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
