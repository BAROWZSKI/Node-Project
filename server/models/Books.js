const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title : {type : String, required : true},
    author : String,
    description : String,
    pageCount : Number,
    coverImage : String,
    uploadedBy : {type : mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    uploadedAt : {type : Date, default : Date.now }
});

module.exports = mongoose.model("Book", bookSchema);
