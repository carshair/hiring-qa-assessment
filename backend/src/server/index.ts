import "reflect-metadata";
import { Application } from "express";
import { createExpressServer } from "routing-controllers";
import Home from "./controllers/hello";
import Search from "./controllers/search";
import Login from "./controllers/login";
import Note from "./controllers/note";
import Profile from "./controllers/profile";
export const BASE_ROUTE = "/v3"

/**
 * Start Server
 */
const expressApp: Application = createExpressServer({
  classTransformer: true,
  validation: {
    forbidNonWhitelisted: true,
    whitelist: true,
  },
  cors: {
    credentials: true,
    origin: 'http://localhost:3000',
  },
  routePrefix: BASE_ROUTE,
  middlewares: [],
  controllers: [
    Home,
    Search,
    Login,
    Note,
    Profile,
  ],
});
export default expressApp;
