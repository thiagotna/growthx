// src/app.ts
import fastify from 'fastify'
import cors from '@fastify/cors'
import { contentGeneratorRoutes } from '@/http/controller/contentGenerator/routes'

const app = fastify()

// Registra o plugin de CORS
app.register(cors, {
  origin: true, // Permite todas as origens, equivalente ao cors() do Express
})

// Registra o seu grupo de rotas
app.register(contentGeneratorRoutes)

export default app
