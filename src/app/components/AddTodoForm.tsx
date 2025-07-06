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
    await addTodo(data.title)
    reset() // Formu temizle
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            {...register('title')}
            type="text"
            placeholder="Yeni todo ekle..."
            disabled={loading || isSubmitting}
            className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 disabled:bg-gray-100 ${
              errors.title 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading || isSubmitting ? 'Ekliyor...' : 'Ekle'}
          </button>
        </div>
        
        {/* Error message */}
        {errors.title && (
          <p className="text-sm text-red-600 font-medium">
            {errors.title.message}
          </p>
        )}
      </div>
    </form>
  )
}