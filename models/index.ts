import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

export interface Project {
  id: string
  title: string
  cover: string | null
  url: string
  description: string
}

enum coverType {
  file = 'file',
  external = 'externals',
}

export const toProjects = (params: any): Array<Project> => {
  return params.map(
    (param: {
      id: string
      cover: {
        type: coverType
        file?: { url: string }
        external?: { url: string }
      } | null
      properties: {
        Name: { title: { plain_text: string }[] }
        Url: { url: string }
        Description: { rich_text: { plain_text: string }[] }
      }
    }): Project => {
      return {
        id: param.id,
        cover: param.cover?.file?.url || param.cover?.external?.url || null,
        title: param.properties.Name.title[0].plain_text,
        url: param.properties.Url.url,
        description: param.properties.Description.rich_text[0].plain_text,
      }
    }
  )
}
