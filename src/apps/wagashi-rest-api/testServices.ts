import { servicesContainer } from "./servicesContainer";
import { jest } from "@jest/globals";

export function registerTestServices() {
  servicesContainer.register("ProductsRepository", jest.fn());
  servicesContainer.register("CategoriesRepository", jest.fn());
}
