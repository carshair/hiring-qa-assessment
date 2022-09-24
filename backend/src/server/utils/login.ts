import { UnauthorizedError } from "routing-controllers";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export async function login(token: string) {
  if(!token) {
    throw new UnauthorizedError("You need to include a login token to access this page.");
  }
  const users = AppDataSource.getRepository(User);
  const user = await users.findOne({
    where: {
      token,
    }
  });
  if(!user) {
    throw new UnauthorizedError("Your login token must be valid to access this page.");
  }
  return user;
}