import { WordPressService } from '@/services/wp-json/WordPressService'
import { PublisherUseCase } from '@/UseCases/Publisher'

export default async function publishPost() {
  const wordpressService = new WordPressService()
  const publisherUseCase = new PublisherUseCase(wordpressService)
  return publisherUseCase
}
