import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import publishPost from '@/factory/Publisher'

export async function publish(request: FastifyRequest, reply: FastifyReply) {
  const publishBodySchema = z.object({
    title: z.string(),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/, { message: 'Slug must be in kebab-case' }),
    body: z.string().min(50),
    imageUrl: z.string().url(),
  })

  try {
    const { title, slug, body, imageUrl } = publishBodySchema.parse(
      request.body,
    )

    console.log(request.body)

    const publishPostFactory = await publishPost()

    const result = await publishPostFactory.execute({
      title,
      slug,
      body,
      imageUrl,
    })

    return reply.status(201).send(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: 'Invalid request body', issues: error.format() })
    }
    if (error instanceof Error) {
      return reply
        .status(500)
        .send({ message: 'Publication Failed', details: error.message })
    }
    throw error
  }
}
