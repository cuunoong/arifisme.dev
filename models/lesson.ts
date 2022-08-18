import { FieldValue } from 'firebase/firestore'
import Model, { ModelData } from './model'

export type LessonTag =
  | 'flutter'
  | 'android'
  | 'ios'
  | 'tailwindcss'
  | 'nextjs'
  | 'react'
  | 'nodejs'
  | 'php'
  | 'figma'

export interface LessonData extends ModelData {
  title?: string | FieldValue
  sortDescription?: string | FieldValue
  image?: string | FieldValue
  tags?: LessonTag[] | FieldValue[]
  totalCloned?: number | FieldValue
  githubURL?: string | FieldValue
}

export default class Lesson extends Model {
  constructor() {
    super('Lessons')
  }

  public static getInstance(): Lesson {
    return Lesson.instance || new Lesson()
  }

  public async add(data: LessonData): Promise<void> {
    if (data.image) {
      const image = await this.uploadImage(
        (data.image as string) || '',
        `lessons/${data.id || 'lesson'}.png`
      )
      return super.add({ ...data, image } as LessonData)
    }
    return super.add(data)
  }

  public get(id: string): Promise<LessonData | null> {
    return super.get(id)
  }

  public getAll(props?: {
    limit?: number | undefined
    page?: number | undefined
  }): Promise<LessonData[]> {
    return super.getAll(props)
  }

  public update(data: LessonData): Promise<void> {
    return super.update(data)
  }
}
