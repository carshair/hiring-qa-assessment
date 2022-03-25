import { BadRequestError, Body, JsonController, Post } from "routing-controllers";
import fetch from "node-fetch";
import { V1_API_DOMAIN } from "../../constants";

interface ProtectedResourceBody {
  operation: "SEND" | "REQUEST",
  count: number,
  text: string,
};

@JsonController("/protected")
export default class ProtectedController {
  /**
   * This route should be accessible only by authorized users
   *
   * @returns a protected resource.
   */
  @Post()
  async getProtected(@Body() body: ProtectedResourceBody) {
    if (body.text?.length > 4096) {
      throw new BadRequestError();
    }
    const response = await fetch(`${V1_API_DOMAIN}/v1/protected`, {
      body: JSON.stringify(body),
    });
    return response.json();
  }
}