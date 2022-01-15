import { FastifyInstance, RouteOptions } from "fastify";
import { CategoriesPutController } from "../controllers/categories/CategoriesPutController";

async function categoriesRoute(
  fastify: FastifyInstance,
  options: RouteOptions
) {
  const categoriesPutController = new CategoriesPutController();

  fastify.put(
    "/categories/:id",
    {
      schema: categoriesPutController.schema,
    },
    categoriesPutController.handle
  );
}

export default categoriesRoute;
