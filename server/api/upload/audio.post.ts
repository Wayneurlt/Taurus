import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded'
      })
    }

    const file = formData[0]
    
    if (!file.data || !file.filename) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file data'
      })
    }

    // Validate file type
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/m4a', 'audio/ogg']
    if (!allowedTypes.includes(file.type || '')) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file type. Only MP3, WAV, M4A, OGG files are allowed'
      })
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        statusMessage: 'File size must be less than 50MB'
      })
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'audio')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = file.filename.split('.').pop()
    const uniqueFilename = `audio_${timestamp}.${fileExtension}`
    const filePath = join(uploadsDir, uniqueFilename)

    // Write file to disk
    await writeFile(filePath, file.data)

    // Return the absolute public URL
    const baseUrl = process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3001'
    const publicUrl = `${baseUrl}/uploads/audio/${uniqueFilename}`
    
    return {
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      originalName: file.filename,
      size: file.data.length,
      type: file.type
    }
  } catch (error) {
    console.error('Upload error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upload file'
    })
  }
})
