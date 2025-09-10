import { getPrismaClient } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { status, search, limit = '50', offset = '0' } = query

    const prisma = getPrismaClient()

    // Build where clause
    const where: any = {}
    
    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { artist: { name: { contains: search as string, mode: 'insensitive' } } }
      ]
    }

    // Fetch songs with relations
    const songs = await prisma.song.findMany({
      where,
      include: {
        artist: true,
        album: true
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
      skip: parseInt(offset as string)
    })

    // Get total count for pagination
    const total = await prisma.song.count({ where })

    return {
      songs,
      total,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string)
    }
  } catch (error) {
    console.error('Error fetching songs:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch songs'
    })
  }
})
