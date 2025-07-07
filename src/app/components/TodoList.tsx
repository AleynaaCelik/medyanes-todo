"use client"

import { useEffect } from 'react'
import { useTodoStore } from '../store/todoStore'

export default function TodoList() {
  const { todos, loading, fetchTodos, toggleTodo, deleteTodo } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  if (loading) {
    return (
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          Todo Listesi
        </h2>
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-100 rounded-xl p-4 h-16"></div>
          </div>
        ))}
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📝</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Henüz todo yok!</h3>
        <p className="text-gray-500">İlk görevini ekleyerek başla 🚀</p>
      </div>
    )
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="space-y-4">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">{totalCount}</span>
          </div>
          Todo Listesi
        </h2>
        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {completedCount}/{totalCount} tamamlandı
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(completedCount / totalCount) * 100}%` }}
        ></div>
      </div>

      {/* Todo Items */}
      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
              todo.completed 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm' 
                : 'bg-white border-gray-200 shadow-md hover:shadow-lg hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-4 p-4">
              {/* Custom Checkbox */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`relative w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                  todo.completed
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500'
                    : 'border-gray-300 hover:border-blue-500 bg-white'
                }`}
              >
                {todo.completed && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              
              {/* Todo Text */}
              <span
                className={`flex-1 transition-all duration-200 ${
                  todo.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-800 font-medium'
                }`}
              >
                {todo.title}
              </span>
              
              {/* Date */}
              <span className="text-xs text-gray-400 hidden sm:block">
                {new Date(todo.createdAt).toLocaleDateString('tr-TR')}
              </span>
              
              {/* Delete Button */}
              <button
                onClick={() => deleteTodo(todo.id)}
                disabled={loading}
                className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 112 0v2a1 1 0 11-2 0V9zm4 0a1 1 0 112 0v2a1 1 0 11-2 0V9z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Completed Badge */}
            {todo.completed && (
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Tamamlandı
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}