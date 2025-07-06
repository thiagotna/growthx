import { IContentGeneratorService } from './IContentGeneratorService'
import IRequest from './IRequest'

export class ContentGeneratorUseCase {
  constructor(private contentGeneratorService: IContentGeneratorService) {}

  async execute({ topic }: IRequest) {
    if (!topic) {
      throw new Error('Topic is required.')
    }

    const postContent =
      await this.contentGeneratorService.generatePostContent(topic)

    return postContent
  }
}
