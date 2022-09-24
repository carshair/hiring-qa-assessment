import { IsNumber, IsOptional, IsString, Max } from "class-validator";

export default class SearchBody {
  @IsString()
  text: string;

  @Max(100)
  @IsOptional()
  size: number;

  @IsNumber()
  @IsOptional()
  skip: number;
}