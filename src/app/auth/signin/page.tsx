"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, SignInFormData } from '../../lib/validations'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signIn('credentials', {
        email: data.email,
        name: data.name || data.email,
        redirect: false
      })

      if (result?.ok) {
        router.push('/')
      }
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border border-gray-200/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <span className="text-white text-2xl font-bold">📝</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Medyanes Todo
            </h1>
            <p className="text-gray-600">
              Hoş geldin! Giriş yap ve todoların ile buluş 🚀
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Adresi *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className={`block w-full pl-10 pr-4 py-3 text-gray-900 bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                    errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                  }`}
                  placeholder="ornek@email.com"
                />
              </div>
              {errors.email && (
                <p className="flex items-center text-sm text-red-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                İsim Soyisim
                <span className="text-gray-400 font-normal ml-1">(opsiyonel)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  {...register('name')}
                  type="text"
                  className={`block w-full pl-10 pr-4 py-3 text-gray-900 bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                    errors.name
                      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                  }`}
                  placeholder="Adınız Soyadınız"
                />
              </div>
              {errors.name && (
                <p className="flex items-center text-sm text-red-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Giriş yapılıyor...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Giriş Yap / Kayıt Ol</span>
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Medyanes için ❤️ ile geliştirildi
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm text-gray-600 font-medium">Hızlı</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-sm text-gray-600 font-medium">Güvenli</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
            <div className="text-2xl mb-2">✨</div>
            <p className="text-sm text-gray-600 font-medium">Modern</p>
          </div>
        </div>
      </div>
    </div>
  )
}