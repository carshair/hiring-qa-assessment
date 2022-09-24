import { IsString } from "class-validator";

export default class SearchBody {
  @IsString()
  text: string;

  @IsString()
  userId: string;
}
