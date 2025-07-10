import ValidationError from '@/domain/errors/ValidationErrors'
import { IPublisherService } from '@/UseCases/Publisher/IPublisherService'

export class ImageUploadUseCase {
  constructor(private publisherService: IPublisherService) {}

  async execute(slug: string, imageUrl: string) {
    try {
      if (!slug || typeof slug !== 'string' || slug.trim() === '') {
        throw new ValidationError(
          'O campo "slug" é obrigatório e não pode ser vazio.',
        )
      }
      if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
        throw new ValidationError(
          'O campo "imageUrl" é obrigatório e não pode ser vazio.',
        )
      }
      const imageName = slug + '.jpg'
      const mediaId = await this.publisherService.uploadImage(
        imageUrl,
        imageName,
      )
      if (!mediaId) {
        throw new Error('Image upload failed, received no media ID.')
      }
      return mediaId
    } catch (error) {
      console.error('Erro em ImageUploadUseCase.execute:', error)
      if (error instanceof ValidationError) {
        throw error
      } else {
        throw new Error(
          `Erro ao fazer upload da imagem: ${error || 'Unknown error'}`,
        )
      }
    }
  }
}
