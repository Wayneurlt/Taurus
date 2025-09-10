import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create artists
  const artists = await Promise.all([
    prisma.artist.create({
      data: {
        name: 'The Weeknd',
        bio: 'Canadian singer, songwriter, and record producer',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=face',
      },
    }),
    prisma.artist.create({
      data: {
        name: 'Billie Eilish',
        bio: 'American singer-songwriter',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      },
    }),
    prisma.artist.create({
      data: {
        name: 'Drake',
        bio: 'Canadian rapper, singer, and actor',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      },
    }),
    prisma.artist.create({
      data: {
        name: 'Ariana Grande',
        bio: 'American singer, songwriter, and actress',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      },
    }),
    prisma.artist.create({
      data: {
        name: 'Ed Sheeran',
        bio: 'English singer-songwriter',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      },
    }),
  ])

  console.log('✅ Created artists:', artists.length)

  // Create albums
  const albums = await Promise.all([
    prisma.album.create({
      data: {
        title: 'After Hours',
        artistId: artists[0].id,
        releaseDate: new Date('2020-03-20'),
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        genre: 'R&B',
      },
    }),
    prisma.album.create({
      data: {
        title: 'Happier Than Ever',
        artistId: artists[1].id,
        releaseDate: new Date('2021-07-30'),
        cover: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
        genre: 'Pop',
      },
    }),
    prisma.album.create({
      data: {
        title: 'Certified Lover Boy',
        artistId: artists[2].id,
        releaseDate: new Date('2021-09-03'),
        cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        genre: 'Hip-Hop',
      },
    }),
    prisma.album.create({
      data: {
        title: 'Positions',
        artistId: artists[3].id,
        releaseDate: new Date('2020-10-30'),
        cover: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        genre: 'Pop',
      },
    }),
    prisma.album.create({
      data: {
        title: 'Equals',
        artistId: artists[4].id,
        releaseDate: new Date('2021-10-29'),
        cover: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        genre: 'Pop',
      },
    }),
  ])

  console.log('✅ Created albums:', albums.length)

  // Create songs
  const songs = await Promise.all([
    prisma.song.create({
      data: {
        title: 'Blinding Lights',
        artistId: artists[0].id,
        albumId: albums[0].id,
        duration: 200,
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        genre: 'R&B',
        status: 'published',
        playCount: 2500000,
      },
    }),
    prisma.song.create({
      data: {
        title: 'Save Your Tears',
        artistId: artists[0].id,
        albumId: albums[0].id,
        duration: 215,
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        genre: 'R&B',
        status: 'published',
        playCount: 1800000,
      },
    }),
    prisma.song.create({
      data: {
        title: 'Happier Than Ever',
        artistId: artists[1].id,
        albumId: albums[1].id,
        duration: 298,
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        cover: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
        genre: 'Pop',
        status: 'published',
        playCount: 2200000,
      },
    }),
    prisma.song.create({
      data: {
        title: 'Therefore I Am',
        artistId: artists[1].id,
        albumId: albums[1].id,
        duration: 174,
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        cover: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
        genre: 'Pop',
        status: 'published',
        playCount: 1600000,
      },
    }),
    prisma.song.create({
      data: {
        title: 'Way 2 Sexy',
        artistId: artists[2].id,
        albumId: albums[2].id,
        duration: 268,
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        genre: 'Hip-Hop',
        status: 'published',
        playCount: 1900000,
      },
    }),
    prisma.song.create({
      data: {
        title: 'Positions',
        artistId: artists[3].id,
        albumId: albums[3].id,
        duration: 172,
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        cover: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        genre: 'Pop',
        status: 'published',
        playCount: 2100000,
      },
    }),
    prisma.song.create({
      data: {
        title: '34+35',
        artistId: artists[3].id,
        albumId: albums[3].id,
        duration: 174,
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        cover: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        genre: 'Pop',
        status: 'published',
        playCount: 1700000,
      },
    }),
    prisma.song.create({
      data: {
        title: 'Bad Habits',
        artistId: artists[4].id,
        albumId: albums[4].id,
        duration: 231,
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        cover: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        genre: 'Pop',
        status: 'published',
        playCount: 2400000,
      },
    }),
    prisma.song.create({
      data: {
        title: 'Shivers',
        artistId: artists[4].id,
        albumId: albums[4].id,
        duration: 207,
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        cover: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        genre: 'Pop',
        status: 'published',
        playCount: 2000000,
      },
    }),
    prisma.song.create({
      data: {
        title: 'In Your Eyes',
        artistId: artists[0].id,
        albumId: albums[0].id,
        duration: 237,
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        genre: 'R&B',
        status: 'published',
        playCount: 1500000,
      },
    }),
  ])

  console.log('✅ Created songs:', songs.length)

  // Create playlists
  const playlists = await Promise.all([
    prisma.playlist.create({
      data: {
        title: 'Trending Now',
        description: 'The hottest tracks right now',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        isPublic: true,
        isFeatured: true,
      },
    }),
    prisma.playlist.create({
      data: {
        title: 'Chill Vibes',
        description: 'Relaxing music for any time',
        cover: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
        isPublic: true,
        isFeatured: false,
      },
    }),
    prisma.playlist.create({
      data: {
        title: 'Workout Mix',
        description: 'High energy tracks to keep you moving',
        cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        isPublic: true,
        isFeatured: false,
      },
    }),
  ])

  console.log('✅ Created playlists:', playlists.length)

  // Add songs to playlists
  await Promise.all([
    prisma.playlistSong.createMany({
      data: [
        { playlistId: 1, songId: 1, order: 1 },
        { playlistId: 1, songId: 3, order: 2 },
        { playlistId: 1, songId: 5, order: 3 },
        { playlistId: 1, songId: 6, order: 4 },
        { playlistId: 1, songId: 8, order: 5 },
      ],
    }),
    prisma.playlistSong.createMany({
      data: [
        { playlistId: 2, songId: 2, order: 1 },
        { playlistId: 2, songId: 4, order: 2 },
        { playlistId: 2, songId: 7, order: 3 },
        { playlistId: 2, songId: 9, order: 4 },
        { playlistId: 2, songId: 10, order: 5 },
      ],
    }),
    prisma.playlistSong.createMany({
      data: [
        { playlistId: 3, songId: 1, order: 1 },
        { playlistId: 3, songId: 5, order: 2 },
        { playlistId: 3, songId: 8, order: 3 },
        { playlistId: 3, songId: 3, order: 4 },
      ],
    }),
  ])

  console.log('✅ Added songs to playlists')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
