export namespace PostType {
  export interface GetPost {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
  }
  export interface CreatePost {
    title: string
    content: string
  }
} 