const mongoose = require("mongoose");
const favbooks = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    favbookId: [{ type: mongoose.Schema.Types.ObjectId, ref: "books" }],
})
module.exports = new mongoose.model("favourite", favbooks);