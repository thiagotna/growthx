export interface IWpPost {
  id: number
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  featured_media: number
  link: string
}
