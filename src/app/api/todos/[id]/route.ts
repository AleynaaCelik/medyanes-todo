import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { completed } = await request.json()
    
    // Test response
    const updatedTodo = {
      id: params.id,
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
  { params }: { params: { id: string } }
) {
  try {
    return NextResponse.json({ message: 'Todo silindi', id: params.id })
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json({ error: 'Todo silinemedi' }, { status: 500 })
  }
}