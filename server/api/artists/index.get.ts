import { getPrismaClient } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { limit = '50', offset = '0' } = query

    const prisma = getPrismaClient()

    // Fetch artists
    const artists = await prisma.artist.findMany({
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
      skip: parseInt(offset as string)
    })

    // Get total count for pagination
    const total = await prisma.artist.count()

    return {
      artists,
      total,
      limit: parseInt(limit as string),
      offset: parseInt(offset as string)
    }
  } catch (error) {
    console.error('Error fetching artists:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch artists'
    })
  }
})