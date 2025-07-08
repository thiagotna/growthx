import { FastifyInstance } from 'fastify'
import { generateContent } from './generateContent'

export async function contentGeneratorRoutes(app: FastifyInstance) {
  app.post(
    '/generate-content',
    {
      schema: {
        tags: ['Content Generator'],
        summary: 'Generate content based on a topic',
        body: {
          type: 'object',
          required: ['topic'],
          properties: {
            topic: { type: 'string', description: 'Topic for content' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              slug: { type: 'string' },
              body: { type: 'string' },
            },
          },
        },
      },
    },
    generateContent,
  )
}
