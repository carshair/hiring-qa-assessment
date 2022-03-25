import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";
import {
  ExpressMiddlewareInterface,
  Middleware,
  UnauthorizedError,
} from "routing-controllers";
import { V1_API_DOMAIN } from "../../constants";

/**
 * Check for Required Authentication headers
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @throws {UnauthorizedError}
 */
@Middleware({ type: "before" })
export class AuthMiddleware implements ExpressMiddlewareInterface {
  async use(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    const validated = await fetch(`${V1_API_DOMAIN}/v1/auth/validate`, {
      headers: authHeader,
    });
    if (validated.status === 401) {
      response.status(401);
      throw new UnauthorizedError("Authentication Required");
    }
    next();
  };
}

