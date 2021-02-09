import chai from 'chai'
import { Request, Response, NextFunction } from 'express'
import { ImageController } from '../src/controllers/imageController'
import { ImageService, ResizeParams } from '../src/services/imageService'
import 'mocha'

const expect = chai.expect

describe('ImageController', () => {
  const mockNextFunction = {} as NextFunction

  it('returns 400 if no QS params provided', async () => {
    const request = { query: {} } as Request
    const response = {
      json: (body?: any) => {
        expect(body.error).to.be.a('string')
        return body
      }
    } as Response
    response.status = (status) => {
      expect(status).to.eq(400)
      return response
    }
    const imageServiceMock = { resize: (_: ResizeParams) => {
      expect.fail('Should not call resize with invalid params')
    } } as ImageService

    const imageController = new ImageController(imageServiceMock)

    imageController.resizeSingle(request, response, mockNextFunction)
  })
})
