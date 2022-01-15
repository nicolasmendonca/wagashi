import fastify from "fastify";
import routes from "./routes";
import { validateApplicationServices } from "./appServices";
import { fastifyYupSchema } from "./middleware/validation";

export class RestApiServer {
  public app = fastify();
  private routes = routes;

  constructor(public address = "http://127.0.0.1", public port = 8080) {
    this.registerRoutes();
  }

  get baseUrl() {
    return `${this.address}:${this.port}`;
  }

  public registerRoutes(): void {
    this.app.register(fastifyYupSchema);

    this.routes.forEach((route) => {
      this.app.register(route);
    });
  }

  public start() {
    validateApplicationServices();
    this.registerRoutes();
    return this.app.listen(this.port);
  }

  public stop(callback: Function) {
    return this.app.close(() => callback());
  }
}
