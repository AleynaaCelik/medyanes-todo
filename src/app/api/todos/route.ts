import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth' // ← GEÇİCİ KAPALI
// import { authOptions } from '../../lib/auth' // ← GEÇİCİ KAPALI

export async function GET() {
  try {
    // GEÇİCİ: Session kontrolünü kapat
    // const session = await getServerSession(authOptions)
    // if (!session?.user?.email) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // Test todo'lar
    const todos = [
      {
        id: "1",
        title: "Test Todo 1",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "2",
        title: "Test Todo 2", 
        completed: true,
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
    // GEÇİCİ: Session kontrolünü kapat
    // const session = await getServerSession(authOptions)
    // if (!session?.user?.email) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { title } = await request.json()
    
    if (!title || title.trim() === '') {
      return NextResponse.json({ error: 'Title gerekli' }, { status: 400 })
    }

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