"use client"

import { useEffect } from 'react'
import { useTodoStore } from '../store/todoStore'

export default function TodoList() {
  const { todos, loading, fetchTodos } = useTodoStore()

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  if (loading) {
    return (
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Todo Listesi
        </h2>
        <p className="text-gray-500 text-center py-8">Yükleniyor...</p>
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Todo Listesi ({todos.length})
        </h2>
      </div>

      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            <span className="flex-1 text-gray-800">
              {todo.title}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(todo.createdAt).toLocaleDateString('tr-TR')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}