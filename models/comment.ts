import Model, { ModelData } from './model'

export interface CommentData extends ModelData {
  user?: {
    name?: string
    job?: string
    avatar?: string
  }
  message?: {
    id?: string
    en?: string
  }
}

export default class Comment extends Model {
  constructor() {
    super('Comments')
  }

  public static getInstance(): Comment {
    return Comment.instance || new Comment()
  }

  public async add(data: CommentData): Promise<void> {
    const avatar = await this.uploadImage(
      data.user?.avatar || '',
      `avatar/${data.user?.name || 'user'}.png`
    )

    return super.add({ ...data, user: { ...data.user, avatar } } as CommentData)
  }

  public get(id: string): Promise<CommentData | null> {
    return super.get(id)
  }

  public getAll(props?: {
    limit?: number | undefined
    page?: number | undefined
  }): Promise<CommentData[]> {
    return super.getAll(props)
  }
}
