import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { createSwaggerSpec } from 'next-swagger-doc'
import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic<{ spec: any }>(import('swagger-ui-react'), {
  ssr: false,
})

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <html className="swagger">
      <body>
        <SwaggerUI spec={spec} />
      </body>
    </html>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Api Documentation',
        version: '1.0',
        contact: {
          email: 'arif.iskandar@forezyy.id',
          name: 'Arif Iskandar',
        },
        description:
          'Welcome to version 1 of Arif Iskandar API. Below you will find list of the available resources in our API. If you need help or found any bug, please head over to our  and open an issue.',
      },
      tags: [
        { name: 'Authentication', description: 'Authentication methods api' },
        { name: 'Account', description: 'Operations about user' },
      ],
      components: {
        securitySchemes: {
          BearerAuth: { type: 'http', scheme: 'bearer' },
        },
      },
    },
  })

  return {
    props: {
      spec,
    },
  }
}

export default ApiDoc
