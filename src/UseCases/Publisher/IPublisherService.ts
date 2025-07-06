import { IWpPost } from '@/domain/entity/WpPost'

export interface IPublisherService {
  uploadImage(imageUrl: string, fileName: string): Promise<number>
  createPost(postData: {
    title: string
    slug: string
    content: string
    featuredMediaId: number
  }): Promise<IWpPost>
  getPostBySlug(slug: string): Promise<IWpPost | null>
}
