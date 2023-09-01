import axios from 'axios'

const capitalizeText = (text: string): string => {
  return text.replace(/^\w/, (c) => c.toUpperCase())
}

export default class Notion {
  private baseURL: string
  private collectionId = 'ceb8d796-d904-4b02-ba49-6d4ac27a103a'
  constructor() {
    this.baseURL = 'https://www.notion.so/api/v3/queryCollection'
  }

  query(options: { startDate: string; endDate?: string }) {
    try {
      return axios
        .post(`${this.baseURL}`, {
          collectionView: {
            id: 'd68e2239-00d2-4c0d-af6c-4401ee9f698f',
            spaceId: '498b298f-ab45-4457-8f12-8ad9c7c82f4f',
          },
          source: {
            type: 'collection',
            id: this.collectionId,
            spaceId: '498b298f-ab45-4457-8f12-8ad9c7c82f4f',
          },
          loader: {
            type: 'reducer',
            reducers: {
              collection_group_results: { type: 'results', limit: 10000 },
            },
            filter: {
              operator: 'and',
              filters: [
                {
                  operator: 'or',
                  filters: [
                    {
                      property: 'u>ql',
                      filter: {
                        operator: 'date_is_on_or_after',
                        value: {
                          type: 'exact',
                          value: {
                            type: 'date',
                            start_date: options.startDate,
                          },
                        },
                        use_end: false,
                      },
                    },
                    {
                      property: 'u>ql',
                      filter: {
                        operator: 'date_is_on_or_after',
                        value: {
                          type: 'exact',
                          value: {
                            type: 'date',
                            start_date: options.startDate,
                          },
                        },
                        use_end: true,
                      },
                    },
                  ],
                },
                {
                  operator: 'or',
                  filters: [
                    {
                      property: 'u>ql',
                      filter: {
                        operator: 'date_is_on_or_before',
                        value: {
                          type: 'exact',
                          value: {
                            type: 'date',
                            start_date: options.endDate || options.startDate,
                          },
                        },
                      },
                    },
                    {
                      property: 'u>ql',
                      filter: {
                        operator: 'date_is_on_or_before',
                        value: {
                          type: 'exact',
                          value: {
                            type: 'date',
                            start_date: options.endDate || options.endDate,
                          },
                        },
                        use_end: true,
                      },
                    },
                  ],
                },
              ],
            },
            sort: [{ property: 'u>ql', direction: 'ascending' }],
            searchQuery: '',
            userId: '75416756-a534-4b17-a203-ec3443e3f8d3',
            userTimeZone: 'Asia/Jakarta',
          },
        })
        .then((onfullfilled) => {
          return this.extract(onfullfilled.data)
        })
        .catch((error) => [])
    } catch (error) {
      return []
    }
  }

  async extract({
    result: {
      reducerResults: {
        collection_group_results: { blockIds },
      },
    },
    recordMap,
  }: {
    result: {
      reducerResults: { collection_group_results: { blockIds: Array<string> } }
    }
    recordMap: {
      block?: {
        [blockId: string]: {
          value: {
            id: string
            properties: any
          }
        }
      }
      collection?: {
        [colectionId: string]: {
          value: {
            id: string
            schema: {
              [x: string]:
                | {
                    type: 'date' | 'text' | 'title'
                    name: string
                  }
                | {
                    type: 'relation'
                    name: string
                    property: string
                  }
            }
          }
        }
      }
    }
  }) {
    if (blockIds.length == 0) return []

    const data = [] as any[]

    const { schema } = recordMap.collection![this.collectionId].value

    for (let blockId of blockIds) {
      let { properties } = recordMap.block![blockId].value

      let property = await this.propertiesToData(properties, schema)
      data.push(property)
    }

    return data
  }

  async propertiesToData(properties: any, schema: any) {
    var parsedBlockData: {
      [x: string]: any
    } = {}

    for (let property of Object.keys(properties)) {
      let val = properties[property]
      let _schema = schema[property]

      if (!_schema) continue

      let value = val[0][0] as any

      if (_schema.type == 'date') {
        let date = val[0][1][0][1]
        value = {
          start: date.start_date,
          end: date.end_date,
        }
      }

      if (_schema.type == 'relation') {
        let relation = val[0][1][0]

        value = await this.page(relation[1])
      }

      if (typeof value === 'string') value = capitalizeText(value)

      parsedBlockData[_schema.name] = value
    }

    return parsedBlockData
  }

  private pages: { [x: string]: any } = {}

  async page(pageId: string) {
    if (this.pages[pageId] != null) return this.pages[pageId]

    let res = await axios.post('https://www.notion.so/api/v3/loadPageChunk', {
      pageId,
      limit: 50,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false,
    })

    const { properties } = res.data.recordMap.block[pageId].value
    this.pages[pageId] = properties.title[0][0]
    return properties.title[0][0]

    // return this.propertiesToData(properties, schema)
  }
}
