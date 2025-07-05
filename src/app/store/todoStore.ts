import { create } from 'zustand'
import { Todo } from '../types/todo'

interface TodoStore {
  todos: Todo[]
  loading: boolean
  
  // API ile çalışan metodlar
  fetchTodos: () => Promise<void>
  addTodo: (title: string) => Promise<void>
  toggleTodo: (id: string) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
  setLoading: (loading: boolean) => void
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,

  setLoading: (loading: boolean) => set({ loading }),

  fetchTodos: async () => {
    set({ loading: true })
    try {
      const response = await fetch('/api/todos')
      const todos = await response.json()
      set({ todos })
    } catch (error) {
      console.error('Todolar yüklenemedi:', error)
    } finally {
      set({ loading: false })
    }
  },

  addTodo: async (title: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      
      if (response.ok) {
        // Todoları yeniden yükle
        await get().fetchTodos()
      }
    } catch (error) {
      console.error('Todo eklenemedi:', error)
    }
  },

  toggleTodo: async (id: string) => {
    const todo = get().todos.find(t => t.id === id)
    if (!todo) return

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
      })
      
      if (response.ok) {
        await get().fetchTodos()
      }
    } catch (error) {
      console.error('Todo güncellenemedi:', error)
    }
  },

  deleteTodo: async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await get().fetchTodos()
      }
    } catch (error) {
      console.error('Todo silinemedi:', error)
    }
  }
}))