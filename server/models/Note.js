const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    
    //user:[{ type : Schema.ObjectId, ref : "User"}],
    text: String,

  }
)

const Note = mongoose.model("Note",noteSchema )

module.exports = Note