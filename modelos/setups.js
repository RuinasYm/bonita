const mongoose = require('mongoose');

const setupSchema = new mongoose.Schema({
    guildID: { type: String },
    verifykey: { type: [String], default: [] },

})

const model = mongoose.model("setupconfig", setupSchema);

module.exports = model;



