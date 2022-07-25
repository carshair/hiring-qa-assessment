import { V1_API_DOMAIN } from "../constants";
import Server, { server } from "../server";
import * as supertest from "supertest";
import AuthController from "../server/controllers/auth";
import { LoginRequest } from "../server/controllers/auth";

export const testServer = supertest(Server);
export class LoginCred implements LoginRequest {
  username: string;
  password: string;
  constructor(username: string, password: string){
    this.username = username;
    this.password = password;
  }
  getUsername(): string{
    return this.username;
  }
  getPassword(): string{
    return this.password;
  }
}
describe("Login test", () => {
  let cred = new LoginCred('test', 'test');
  let response = null;
  it("Auth controller constructs", () => {
    expect(()=>new AuthController()).not.toThrow();
   })
  describe('given the username does not exist', () => {
    it('should return a 401', async () =>{
      response = await testServer.post(`${V1_API_DOMAIN}/v1/auth/login`) 
        .send({username: cred.getUsername(), password: cred.getPassword()})
        .set('Accept', 'application/json')
        expect(response.status).toEqual(401);
      })
    })
    describe('given the password is invalid', () => {
      it('should return a 401', async () =>{
        cred = new LoginCred('test1', 'test');
        response = await testServer.post(`${V1_API_DOMAIN}/v1/auth/login`) 
          .send({username: cred.getUsername(), password: cred.getPassword()})
          .set('Accept', 'application/json')
          expect(response.status).toEqual(401);
        })
      })
    describe('login successful', () => {
      it('login should be successful', async() =>{
        cred = new LoginCred('test1', 'test1');
        response = await testServer.post(`${V1_API_DOMAIN}/v1/auth/login`)
        .send({username: cred.getUsername(), password: cred.getPassword()})
           .set('Accept', 'application/json')
           expect(response.status).toEqual(200)
           expect(response.body.name).toEqual(cred.getUsername())
      })       
     })
   });

afterAll(() => {
  server.close();
})