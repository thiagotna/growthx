import 'dotenv/config'
import fetch from 'node-fetch'
import FormData from 'form-data'
import { IWpPost } from '@/domain/entity/WpPost'

export class WordPressService {
  private readonly WP_URL = process.env.WP_URL
  private readonly WP_USER = process.env.WP_USERNAME
  private readonly WP_PASSWORD = process.env.WP_APP_PASS
  private readonly authHeader: string

  constructor() {
    if (!this.WP_URL || !this.WP_USER || !this.WP_PASSWORD) {
      throw new Error('WordPress credentials are not defined in .env file')
    }

    const buffer = Buffer.from(`${this.WP_USER}:${this.WP_PASSWORD}`)
    this.authHeader = `Basic ${buffer.toString('base64')}`
  }

  async uploadImage(imageUrl: string, fileName: string): Promise<number> {
    try {
      const imageResponse = await fetch(imageUrl)

      if (!imageResponse.ok || !imageResponse.body) {
        throw new Error(
          `Failed to download image from ${imageUrl}. Status: ${imageResponse.status}`,
        )
      }

      const form = new FormData()
      form.append('file', imageResponse.body, fileName)
      form.append('title', `Header for ${fileName}`)

      const response = await fetch(`${this.WP_URL}/wp-json/wp/v2/media`, {
        method: 'POST',
        headers: {
          Authorization: this.authHeader,
          ...form.getHeaders(),
        },
        body: form,
      })

      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(
          `Failed to upload image: ${response.statusText} - ${errorBody}`,
        )
      }

      const data: { id: number } = (await response.json()) as { id: number }

      console.log(data)

      return data.id
    } catch (error) {
      console.error('Erro em uploadImage:', error)
      throw error
    }
  }

  async createPost(postData: {
    title: string
    slug: string
    content: string
    featuredMediaId: number
  }): Promise<IWpPost> {
    try {
      const response = await fetch(`${this.WP_URL}/wp-json/wp/v2/posts`, {
        method: 'POST',
        headers: {
          Authorization: this.authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: postData.title,
          slug: postData.slug,
          content: postData.content,
          status: 'publish',
          featured_media: postData.featuredMediaId,
        }),
      })

      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(
          `Failed to create post: ${response.statusText} - ${errorBody}`,
        )
      }

      return (await response.json()) as IWpPost
    } catch (error) {
      console.error('Erro em createPost:', error)
      throw error
    }
  }

  async getPostBySlug(slug: string): Promise<IWpPost | null> {
    try {
      const response = await fetch(
        `${this.WP_URL}/wp-json/wp/v2/posts?slug=${slug}`,
        {
          headers: { Authorization: this.authHeader },
        },
      )
      const posts: IWpPost[] = (await response.json()) as IWpPost[]
      return posts.length > 0 ? posts[0] : null
    } catch (error) {
      console.error('Erro em getPostBySlug:', error)
      throw error
    }
  }
}
