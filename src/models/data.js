// Require the mongoose library
const mongoose = require('mongoose');

// Define the datas database schema
const dataSchema = mongoose.Schema(
    {
        content:{
            type: [Number],
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
    },
    {
            // Assigns createdAt and updatedAt fields with a Date type
            timestamps: true
    }
)

// Define the 'Note' model with the schema
const Datum = mongoose.model('Datum', dataSchema);

// Export the module
module.exports = Datum;