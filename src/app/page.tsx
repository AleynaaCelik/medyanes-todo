import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'

export default function Home() {
  return (
    <main className="container mx-auto max-w-md p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        📝 Medyanes Todo App
      </h1>
      
      <AddTodoForm />
      <TodoList />
    </main>
  )
}