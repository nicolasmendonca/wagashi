import { StatusCodes } from "http-status-codes";
import { Controller } from "../Controller";
import { servicesContainer } from "../../servicesContainer";
import { CategoriesRepository } from "../../../../shared/domain/repositories/CategoriesRepository";
import { createYupSchema } from "../../middleware/validation";

export class CategoriesPutController implements Controller {
  private categoriesRepository: CategoriesRepository = servicesContainer.get(
    "CategoriesRepository"
  );

  handle: Controller["handle"] = async (request, reply) => {
    const { name } = request.body as CategoriesPutRequestBody;
    const { id } = request.params as CategoriesPutParams;

    const category = await this.categoriesRepository.create({
      id,
      name,
    });

    reply.status(StatusCodes.CREATED).send(category);
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
      })
      .required(),
  }));
}

interface CategoriesPutRequestBody {
  name: string;
}

interface CategoriesPutParams {
  id: string;
}
