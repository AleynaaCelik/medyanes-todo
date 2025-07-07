import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params // ← Bu satırı değiştirdik
    const { completed } = await request.json()
    
    const updatedTodo = {
      id,
      completed,
      updatedAt: new Date()
    }
    
    return NextResponse.json(updatedTodo)
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json({ error: 'Todo güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params // ← Bu satırı değiştirdik
    return NextResponse.json({ message: 'Todo silindi', id })
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json({ error: 'Todo silinemedi' }, { status: 500 })
  }
}