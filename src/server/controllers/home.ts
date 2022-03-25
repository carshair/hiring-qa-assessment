import { Get, JsonController } from "routing-controllers";
import { HELLO_RESPONSE } from "../../constants";
@JsonController()
export default class HomeController {
  @Get("/hello")
  home() {
    return HELLO_RESPONSE;
  }
}