"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("./graphql");
const app = express_1.default();
const PORT = 9000;
const server = new apollo_server_express_1.ApolloServer({ schema: graphql_1.schema });
server.applyMiddleware({ app, path: '/api' });
app.listen(PORT);
console.log(`[app]: http://localhost:${PORT}`);
