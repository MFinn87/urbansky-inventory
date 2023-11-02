import { FastifyInstance, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import cors from '@fastify/cors'

const handleCors = (fastify: FastifyInstance, options: any, done: any) => {
  const corsAllowedDomains = process.env.CORS_ALLOWED_DOMAINS?.split(',') || []

  fastify.register(cors, () => (request: FastifyRequest, callback: any) => callback(null, corsAllowedDomains))

  done()
}

export default fp(handleCors, {
  fastify: '4.x',
  name: 'cors',
})
