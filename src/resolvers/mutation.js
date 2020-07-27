module.exports = {
    Mutation: {
        newData: async (parent,args, { models }) => {
            return await models.Datum.create({
                content: args.content,
                location: "LA"
            });
        }
    }
}