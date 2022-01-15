import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

async function indexRoutes(fastify: FastifyInstance, options: RouteOptions) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: 'Hello World!' });
  })
}

export default indexRoutes
