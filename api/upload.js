import { put } from '@vercel/blob'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { filename, contentType } = req.body

    if (!filename || !contentType) {
      return res.status(400).json({ message: 'Filename and contentType are required' })
    }

    // Vercel Blob'a dosya yükle
    const blob = await put(filename, req.body, {
      access: 'public',
      contentType: contentType
    })

    res.status(200).json({ url: blob.url })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ message: 'Upload failed: ' + error.message })
  }
}
