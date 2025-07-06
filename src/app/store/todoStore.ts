import { create } from 'zustand'

interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

interface TodoStore {
  todos: Todo[]
  loading: boolean
  addTodo: (title: string) => Promise<void>
  fetchTodos: () => Promise<void>
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,

  fetchTodos: async () => {
    console.log('🔍 fetchTodos called') // Debug
    try {
      const response = await fetch('/api/todos')
      if (response.ok) {
        const todos = await response.json()
        console.log('🔍 Fetched todos:', todos) // Debug
        set({ todos })
      }
    } catch (error) {
      console.error('Fetch error:', error)
    }
  },

  addTodo: async (title: string) => {
    console.log('🔍 addTodo called:', title) // Debug
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      
      if (response.ok) {
        console.log('🔍 Todo added, re-fetching...') // Debug
        // Basit çözüm: tüm todo'ları yeniden getir
        await get().fetchTodos()
      }
    } catch (error) {
      console.error('Add todo error:', error)
    }
  }
}))