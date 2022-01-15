import request from "supertest";
import faker from "faker";
import { jest } from "@jest/globals";
import { startTestServer } from "./startTestServer";
import { CategoriesRepository } from "../src/shared/domain/repositories/CategoriesRepository";

test("Create a new category > happy path", async () => {
  const createCategory = jest.fn().mockImplementation((args) => args);
  class CategoriesTestRepository {
    create = createCategory;
  }
  const server = await startTestServer({
    CategoriesRepository:
      CategoriesTestRepository as unknown as CategoriesRepository,
  });
  const id = faker.datatype.uuid();
  const name = faker.name.title();

  const response = await request(server.app.server)
    .put(`/categories/${id}`)
    .send({ name, id });

  expect(response.statusCode).toBe(201);
  expect(createCategory).toHaveBeenCalledWith({
    name,
    id,
  });
  expect(response.body).toEqual({
    id,
    name,
  });
});

test("Create a new category > validation error", async () => {
  // Arrange
  const createCategory = jest.fn().mockImplementation((args) => args);
  class CategoriesTestRepository {
    create = createCategory;
  }
  const server = await startTestServer({
    CategoriesRepository:
      CategoriesTestRepository as unknown as CategoriesRepository,
  });
  const id = faker.datatype.uuid();

  // Act
  const response = await request(server.app.server)
    .put(`/categories/${id}`)
    .send({ name: null, id: null });

  expect(response.statusCode).toBe(400);
  expect(createCategory).not.toHaveBeenCalled();
  expect(response.body).toEqual({
    error: "Bad Request",
    message: expect.stringContaining("name must be a `string`"),
    statusCode: 400,
  });
});
