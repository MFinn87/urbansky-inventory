import * as fs from 'fs/promises'
import * as path from 'path'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import config from '../../config'

const { swaggerOptions } = config

const loadPlugin = (fastify: FastifyInstance, options: any, done: any) => {
  // Applies Fastify route schemas to Swagger validation and generates Open API spec.
  fastify.register(swagger, swaggerOptions)

  if (process.env.NODE_ENV?.toLowerCase() !== 'prod') {
    // Auto-generates and serves documentation from Open API spec
    fastify.register(swaggerUi, swaggerOptions)
  }

  fastify.ready((err) => {
    if (!err) {
      const openApiSpec = fastify.swagger()
      const apiSpecFilePath = path.join(__dirname, '../../../output', './apiSpec.json')

      fs.writeFile(apiSpecFilePath, JSON.stringify(openApiSpec, null, 2))
    }
  })

  done()
}

export default fp(loadPlugin, {
  fastify: '4.x',
  name: 'swagger', // this is used by fastify-plugin to derive the property name
})
