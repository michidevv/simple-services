import express from 'express'
import multer from 'multer'
import { ImageController } from './controllers/imageController'
import { ImageServiceImpl } from './services/imageService'

const PORT = +(process.env.PORT || 3001)

const app = express()

const upload = multer()

app.disable('x-powered-by') // Don't leak framework name

app.listen(PORT, () => {
  console.info(`image-processor listening on ${PORT}`)
})

// TODO: Move to routes.
const imageService = new ImageServiceImpl()
const imageController = new ImageController(imageService)

app.post('/image/resize', upload.single('image'), imageController.resizeSingle)
