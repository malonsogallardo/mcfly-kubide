const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: {type: String, required:[true, "Password is required"]},
    text: [{ type : Schema.ObjectId, ref : "Note"}],
    fav: [{ type : Schema.ObjectId, ref : "Note"}]

  }
)

const User = mongoose.model("User",userSchema )

module.exports = User