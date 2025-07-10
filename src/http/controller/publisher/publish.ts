import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import publishPost from '@/factory/Publisher'
import uploadImage from '@/factory/ImageUpload'
import { marked } from 'marked'

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
    const htmlBody = await marked.parse(body)
    const uploadImageFactory = await uploadImage()
    const publishPostFactory = await publishPost()
    const imageId = await uploadImageFactory.execute(slug, imageUrl)
    const result = await publishPostFactory.execute({
      title,
      slug,
      body: htmlBody,
      mediaId: imageId,
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
