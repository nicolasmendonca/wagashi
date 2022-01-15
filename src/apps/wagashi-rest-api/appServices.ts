import Prisma from "@prisma/client";
import { CategoriesRepository } from "../../shared/domain/repositories/CategoriesRepository";
import { ProductsRepository } from "../../shared/domain/repositories/ProductsRepository";
import { CategoriesPrismaRepository } from "../../shared/infrastructure/repositories/CategoriesPrismaRepository";
import { ProductsPrismaRepository } from "../../shared/infrastructure/repositories/ProductsPrismaRepository";
import { servicesContainer } from "./servicesContainer";

export const registerApplicationServices = () => {
  const client = new Prisma.PrismaClient();
  servicesContainer
    .register("ProductsRepository", ProductsPrismaRepository)
    .addArgument(client.product);
  servicesContainer
    .register("CategoriesRepository", CategoriesPrismaRepository)
    .addArgument(client.category);
};

export const validateApplicationServices = () => {
  ["ProductsRepository", "CategoriesRepository"].forEach((service) => {
    if (!servicesContainer.hasDefinition(service)) {
      throw new Error(`${service} is not defined`);
    }
  });
};

export interface IAppServices {
  ProductsRepository: ProductsRepository;
  CategoriesRepository: CategoriesRepository;
}
