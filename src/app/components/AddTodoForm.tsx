"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { todoSchema, TodoFormData } from '../lib/validations'
import { useTodoStore } from '../store/todoStore'

export default function AddTodoForm() {
  const { addTodo, loading } = useTodoStore()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema)
  })

  const onSubmit = async (data: TodoFormData) => {
    console.log('Form submit:', data.title) // Debug
    await addTodo(data.title)
    console.log('Todo eklendi') // Debug
    reset()
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <div className="relative flex items-center">
            {/* Input with Icon */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                {...register('title')}
                type="text"
                placeholder="Bugün ne yapacaksın?"
                disabled={loading || isSubmitting}
                className={`block w-full pl-10 pr-4 py-4 text-gray-900 bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 disabled:bg-gray-50 ${
                  errors.title 
                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                }`}
              />
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="ml-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {loading || isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Ekliyor...
                </div>
              ) : (
                <div className="flex items-center">
                  <span>Ekle</span>
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>
        
        {/* Error Message */}
        {errors.title && (
          <div className="flex items-center mt-2 text-red-600">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{errors.title.message}</span>
          </div>
        )}
      </form>
    </div>
  )
}