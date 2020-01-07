var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
