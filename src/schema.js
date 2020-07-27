const { gql } = require('apollo-server-express');

module.exports = gql`
 type Query {
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
    deleteData(id: ID!): Boolean!
    updateData(id: ID!, content: [Int!]! ): Data!
   }
`;
