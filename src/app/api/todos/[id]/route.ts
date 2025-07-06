import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const todo = await prisma.todo.findFirst({
      where: { 
        id: params.id,
        userId: user.id
      }
    })
    
    if (!todo) {
      return NextResponse.json({ error: 'Todo bulunamadı' }, { status: 404 })
    }
    
    return NextResponse.json(todo)
  } catch {  // error parametresini kaldırdık
    return NextResponse.json({ error: 'Todo getirilemedi' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { title, completed } = await request.json()
    
    const todo = await prisma.todo.updateMany({
      where: { 
        id: params.id,
        userId: user.id
      },
      data: { 
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed })
      }
    })

    if (todo.count === 0) {
      return NextResponse.json({ error: 'Todo bulunamadı' }, { status: 404 })
    }

    const updatedTodo = await prisma.todo.findFirst({
      where: { id: params.id, userId: user.id }
    })
    
    return NextResponse.json(updatedTodo)
  } catch {  // error parametresini kaldırdık
    return NextResponse.json({ error: 'Todo güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const result = await prisma.todo.deleteMany({
      where: { 
        id: params.id,
        userId: user.id
      }
    })

    if (result.count === 0) {
      return NextResponse.json({ error: 'Todo bulunamadı' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Todo silindi' })
  } catch {  // error parametresini kaldırdık
    return NextResponse.json({ error: 'Todo silinemedi' }, { status: 500 })
  }
}