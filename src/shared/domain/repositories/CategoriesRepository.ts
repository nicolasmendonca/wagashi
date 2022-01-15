import { Category } from "@prisma/client";
import { CrudRepository } from "./CrudRepository";

export interface CategoriesRepository extends CrudRepository<Category> {}
