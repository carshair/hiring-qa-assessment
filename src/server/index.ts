import "reflect-metadata";

import { Application } from "express";
import { createExpressServer } from "routing-controllers";
import Home from "./controllers/home";
import Auth from "./controllers/auth";
import Protect from "./controllers/protected";
/**
 * Start Server
 */
const expressApp: Application = createExpressServer({
  classTransformer: true,
  routePrefix: "/v1",
  defaultErrorHandler: false,
  middlewares: [
  ],
  controllers: [
    Home,
    Auth,
    Protect
  ],
});
export default expressApp;
export const server = expressApp.listen();