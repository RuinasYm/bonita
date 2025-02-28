const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    link: { type: String },
    linkvip: { type: String },

})

const model = mongoose.model("linkgenerate", linkSchema);

module.exports = model;



