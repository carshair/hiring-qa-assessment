import { Get, JsonController } from "routing-controllers";
import { HELLO_RESPONSE, HELLO_ROUTE } from "../../constants";
@JsonController()
export default class HomeController {
  @Get(HELLO_ROUTE)
  home() {
    return HELLO_RESPONSE;
  }
}