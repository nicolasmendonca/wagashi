import { FastifyReply, FastifyRequest } from 'fastify';

export interface Controller {
  handle(request: FastifyRequest, reply: FastifyReply): any
  schema?: any
}
