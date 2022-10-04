import "dotenv/config";
import "reflect-metadata";
import { Server } from "http";
import { AddressInfo } from "net";
import { HELLO_ROUTE } from "./constants";
import { AppDataSource } from "./data-source"
import { Note } from "./entity/Note";
import { User } from "./entity/User";
import expressApp, { BASE_ROUTE } from "./server";
import bcrypt from "bcrypt";

export const server = AppDataSource.initialize()
.then(async dataSource => {
    // Only add sample data in development
    const Users = dataSource.getRepository(User);
    const Notes = dataSource.getRepository(Note);

    await Notes.delete({});
    await Users.delete({});
    const mainUser = await Users.save({
        age: 30,
        email: "tester@shair.co",
        passwordHash: await bcrypt.hash('secure-password-for-assessment', 10),
        firstName: "John",
        lastName: "Doe",
        token: null,
    });
    const secondaryUser = await Users.save({
        age: 65,
        email: "secondary@shair.co",
        passwordHash: await bcrypt.hash('secure-password-for-assessment', 10),
        firstName: "Jane",
        lastName: "Doe",
        token: null,
    });
    const users = [mainUser, secondaryUser];
    await Notes.insert({
        text: "Sample note for the hiring assignment",
        user: mainUser,
    });
    await Notes.insert({
        text: "Another sample note for the hiring assignment",
        user: mainUser,
    });
    await Notes.insert({
        text: "Lorum Ipsum Dolar Sit Amet",
        user: users[Math.floor(Math.random() * users.length)],
    });
    await Notes.insert({
        text: "Lorum Ipsum is the best placeholder text",
        user: users[Math.floor(Math.random() * users.length)],
    });
    await Notes.insert({
        text: `The best note\n\n<br /><iframe src="//google.com/#attacker" />`,
        user: users[Math.floor(Math.random() * users.length)],
    });
})
.then(()=>new Promise(resolve => {
    const server = expressApp.listen(3001, () => {
        resolve(server);
    });
}))
.then((server: Server) => {
    const addrInfo = server.address() as AddressInfo;
    console.log("Listening on port", addrInfo.port);
    console.log(`Try:\n\tcurl localhost:${addrInfo.port}${BASE_ROUTE}${HELLO_ROUTE}`);
    return server;
});
