const { model } = require("../models/data");

module.exports = {
        newData: async (parent, args, { models }) => {
            return await models.Datum.create({
                content: args.content,
                location: "LA"
            });
        },
        deleteData: async (parent, { id }, { models }) => {
            try{
                await models.Datum.findOneAndRemove({_id: id});
                return true;
            } catch (err){
                return false;
            }
        },
        updateData: async (parent, { content, id }, { models }) => {
            return await models.Datum.findOneAndUpdate(
                {
                    _id : id
                },
                {
                    $set: {
                        content
                    }
                },
                {
                    new : true
                }
            );
        }
}