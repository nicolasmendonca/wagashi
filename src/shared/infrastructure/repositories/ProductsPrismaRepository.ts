import { PrismaClient, Product } from "@prisma/client";
import { ProductsRepository } from "../../domain/repositories/ProductsRepository";

export class ProductsPrismaRepository implements ProductsRepository {
  constructor(private productsDb: PrismaClient["product"]) {}

  public async findAll() {
    return this.productsDb.findMany();
  }

  public async create(data: Product) {
    return this.productsDb.upsert({
      create: data,
      update: data,
      where: {
        id: data.id,
      },
    });
  }

  delete(id: string): Promise<Product> {
    return this.productsDb.delete({
      where: {
        id,
      },
    });
  }

  find(id: string): Promise<Product | null> {
    return this.productsDb.findUnique({
      where: {
        id,
      },
    });
  }

  findMany(): Promise<Product[]> {
    return this.productsDb.findMany();
  }

  update(id: string, data: Product): Promise<Product> {
    return this.productsDb.update({
      where: {
        id,
      },
      data,
    });
  }
}
