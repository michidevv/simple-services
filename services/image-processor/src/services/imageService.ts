import sharp from 'sharp'
import { Duplex } from 'stream'

export type ResizeParams = {
  buffer: Buffer
  width: number
  height: number
}

export interface ImageService {
  resize(params: ResizeParams): Duplex
}

export class ImageServiceImpl implements ImageService {
  resize = (params: ResizeParams): Duplex => {
    const { buffer, width, height } = params

    return sharp(buffer).resize(width, height)
  }
}
