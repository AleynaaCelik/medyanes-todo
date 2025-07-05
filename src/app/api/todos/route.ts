import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
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
    const { title } = await request.json()
    
    if (!title || title.trim() === '') {
      return NextResponse.json({ error: 'Title gerekli' }, { status: 400 })
    }

    // Transaction olmadan direkt create
    const todo = await prisma.todo.create({
      data: { 
        title: title.trim(),
        completed: false
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