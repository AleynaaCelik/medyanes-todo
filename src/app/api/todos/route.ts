import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Şimdilik hardcoded todo'lar döndür
    const todos = [
      {
        id: "1",
        title: "Test Todo",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    
    return NextResponse.json(todos)
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json({ error: 'Todolar yüklenemedi' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title } = await request.json()
    
    if (!title || title.trim() === '') {
      return NextResponse.json({ error: 'Title gerekli' }, { status: 400 })
    }

    // Başarılı response döndür
    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json({ 
      error: 'Todo oluşturulamadı',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}