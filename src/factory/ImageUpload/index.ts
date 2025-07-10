import { WordPressService } from '@/services/wp-json/WordPressService'
import { ImageUploadUseCase } from '@/UseCases/ImageUpload'

export default async function uploadImage() {
  const wordpressService = new WordPressService()
  const publisherUseCase = new ImageUploadUseCase(wordpressService)
  return publisherUseCase
}
