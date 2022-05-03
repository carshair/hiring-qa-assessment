import { Body, JsonController, Post } from "routing-controllers";
import fetch from "node-fetch";
import { V1_API_DOMAIN } from "../../constants";


export interface AuthorizedUser {
  id: number,
  name: string,
  // Token is required to access any protected endpoints
  token: string,
}
export interface LoginRequest {
  username: string,
  password: string,
}
@JsonController('/auth')
export default class AuthController {
  @Post("/login")
  async login(@Body() body: LoginRequest) {
    const response = await fetch(`${V1_API_DOMAIN}/v1/auth/login`, {
      body: JSON.stringify(body)
    });
    const responseData = await response.json() as AuthorizedUser;
    return {
      ...responseData,
      authorized: response.status === 200,
    };
  }
}