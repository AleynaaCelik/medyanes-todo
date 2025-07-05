"use client"

import { useState } from 'react'
import { useTodoStore } from '../store/todoStore'

export default function AddTodoForm() {
  const [title, setTitle] = useState('')
  const { addTodo, loading } = useTodoStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      await addTodo(title.trim())
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Yeni todo ekle..."
          disabled={loading}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Ekliyor...' : 'Ekle'}
        </button>
      </div>
    </form>
  )
}