import { Application } from "express";
import { createExpressServer } from "routing-controllers";
import Home from "./controllers/home";
import { AddressInfo } from "node:net";
import { HELLO_ROUTE } from "../constants";

const BASE_ROUTE = "/v3"
/**
 * Start Server
 */
const expressApp: Application = createExpressServer({
  classTransformer: true,
  routePrefix: BASE_ROUTE,
  middlewares: [
  ],
  controllers: [
    Home
  ],
});
export default expressApp;
export const server = expressApp.listen();
const addrInfo = server.address() as AddressInfo;
console.log("Listening on port", addrInfo.port);
console.log(`Try:\n\tcurl localhost:${addrInfo.port}${BASE_ROUTE}${HELLO_ROUTE}`);