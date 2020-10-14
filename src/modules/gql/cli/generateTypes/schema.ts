import * as codegen from '@graphql-codegen/cli'
import path from 'path'
import { OUTPUT_PATH } from './constants'
// import { endpoint } from 'next/src/config'
import { endpoint } from 'src/next/src/config'

/** Функция генерирующая schema.json */
export const generateSchema = async () => {
  await codegen.generate(
    {
      schema: endpoint,
      generates: {
        [path.resolve(OUTPUT_PATH, 'schema.json')]: {
          plugins: [{ introspection: {} }],
        },
      },
    },
    true
  )
}
