import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const getDatabase = async (
  databaseId: string,
  sorts?: (
    | {
        property: string
        direction: 'ascending' | 'descending'
      }
    | {
        timestamp: 'created_time' | 'last_edited_time'
        direction: 'ascending' | 'descending'
      }
  )[]
) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts,
  })
  return response.results
}

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export const getBlocks = async (blockId: string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  })
  return response.results
}
