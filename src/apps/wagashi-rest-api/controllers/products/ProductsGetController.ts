import { StatusCodes } from "http-status-codes";
import { Controller } from "../Controller";
import { servicesContainer } from "../../servicesContainer";
import { ProductsRepository } from "../../../../shared/domain/repositories/ProductsRepository";

export class ProductsGetController implements Controller {
  private productsRepository: ProductsRepository;
  constructor() {
    this.productsRepository = servicesContainer.get("ProductsRepository");
  }

  handle: Controller["handle"] = async (request, reply) => {
    const products = await this.productsRepository.findMany();

    reply.status(StatusCodes.OK).send(products);
  };
}
