const mongoose = require("mongoose");
const bookschema = new mongoose.Schema({
    bookname: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    readonline: { type: String },
    price: { type: Number, required: true },
    tags: { type: String, required: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId }
});
module.exports = new mongoose.model("books", bookschema);
