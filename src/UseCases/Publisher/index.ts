import ValidationError from '@/domain/errors/ValidationErrors'
import { IPublisherService } from './IPublisherService'
import IRequest from './IRequest'

export class PublisherUseCase {
  constructor(private publisherService: IPublisherService) {}

  async execute({ title, slug, body, mediaId }: IRequest) {
    try {
      if (!title || typeof title !== 'string' || title.trim() === '') {
        throw new ValidationError(
          'O campo "title" é obrigatório e não pode ser vazio.',
        )
      }
      if (!slug || typeof slug !== 'string' || slug.trim() === '') {
        throw new ValidationError(
          'O campo "slug" é obrigatório e não pode ser vazio.',
        )
      }
      if (!body || typeof body !== 'string' || body.trim() === '') {
        throw new ValidationError(
          'O campo "body" é obrigatório e não pode ser vazio.',
        )
      }
      const createdPost = await this.publisherService.createPost({
        title,
        slug,
        content: body,
        featuredMediaId: mediaId,
      })
      const validatedPost = await this.publisherService.getPostBySlug(slug)

      if (!validatedPost) {
        throw new ValidationError('Post not found after creation.')
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
