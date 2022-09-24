import { HELLO_RESPONSE } from "../constants";
import supertest from "supertest";
import HelloController from "../server/controllers/hello";
import { server } from "..";
import expressApp from "../server";
import SearchController from "../server/controllers/search";
import { AppDataSource } from "../data-source";

export const testServer = supertest(expressApp);

describe("Server", () => {
  it("Homepage controller constructs", () => {
    expect(()=>new HelloController()).not.toThrow();
  })
  it("Search controller constructs", () => {
    expect(()=>new SearchController()).not.toThrow();
  })
  it("Serves homepage", async () => {
    const response = await testServer.get("/v3/hello");
    expect(response.status).toBe(200);
    expect(response.text).toEqual(JSON.stringify(HELLO_RESPONSE));
  });
})

afterAll(async () => {
  (await server).close();
  await AppDataSource.driver.disconnect();
})