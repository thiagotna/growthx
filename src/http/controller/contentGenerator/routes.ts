import { FastifyInstance } from 'fastify'
import { generateContent } from './generateContent'

export async function contentGeneratorRoutes(app: FastifyInstance) {
  app.post('/generate-content', generateContent)
}
