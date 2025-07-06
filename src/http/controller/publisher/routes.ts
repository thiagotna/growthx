import { FastifyInstance } from 'fastify'
import { publish } from './publish'

export async function publisherRoutes(app: FastifyInstance) {
  app.post('/publish', publish)
}
