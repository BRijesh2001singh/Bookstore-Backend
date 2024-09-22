const mongoose = require("mongoose");
const blogsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    blog: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Blogs", blogsSchema);