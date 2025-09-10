import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { featured, search, limit = '50', offset = '0' } = query

    const where: any = {}
    
    if (featured === 'true') {
      where.isFeatured = true
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ]
    }

    const playlists = await prisma.playlist.findMany({
      where,
      include: {
        _count: {
          select: {
            songs: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
    })

    const total = await prisma.playlist.count({ where })

    return {
      playlists,
      total,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string)
    }
  } catch (error) {
    console.error('Error fetching playlists:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch playlists'
    })
  }
})
