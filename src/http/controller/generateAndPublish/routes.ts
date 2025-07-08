import { FastifyInstance } from 'fastify'
import { generateAndPublish } from './index'
export async function generateAndPublishRoutes(app: FastifyInstance) {
  app.post('/generate-and-publish', generateAndPublish)
}
