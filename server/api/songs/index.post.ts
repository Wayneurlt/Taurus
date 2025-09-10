import { getPrismaClient } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { title, artistName, albumName, genre, duration, audioUrl, cover, status = 'draft' } = body

    // Validate required fields
    if (!title || !artistName || !audioUrl) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title, artist name, and audio URL are required'
      })
    }

    const prisma = getPrismaClient()

    // Find or create artist
    let artist = await prisma.artist.findFirst({
      where: { name: artistName }
    })

    if (!artist) {
      artist = await prisma.artist.create({
        data: {
          name: artistName,
          bio: `Artist: ${artistName}`
        }
      })
    }

    // Find or create album if provided
    let album = null
    if (albumName && albumName.trim() !== '') {
      album = await prisma.album.findFirst({
        where: { 
          title: albumName,
          artistId: artist.id
        }
      })

      if (!album) {
        album = await prisma.album.create({
          data: {
            title: albumName,
            artistId: artist.id,
            genre: genre || null
          }
        })
      }
    }

    // Create the song
    const newSong = await prisma.song.create({
      data: {
        title,
        artistId: artist.id,
        albumId: album?.id || null,
        genre: genre || null,
        duration: duration || 180,
        audioUrl,
        cover: cover || null,
        status
      },
      include: {
        artist: true,
        album: true
      }
    })

    return {
      success: true,
      song: newSong
    }
  } catch (error) {
    console.error('Error creating song:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create song'
    })
  }
})
