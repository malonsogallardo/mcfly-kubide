const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: {type: String, required:[true, "Password is required"]},
    text: [{ type : Schema.ObjectId, ref : "Note"}],
    fav: [{ type : Schema.ObjectId, ref : "Note"}]

  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
)

const User = mongoose.model("User",userSchema )

module.exports = User
