import { StatusCodes } from "http-status-codes";
import { Controller } from "../Controller";
import { servicesContainer } from "../../servicesContainer";
import { ProductsRepository } from "../../../../shared/domain/repositories/ProductsRepository";
import { createYupSchema } from "../../middleware/validation";

export class ProductsPutController implements Controller {
  private productsRepository: ProductsRepository =
    servicesContainer.get("ProductsRepository");

  handle: Controller["handle"] = async (request, reply) => {
    const { name, category_id } = request.body as ProductsPutRequestBody;
    const { id } = request.params as ProductsPutParams;

    const product = await this.productsRepository.create({
      id,
      name,
      categoryId: category_id,
    });

    reply.status(StatusCodes.CREATED).send(product);
  };

  public schema = createYupSchema((yup) => ({
    params: yup
      .object()
      .shape({
        id: yup.string().required(),
      })
      .required(),
    body: yup
      .object()
      .shape({
        name: yup.string().required(),
        category_id: yup.string().required(),
      })
      .required(),
  }));
}

interface ProductsPutRequestBody {
  name: string;
  category_id: string;
}

interface ProductsPutParams {
  id: string;
}
