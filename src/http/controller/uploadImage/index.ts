import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import uploadImage from '@/factory/ImageUpload'
import e from 'cors'

export async function uploadImageController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const uploadImageSchema = z.object({
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/, { message: 'Slug must be in kebab-case' }),
    imageUrl: z.string().url(),
  })

  try {
    const { slug, imageUrl } = uploadImageSchema.parse(request.body)
    const uploadImageFactory = await uploadImage()
    const imageId = await uploadImageFactory.execute(slug, imageUrl)

    return reply.status(201).send({ imageId })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: 'Invalid request body', issues: error.format() })
    }
    if (error instanceof Error) {
      return reply
        .status(500)
        .send({ message: 'Image Upload Failed', details: error.message })
    }
    throw error
  }
}

export default uploadImageController
