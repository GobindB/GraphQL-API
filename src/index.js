
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const models = require('./models');
require('dotenv').config();
const db = require('./db');

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

console.log(`DB host is ${DB_HOST}`);

let data = [
    { id: '1', content: [1, 3, 4, 5], location: 'Toronto' },
    { id: '2', content: [3, 5, 6, 7], location: 'Dubai' },
    { id: '3', content: [2, 5], location: 'Dublin' }
   ];

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
 type Query {
 hello: String!
 data: [Data!]!
 datum(id: ID!): Data!
 }
 
 type Data {
    id: ID!
    content: [Int!]!
    location: String!
}

type Mutation {
    newData(content: [Int!]!): Data!
   }
`;

// Provide resolver functions for our schema fields
const resolvers = {
    Query: {
    hello: () => 'Hello world!',
    data: async () => {
        return await models.Datum.find();
    },
    datum: (parent, args) => {
        let result = data.find(datum => datum.id === args.id);
        if (result)return result;
        else return NaN;
       }
    },
    Mutation: {
        newData: async (parent,args) => {
            return await models.Datum.create({
                content: args.content,
                location: "LA"
            });
        }
    }
};

const app = express();

// connect to database
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
 console.log(
 `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
 )
);