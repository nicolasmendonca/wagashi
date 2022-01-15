import { jest } from "@jest/globals";
import { IAppServices } from "../src/apps/wagashi-rest-api/appServices";
import { RestApiServer } from "../src/apps/wagashi-rest-api/server";
import { servicesContainer } from "../src/apps/wagashi-rest-api/servicesContainer";

export async function startTestServer(services: Partial<IAppServices> = {}) {
  const server = new RestApiServer();
  servicesContainer.register("ProductsRepository", jest.fn());
  servicesContainer.register("CategoriesRepository", jest.fn());

  Object.entries(services).forEach(([serviceName, service]) => {
    servicesContainer.register(serviceName, service);
  });

  await server.app.ready();

  return server;
}
