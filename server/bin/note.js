const Note = require("../models/Note")

const {withDbConnection, dropIfExists}  = require("../lib");

withDbConnection(async () => {
  await dropIfExists(Note)
  await Note.create([
    {
      text: "Why so serious :)"
    },
    {
      text: "To infinity and beyond"
    }
  ])
})
