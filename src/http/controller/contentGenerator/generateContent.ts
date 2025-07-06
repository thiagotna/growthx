import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import contentGeneratorFactory from '@/factory/ContentGenerator/contentGeneratorFactory'

export async function generateContent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const generateBodySchema = z.object({
    topic: z.string().min(3),
  })
  const { topic } = generateBodySchema.parse(request.body)
  try {
    const contentFactory = await contentGeneratorFactory()
    const postContent = await contentFactory.execute({ topic })

    return reply.status(200).send(postContent)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
