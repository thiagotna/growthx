import ValidationError from '@/domain/errors/ValidationErrors'
import { IPublisherService } from './IPublisherService'
import IRequest from './IRequest'

export class PublisherUseCase {
  constructor(private publisherService: IPublisherService) {}

  async execute({ title, slug, body, imageUrl }: IRequest) {
    try {
      const imageName = slug + '.jpg'
      const mediaId = await this.publisherService.uploadImage(
        imageUrl,
        imageName,
      )
      if (!mediaId) {
        throw new Error('Image upload failed, received no media ID.')
      }
      const createdPost = await this.publisherService.createPost({
        title,
        slug,
        content: body,
        featuredMediaId: mediaId,
      })
      const validatedPost = await this.publisherService.getPostBySlug(slug)

      if (!validatedPost) {
        throw new ValidationError(
          'Validation failed: Post not found after creation.',
        )
      }

      if (validatedPost.title.rendered !== title) {
        throw new ValidationError(
          `Validation failed: Title does not match. Expected "${title}", got "${validatedPost.title.rendered}".`,
        )
      }

      if (validatedPost.featured_media !== mediaId) {
        throw new ValidationError(
          `Validation failed: Header image is incorrect.`,
        )
      }

      const successInfo = {
        message: 'Post published successfully!',
        url: validatedPost.link,
        validation: {
          status: 'Success',
          checks: ['Post created', 'Title matches', 'Image linked correctly'],
        },
      }
      console.log('Publicação realizada com sucesso:', successInfo)
      return undefined
    } catch (error) {
      console.error('Erro em PublisherUseCase.execute:', error)
      throw error
    }
  }
}
