import { getPrismaClient } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const songId = getRouterParam(event, 'id')
    const body = await readBody(event)
    const { title, artistName, albumName, genre, duration, audioUrl, cover, status } = body

    if (!songId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Song ID is required'
      })
    }

    const prisma = getPrismaClient()

    // Check if song exists
    const existingSong = await prisma.song.findUnique({
      where: { id: parseInt(songId) },
      include: { artist: true, album: true }
    })

    if (!existingSong) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Song not found'
      })
    }

    // Find or create artist if changed
    let artist = existingSong.artist
    if (artistName && artistName !== existingSong.artist.name) {
      artist = await prisma.artist.findUnique({
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
    }

    // Find or create album if changed
    let album = existingSong.album
    if (albumName && albumName !== (existingSong.album?.title || '')) {
      if (albumName.trim() !== '') {
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
              genre: genre || null,
              releaseDate: new Date()
            }
          })
        }
      } else {
        album = null
      }
    }

    // Update song
    const updatedSong = await prisma.song.update({
      where: { id: parseInt(songId) },
      data: {
        title: title || existingSong.title,
        artistId: artist.id,
        albumId: album?.id || null,
        genre: genre || existingSong.genre,
        duration: duration || existingSong.duration,
        audioUrl: audioUrl || existingSong.audioUrl,
        cover: cover || existingSong.cover,
        status: status || existingSong.status
      },
      include: {
        artist: true,
        album: true
      }
    })

    return {
      success: true,
      song: updatedSong
    }
  } catch (error) {
    console.error('Error updating song:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update song'
    })
  }
})
