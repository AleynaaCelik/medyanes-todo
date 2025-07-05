"use client"

import { useEffect } from 'react'
import { useTodoStore } from '../store/todoStore'

export default function TodoList() {
  const { todos, loading, fetchTodos, toggleTodo, deleteTodo } = useTodoStore()

  // Sayfa yüklendiğinde todo'ları getir
  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  if (loading) {
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-semibold mb-4">Todo Listesi</h2>
        <p className="text-gray-500 text-center py-8">Yükleniyor...</p>
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-semibold mb-4">Todo Listesi</h2>
        <p className="text-gray-500 text-center py-8">Henüz todo yok...</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4">Todo Listesi ({todos.length})</h2>
      
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`flex items-center gap-3 p-3 border rounded-lg transition-colors ${
            todo.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
          }`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          
          <span
            className={`flex-1 ${
              todo.completed
                ? 'line-through text-gray-500'
                : 'text-gray-900'
            }`}
          >
            {todo.title}
          </span>
          
          <button
            onClick={() => deleteTodo(todo.id)}
            className="px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
            disabled={loading}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  )
}