export interface CrudRepository<T extends { id: any }> {
  find(id: T["id"]): Promise<T | null>;
  create(data: T): Promise<T>;
  update(id: T["id"], data: T): Promise<T>;
  delete(id: T["id"]): Promise<T>;
}
