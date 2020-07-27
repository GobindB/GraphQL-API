// todo write tests for Prod env

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

// local module imports
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const db = require('./db');

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

console.log(`DB host is ${DB_HOST}`);

const app = express();

// connect to database
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({
     typeDefs,
     resolvers,
     context: () => {
         return {models};
     }
 });

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
 console.log(
 `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
 )
);