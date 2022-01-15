import { Product } from "@prisma/client";
import { CrudRepository } from "./CrudRepository";

export interface ProductsRepository extends CrudRepository<Product> {
  findMany(): Promise<Product[]>;
}
