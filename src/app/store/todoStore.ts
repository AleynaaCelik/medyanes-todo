import { create } from 'zustand'
import { Todo } from '../types/todo'

interface TodoStore {
  todos: Todo[]
  loading: boolean
  addTodo: (title: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  setTodos: (todos: Todo[]) => void
  setLoading: (loading: boolean) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  loading: false,
  addTodo: (title: string) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now().toString(),
          title,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),
  toggleTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  deleteTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  setTodos: (todos: Todo[]) => set({ todos }),
  setLoading: (loading: boolean) => set({ loading }),
}))