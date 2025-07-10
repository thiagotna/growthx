import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import contentGeneratorFactory from '@/factory/ContentGenerator/contentGeneratorFactory'
import publishPost from '@/factory/Publisher/'
import uploadImage from '@/factory/ImageUpload'
import { marked } from 'marked'

export async function generateAndPublish(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    topic: z.string().min(3),
    imageUrlPath: z.string().url(),
  })

  try {
    const { topic, imageUrlPath } = bodySchema.parse(request.body)
    const contentGenFactory = await contentGeneratorFactory()
    const uploadImageFactory = await uploadImage()
    const publishPostFactory = await publishPost()
    const content = await contentGenFactory.execute({ topic })
    const { title, slug, body } = content
    const htmlBody = await marked.parse(body)
    const imageId = await uploadImageFactory.execute(slug, imageUrlPath)
    const wpPost = await publishPostFactory.execute({
      title,
      slug,
      body: htmlBody,
      mediaId: imageId,
    })

    return reply.status(201).send({
      message: 'Post generated and published successfully',
      post: wpPost,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ message: 'Invalid request body', issues: error.format() })
    }
    if (error instanceof Error) {
      return reply.status(500).send({
        message: 'Full process failed',
        details: error.message,
        stack: error.stack,
      })
    }
    throw error
  }
}
