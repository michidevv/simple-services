import express from 'express'
import sharp from 'sharp'
import multer from 'multer'


const PORT = +(process.env.PORT || 3001)

const app = express()

const upload = multer()

app.disable('x-powered-by') // Don't leak framework name

app.listen(PORT, () => {
  console.info(`image-processor listening on ${PORT}`)
})

const SUPPORTED_MIMETYPES: Record<string, boolean> = {
  'image/png': true,
  'image/webp': true,
  'image/jpeg': true,
  'image/tiff': true,
  'image/avif': true,
  'image/svg+xml': true,
  'image/gif': true,
}

app.post('/image/resize', upload.single('image'), (req, res) => {
  const height = +(req.query.height || '')
  const width = +(req.query.width || '')
  if (!height || !width) {
    res.status(400).json({ error: 'No height or width query parameters provided' })
    return
  }

  if (!req.file || !SUPPORTED_MIMETYPES[req.file.mimetype]) {
    res.status(400).json({ error: 'No valid image provided' })
    return
  }

  res.set('Content-Type', req.file.mimetype)

  sharp(req.file.buffer)
    .resize(width, height)
    .on('error', e => {
      console.error('Failed to resize image', e)
      res.status(500)
    })
    .pipe(res)
})
