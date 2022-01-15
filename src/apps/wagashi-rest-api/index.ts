import { registerApplicationServices } from "./appServices";
import { RestApiServer } from "./server";

registerApplicationServices();
const server = new RestApiServer(8080, "http://127.0.0.1");

server.start();
