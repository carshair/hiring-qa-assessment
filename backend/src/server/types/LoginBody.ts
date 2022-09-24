import { IsString } from "class-validator";

export default class LoginBody {
  @IsString()
  email: string;

  @IsString()
  password: string;
}