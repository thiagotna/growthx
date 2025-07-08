import { FastifyInstance } from 'fastify'
import { generateAndPublish } from './index'

export async function generateAndPublishRoutes(app: FastifyInstance) {
  app.post(
    '/generate-and-publish',
    {
      schema: {
        tags: ['Generate and Publish'],
        summary: 'Generate and publish a new post automatically',
        body: {
          type: 'object',
          required: ['topic', 'imageUrlPath'],
          properties: {
            topic: {
              type: 'string',
              description: 'Topic for content generation',
            },
            imageUrlPath: {
              type: 'string',
              format: 'uri',
            },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              post: { type: 'object' },
            },
          },
        },
      },
    },
    generateAndPublish,
  )
}
