import request from "supertest";
import faker from "faker";
import { jest } from "@jest/globals";
import { startTestServer } from "./startTestServer";
import { ProductsRepository } from "../src/shared/domain/repositories/ProductsRepository";

test("Create a new product > happy path", async () => {
  // Arrange
  const createProduct = jest.fn().mockImplementation((args) => args);
  class ProductsTestRepository {
    create = createProduct;
  }
  const server = await startTestServer({
    ProductsRepository: ProductsTestRepository as unknown as ProductsRepository,
  });

  const id = faker.datatype.uuid();
  const name = faker.name.title();
  const categoryId = faker.datatype.uuid();

  // Act
  const response = await request(server.app.server)
    .put(`/products/${id}`)
    .send({ name, id, category_id: categoryId })
    .expect(201);

  // Assert
  expect(createProduct).toHaveBeenCalledWith({
    name,
    categoryId,
    id,
  });
  expect(response.body).toEqual({
    id,
    categoryId,
    name,
  });
});

test("Create a new product > validation error", async () => {
  const id = faker.datatype.uuid();
  // Arrange
  const createProduct = jest.fn().mockImplementation((args) => args);
  class ProductsTestRepository {
    create = createProduct;
  }
  const server = await startTestServer({
    ProductsRepository: ProductsTestRepository as unknown as ProductsRepository,
  });

  const response = await request(server.app.server)
    .put(`/products/${id}`)
    .send({ name: null, id: null, category_id: null })
    .expect(400);

  expect(createProduct).not.toHaveBeenCalled();
  expect(response.body).toEqual({
    error: "Bad Request",
    message: expect.stringContaining("category_id must be a `string`"),
    statusCode: 400,
  });
});
