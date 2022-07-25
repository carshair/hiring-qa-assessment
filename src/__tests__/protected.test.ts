import { V1_API_DOMAIN } from "../constants";
import Server, { server } from "../server";
import * as supertest from "supertest";
//import AuthController from "../server/controllers/auth";
import ProtectedController from "../server/controllers/protected";
import { LoginCred } from "./auth.test";

export const testServer = supertest(Server);
   
 describe("Protected Resource", () => {
  let cred = new LoginCred('test1', 'test1');
  let response = null;
   it("Protected controller constructs", () => {
     expect(()=>new ProtectedController()).not.toThrow();
   })
   describe('invalid login cannot access protected resource', () => {
    it('should return a 401', async () =>{
      response = await testServer.post(`${V1_API_DOMAIN}/v1/auth/login`) 
        .send({username: cred.getUsername(), password: cred.getPassword()})
        .set('Accept', 'application/json')
        expect(response.status).toEqual(401)
       response = await testServer.post(`${V1_API_DOMAIN}/v1/protected`,)
          .send({ operation: "SEND", count: 0, text: ""})
          expect(response.status).toEqual(401)
        });
      })
      describe('authorized user is able to access protected resource', () =>{
        cred = new LoginCred('test', 'test');
        let text = null;
        it('protected resource is accessible', async () => {
         response = await testServer.post(`${V1_API_DOMAIN}/v1/auth/login`) 
        .send({username: cred.getUsername(), password: cred.getPassword()})
        .set('Accept', 'application/json')
        .set(text, response.token)
        expect(response.status).toEqual(200)
        response = await testServer.post(`${V1_API_DOMAIN}/v1/protected`,)
          .send({ operation: "SEND", count: 0, text: text})
          expect(response.status).toEqual(200)
        });
        })
    })

afterAll(() => {
  server.close();
})