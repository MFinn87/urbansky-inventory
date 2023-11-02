import { join } from 'path'
import Fastify from 'fastify'
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import config from './config'

export type PluginOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>

const pluginOptions = {} as PluginOptions

const fastify = Fastify(config.appOptions).withTypeProvider<TypeBoxTypeProvider>()

// This loads all plugins defined in routes
fastify.register(AutoLoad, {
  dir: join(__dirname, 'plugins'),
  maxDepth: 1,
  options: pluginOptions,
})

// define your routes in one of these
fastify.register(AutoLoad, {
  dir: join(__dirname, 'routes'),
  options: pluginOptions,
})

fastify.ready((err) => {
  if (err) {
    throw(err)
  }
})

fastify.listen(config.serverOptions)

export default fastify
