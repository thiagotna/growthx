import { FastifyInstance } from 'fastify'
import { publish } from './publish'

export async function publisherRoutes(app: FastifyInstance) {
  app.post(
    '/publish',
    {
      schema: {
        tags: ['Post Publisher'],
        summary: 'Publish a new post on WordPress',
        body: {
          type: 'object',
          required: ['title', 'slug', 'body', 'imageUrl'],
          properties: {
            title: { type: 'string' },
            slug: { type: 'string' },
            body: { type: 'string' },
            imageUrl: { type: 'string', format: 'uri' },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              url: { type: 'string' },
            },
          },
        },
      },
    },
    publish,
  )
}
