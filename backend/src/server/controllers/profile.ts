import { CookieParams, Get, JsonController } from "routing-controllers";
import { PROFILE_ROUTE } from "../../constants";
import { AppDataSource } from "../../data-source";
import { Note } from "../../entity/Note";
import { User } from "../../entity/User";
import { login } from "../utils/login";
const Users = AppDataSource.getRepository(User);
const Notes = AppDataSource.getRepository(Note);

@JsonController()
export default class ProfileController {
  @Get(PROFILE_ROUTE)
  async profile(@CookieParams() cookies: Record<string, string>) {
    const token = cookies.token;
    await login(token);
    const user = await Users.findOne({
      where: {
        token,
      }
    });
    const notes = await Notes.find({
      where: {
        user,
      }
    });
    return {
      user,
      notes,
    }
  }
}