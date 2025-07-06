"use client"

import { useState } from 'react'
import { useTodoStore } from '../store/todoStore'

export default function AddTodoForm() {
  const [title, setTitle] = useState('')
  const { addTodo, loading } = useTodoStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    alert('BASIT FORM ÇALIŞTI: ' + title) // Test için
    
    if (title.trim()) {
      await addTodo(title.trim())
      setTitle('')
    }
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="relative flex items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Bugün ne yapacaksın?"
                disabled={loading}
                className="block w-full pl-10 pr-4 py-4 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 disabled:bg-gray-50"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || !title.trim()}
              className="ml-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {loading ? 'Ekliyor...' : 'Ekle'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}