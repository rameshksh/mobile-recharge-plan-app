import "reflect-metadata";
import { createConnection } from "typeorm";
import { CustomerService } from "./services/CustomerService";
import * as bodyParser from 'body-parser';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

// declare metadata by @controller annotation
import "./controllers/CustomerController";
import TYPES from "./constants/types";
//const connectionString = "server=.;Database=CustomerDB;Trusted_Connection=Yes;Driver=msnodesqlv8";

import windowsDriver = require('mssql/msnodesqlv8');
import { Customer } from "./entities/Customer";
import { Transaction } from "./entities/Transaction";
import { TransactionService } from "./services/TransactionService";

createConnection({
    type: "mssql",
    host: 'RKUMAR11',
    username: 'ramesh.kumar',
    password: 'Welcome@33',
    database: 'CustomerDB',
    domain: 'corp.neudesic.net',
    schema: 'dbo',
    extra: {
        driver: windowsDriver,
        trustedConnection: false
    },
    entities: [
        Customer,
        Transaction
    ],
    options: {
        useUTC: true,
    }
}).then(connection => {
    console.log('CustomerDB Connected...');
    buildServer();
}).catch(error => {
    console.log(error);
});

function buildServer() {

    // set up container
    let container = new Container();

    // set up bindings
    container.bind<CustomerService>(TYPES.CustomerService).to(CustomerService);
    container.bind<TransactionService>(TYPES.TransactionService).to(TransactionService);

    // create server
    let server = new InversifyExpressServer(container);

    server.setConfig((app) => {
        // add body parser
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.use(bodyParser.json());

        console.log("Customer API is up and running on port 3001...");
    }).build().listen(3001);    
}
