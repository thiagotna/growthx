import { ContentGeneratorUseCase } from '@/UseCases/ContentGenerator'
import { GeminiService } from '@/services/ai/GeminiService'

export default async function contentGeneratorFactory() {
  const aiService = new GeminiService()
  const contentGeneratorService = new ContentGeneratorUseCase(aiService)
  return contentGeneratorService
}
