const {Schema, model} = require("mongoose");

const userScheme = new Schema({
    id: Number,
    key: Number,
    name: String,
    password: String,
    age: Number,
    email: String
});

module.exports = model("User", userScheme);