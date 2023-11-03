import { FastifyReply, FastifyRequest } from 'fastify'

const appOptions = {
  logger: true,
  bodyLimit: 209715200,
}

const serverOptions = {
  port: parseInt(process.env.API_PORT || '8080', 10),
  host: '0.0.0.0',
}

const swaggerOptions = {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Urban Sky Interview Inventory API',
      description: 'Urban Sky Interview Inventory API',
      version: '1.0.0',
    },
    host: `${serverOptions.host}:${serverOptions.port}`,
    basePath: '',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    /*
    tags: [{
      name: 'Urban Sky Inventory API',
      description: 'Urban Sky Inventory API',
    },],
    */
    definitions: {},
  },
  uiConfig: {
    docExpansion: 'list' as const, // expand/not all the documentations none|list|full
    deepLinking: true
  },
  uiHooks: {
    onRequest: (request: FastifyRequest, reply: FastifyReply, next: () => any) => {
      next()
    },
    preHandler: (request: FastifyRequest, reply: FastifyReply, next: () => any) => {
      next()
    }
  },
  staticCSP: false,
  transformStaticCSP: (header: any) => header,
  exposeRoute: true,
}

export default {
  appOptions,
  serverOptions,
  swaggerOptions,
}
