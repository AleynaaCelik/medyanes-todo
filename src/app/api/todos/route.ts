import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // User'ı bul veya oluştur
    let user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || session.user.email
        }
      })
    }

    // Sadece bu user'ın todo'larını getir
    const todos = await prisma.todo.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })
    
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

    // User'ı bul veya oluştur
    let user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || session.user.email
        }
      })
    }

    // Todo'yu bu user'a ait olarak oluştur
    const todo = await prisma.todo.create({
      data: { 
        title: title.trim(),
        completed: false,
        userId: user.id
      }
    })
    
    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json({ 
      error: 'Todo oluşturulamadı',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}