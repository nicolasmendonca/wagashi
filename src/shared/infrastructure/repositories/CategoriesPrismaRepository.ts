import { Category, PrismaClient } from "@prisma/client";
import { CategoriesRepository } from "../../domain/repositories/CategoriesRepository";

export class CategoriesPrismaRepository implements CategoriesRepository {
  constructor(private categoriesDb: PrismaClient["category"]) {}

  create(data: Category): Promise<Category> {
    return this.categoriesDb.create({
      data,
    });
  }

  update(id: string, data: Category): Promise<Category> {
    return this.categoriesDb.upsert({
      where: {
        id,
      },
      create: data,
      update: data,
    });
  }

  delete(id: string): Promise<Category> {
    return this.categoriesDb.delete({
      where: {
        id,
      },
    });
  }

  find(id: Category["id"]) {
    return this.categoriesDb.findUnique({
      where: {
        id,
      },
    });
  }
}
