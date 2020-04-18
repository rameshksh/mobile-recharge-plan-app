import "reflect-metadata";
import { createConnection } from "typeorm";
import { PlanService } from "./services/PlanService";
import * as bodyParser from 'body-parser';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

// declare metadata by @controller annotation
import "./controllers/PlanController";
import TYPES from "./constants/types";

import windowsDriver = require('mssql/msnodesqlv8');
import { Plan } from "./entities/Plan";

createConnection({
    type: "mssql",
    host: '',
    username: '',
    password: '',
    database: 'MobilePlanDB',
    domain: '',
    schema: 'dbo',
    extra: {
        driver: windowsDriver,
        trustedConnection: false
    },
    entities: [
        Plan
    ],
    options: {
        useUTC: true,
    }
}).then(connection => {
    console.log('MobilePlanDB Connected....');
    buildServer();
}).catch(error => {
    console.log(error);
});

function buildServer() {

    // set up container
    let container = new Container();

    // set up bindings
    container.bind<PlanService>(TYPES.PlanService).to(PlanService);

    // create server
    let server = new InversifyExpressServer(container);

    server.setConfig((app) => {
        // add body parser
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.use(bodyParser.json());

        console.log("Mobile Plan API is up and running on port 3000...");
    }).build().listen(3000);
}
