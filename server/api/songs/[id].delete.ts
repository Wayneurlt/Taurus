import { getPrismaClient } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const songId = getRouterParam(event, 'id')

    if (!songId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Song ID is required'
      })
    }

    const prisma = getPrismaClient()

    // Check if song exists
    const existingSong = await prisma.song.findUnique({
      where: { id: parseInt(songId) }
    })

    if (!existingSong) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Song not found'
      })
    }

    // Delete song (this will also delete related playlist songs due to cascade)
    await prisma.song.delete({
      where: { id: parseInt(songId) }
    })

    return {
      success: true,
      message: 'Song deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting song:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete song'
    })
  }
})
