// src/app.ts
import fastify from 'fastify'
import cors from '@fastify/cors'
import { contentGeneratorRoutes } from '@/http/controller/contentGenerator/routes'
import { publisherRoutes } from '@/http/controller/publisher/routes'
import { generateAndPublishRoutes } from '@/http/controller/generateAndPublish/routes'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(contentGeneratorRoutes)
app.register(publisherRoutes)
app.register(generateAndPublishRoutes)

export default app
