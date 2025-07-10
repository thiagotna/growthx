import 'dotenv/config'
import fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { fastifyCors } from '@fastify/cors'
import { contentGeneratorRoutes } from '@/http/controller/contentGenerator/routes'
import { publisherRoutes } from '@/http/controller/publisher/routes'
import { generateAndPublishRoutes } from '@/http/controller/generateAndPublish/routes'

const app = fastify()

app.register(fastifyCors, { origin: '*' })

app.get('/', async () => {
  return { message: 'Welcome to GrowthX API: ' + process.env.WP_URL }
})

app.register(swagger, {
  swagger: {
    info: {
      title:
        'GrowthX API - Automated Content Generation and Publishing on WordPress',
      description: 'API Documentation',
      version: '1.0.0',
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
})

app.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
})

app.register(contentGeneratorRoutes)
app.register(publisherRoutes)
app.register(generateAndPublishRoutes)

export default app
