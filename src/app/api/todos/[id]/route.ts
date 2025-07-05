import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// GET /api/todos/[id] - Tek todo getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: params.id }
    })
    
    if (!todo) {
      return NextResponse.json({ error: 'Todo bulunamadı' }, { status: 404 })
    }
    
    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json({ error: 'Todo getirilemedi' }, { status: 500 })
  }
}

// PUT /api/todos/[id] - Todo güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, completed } = await request.json()
    
    const todo = await prisma.todo.update({
      where: { id: params.id },
      data: { 
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed })
      }
    })
    
    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json({ error: 'Todo güncellenemedi' }, { status: 500 })
  }
}

// DELETE /api/todos/[id] - Todo sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.todo.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ message: 'Todo silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Todo silinemedi' }, { status: 500 })
  }
}