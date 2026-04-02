import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { pageId, content, title } = await req.json();
    
    if (!pageId) {
      return NextResponse.json({ error: 'Missing pageId' }, { status: 400 });
    }

    const page = await prisma.page.upsert({
      where: { id: pageId },
      update: { 
        content: content || {},
        updatedAt: new Date(),
      },
      create: { 
        id: pageId,
        title: title || 'New Landing Page',
        slug: pageId,
        content: content || {},
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    return NextResponse.json(page);
  } catch (error: any) {
    console.error('Prisma Error:', error);
    return NextResponse.json({ error: 'Database connection failed. Please ensure DATABASE_URL is set correctly.' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get('pageId');
  
  if (!pageId) {
    return NextResponse.json({ error: 'Missing pageId' }, { status: 400 });
  }

  try {
    const page = await prisma.page.findUnique({
      where: { id: pageId },
    });
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    
    return NextResponse.json(page);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch page data.' }, { status: 500 });
  }
}
