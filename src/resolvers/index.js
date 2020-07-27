// file will be used to import our resolver code into a single exported module

const Query = require('./query');
const Mutation = require('./mutation');

module.exports = {
 Query,
 Mutation
};