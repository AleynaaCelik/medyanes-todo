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
    set({ loading: true })
    try {
      const response = await fetch('/api/todos')
      if (response.ok) {
        const todos = await response.json()
        set({ todos })
      }
    } catch (error) {
      console.error('Fetch error:', error)
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
        await get().fetchTodos()
      }
    } catch (error) {
      console.error('Add todo error:', error)
    }
  }
}))