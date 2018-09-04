import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import * as express from "express";
import * as bodyPaser from "body-parser";
import * as https from "https";
import {AppRoutes} from "./routes";
import * as fs from "fs";
import { Tool } from "./entity/Tool";

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "",
    password: "",
    database: "mydb",
    synchronize: true,
    logging: false,
    entities: [
        User,
        Tool
    ]}).then(async connection => {
        // create express app
        const app = express();
        app.use(bodyPaser.json());
        // register all routes
        AppRoutes.forEach(route => {
            app[route.method](route.path, (request: express.Request, response: express.Response, next: Function) => {
                route.action(request, response).then().catch();
            });
        });
        //https.createServer(options, app).listen(443);
        app.listen(3000);
        console.log("Server is up and running on port 3000");
    }).catch(error => console.log(error));
