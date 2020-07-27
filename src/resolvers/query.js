// Provide resolver functions for our schema fields
module.exports = {
    Query: {
    data: async (parent, args, { models }) => {
        return await models.Datum.find();
    },
    datum: async (parent, args, { models }) => {
        return await models.Datum.findById(args.id);
       }
    }
};