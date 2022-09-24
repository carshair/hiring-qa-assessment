import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Note } from "./entity/Note";
import {config} from "dotenv";
config();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.TYPEORM_HOSTNAME,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User, Note],
    migrations: [],
    subscribers: [],
});
