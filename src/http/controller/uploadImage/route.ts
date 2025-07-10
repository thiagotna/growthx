import { FastifyInstance } from 'fastify'
import { uploadImageController } from './index'

export async function uploadImageRoutes(app: FastifyInstance) {
  app.post(
    '/upload-image',
    {
      schema: {
        tags: ['Image Upload'],
        summary: 'Upload an image for a post',
        body: {
          type: 'object',
          required: ['slug', 'imageUrl'],
          properties: {
            slug: { type: 'string' },
            imageUrl: { type: 'string', format: 'uri' },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              imageId: { type: 'string' },
            },
          },
        },
      },
    },
    uploadImageController,
  )
}

export default uploadImageRoutes
