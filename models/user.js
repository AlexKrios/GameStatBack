const {Schema, model} = require("mongoose");

const userScheme = new Schema({
  username: String,
  password: String,
  age: Number,
  email: String
}, {
  versionKey: false
});

module.exports = model("User", userScheme);