import { create } from 'zustand'

interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

interface TodoStore {
  todos: Todo[]
  loading: boolean
  
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
      if (response.ok) {
        const todos = await response.json()
        set({ todos })
      } else {
        console.error('Fetch error:', response.status)
      }
    } catch (error) {
      console.error('Fetch todos error:', error)
    } finally {
      set({ loading: false })
    }
  },

  addTodo: async (title: string) => {
    console.log('Store addTodo called with:', title) // Debug
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      
      console.log('Response status:', response.status) // Debug
      
      if (response.ok) {
        const newTodo = await response.json()
        console.log('New todo received:', newTodo) // Debug
        
        set((state) => {
          const updatedTodos = [newTodo, ...state.todos]
          console.log('Updated todos:', updatedTodos) // Debug
          return { todos: updatedTodos }
        })
      } else {
        console.error('Add todo error:', response.status)
      }
    } catch (error) {
      console.error('Add todo error:', error)
    }
  },

  toggleTodo: async (id: string) => {
    // Şimdilik local state'te toggle et
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }))
  },

  deleteTodo: async (id: string) => {
    // Şimdilik local state'ten sil
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id)
    }))
  }
}))