import { create } from 'zustand'

interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: Date | string
  updatedAt: Date | string
}

interface TodoStore {
  todos: Todo[]
  loading: boolean
  error: string | null

  // Actions
  setTodos: (todos: Todo[]) => void
  addTodo: (todo: Todo) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // API calls
  fetchTodos: () => Promise<void>
  createTodo: (title: string) => Promise<void>
  updateTodo: (id: string, completed: boolean) => Promise<void>
  removeTodo: (id: string) => Promise<void>
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  // State setters
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id)
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // API calls
  fetchTodos: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/todos')
      if (response.ok) {
        const todos = await response.json()
        set({ todos, loading: false })
      } else {
        set({ error: 'Todolar yüklenemedi', loading: false })
      }
    } catch (_error) {
      set({ error: 'Network hatası', loading: false })
    }
  },

  createTodo: async (title: string) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })

      if (response.ok) {
        const newTodo = await response.json()
        set((state) => ({
          todos: [...state.todos, newTodo],
          loading: false
        }))
      } else {
        set({ error: 'Todo oluşturulamadı', loading: false })
      }
    } catch (_error) {
      set({ error: 'Network hatası', loading: false })
    }
  },

  updateTodo: async (id: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      })

      if (response.ok) {
        get().toggleTodo(id)
      }
    } catch (_error) {
      set({ error: 'Todo güncellenemedi' })
    }
  },

  removeTodo: async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        get().deleteTodo(id)
      }
    } catch (_error) {
      set({ error: 'Todo silinemedi' })
    }
  }
}))
