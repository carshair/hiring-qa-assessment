import { Application } from "express";
import { createExpressServer } from "routing-controllers";
import Home from "./controllers/home";
/**
 * Start Server
 */
const expressApp: Application = createExpressServer({
  classTransformer: true,
  routePrefix: "/v3",
  defaultErrorHandler: false,
  middlewares: [
  ],
  controllers: [
    Home
  ],
});
export default expressApp;
export const server = expressApp.listen();