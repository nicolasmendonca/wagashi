import { FastifyInstance, RouteOptions } from "fastify";
import { ProductsGetController } from "../controllers/products/ProductsGetController";
import { ProductsPutController } from "../controllers/products/ProductsPutController";

async function productsRoute(fastify: FastifyInstance, options: RouteOptions) {
  const productsGetController = new ProductsGetController();
  const productsPutController = new ProductsPutController();

  fastify.get("/products", productsGetController.handle);
  fastify.put(
    "/products/:id",
    {
      schema: productsPutController.schema,
    },
    productsPutController.handle
  );
}

export default productsRoute;
