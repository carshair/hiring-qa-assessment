import { Body, JsonController, Post, Res } from "routing-controllers";
import { LOGIN_ROUTE } from "../../constants";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import LoginBody from "../types/LoginBody";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import { Response } from "express";

const users = AppDataSource.getRepository(User);

@JsonController(LOGIN_ROUTE)
export default class LoginController {
  @Post()
  async home(@Body() body: LoginBody, @Res() res: Response) {
    const [user] = await users.query(`SELECT * FROM user WHERE email='${body.email}' LIMIT 1`);
    let authenticated = false;
    let token = null;
    if(user) {
      authenticated = await bcrypt.compare(body.password, user.passwordHash);
    }
    if(authenticated) {
      token = randomUUID();
      user.token = token;
      await users.save(user);
    }
    res.cookie('token', token);
    return {
      authenticated,
      token,
    }
  }
}
