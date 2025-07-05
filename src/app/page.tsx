"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) router.push("/auth/signin")
  }, [session, status, router])

  if (status === "loading") {
    return (
      <main className="container mx-auto max-w-md p-4">
        <div className="text-center py-8">Yükleniyor...</div>
      </main>
    )
  }

  if (!session) {
    return null
  }

  return (
    <main className="container mx-auto max-w-md p-4">
      {/* Header with user info and logout */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">📝 Medyanes Todo</h1>
          <p className="text-sm text-gray-600">Merhaba, {session.user?.name}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Çıkış
        </button>
      </div>
      
      <AddTodoForm />
      <TodoList />
    </main>
  )
}