import { HELLO_RESPONSE } from "../constants";
import Server, { server } from "../server";
import * as supertest from "supertest";
import HomeController from "../server/controllers/home";

export const testServer = supertest(Server);

describe("Server", () => {
  it("Homepage controller constructs", () => {
    expect(()=>new HomeController()).not.toThrow();
  })
  it("Serves homepage", async () => {
    const response = await testServer.get("/v3/hello");
    expect(response.status).toBe(200);
    expect(response.text).toEqual(JSON.stringify(HELLO_RESPONSE));
  });
})

afterAll(() => {
  server.close();
})