import { ImageService } from "../services/imageService"
import { Request, Response, NextFunction } from 'express'

const SIZE_THRESHOLD = 2000

const SUPPORTED_MIMETYPES: Record<string, boolean> = {
  'image/png': true,
  'image/webp': true,
  'image/jpeg': true,
  'image/tiff': true,
  'image/avif': true,
  'image/svg+xml': true,
  'image/gif': true,
}

export class ImageController {
  private imageService: ImageService

  constructor(imageService: ImageService) {
    this.imageService = imageService
  }

  resizeSingle = (req: Request, res: Response, _: NextFunction) => {
    const height = +(req.query.height || '')
    const width = +(req.query.width || '')
    if (!height || !width) {
      res.status(400).json({ error: 'No height or width query parameters provided' })
      return
    } else if (height > SIZE_THRESHOLD || width > SIZE_THRESHOLD) {
      res.status(400).json({ error: `Exceeded max allowed size threshold of ${SIZE_THRESHOLD}` })
      return
    }

    if (!req.file || !SUPPORTED_MIMETYPES[req.file.mimetype]) {
      res.status(400).json({ error: 'No valid image provided' })
      return
    }

    res.set('Content-Type', req.file.mimetype)

    const { buffer } = req.file
    this.imageService.resize({ width, height, buffer })
      .pipe(res)
      .on('error', e => {
        console.error('Failed to resize image', e)
        res.status(500)
      })
  }
}
