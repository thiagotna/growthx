import { IGeneratedPost } from '@/services/ai/IGeneratedPost'

export interface IContentGeneratorService {
  generatePostContent(topic: string): Promise<IGeneratedPost>
}
