const express = require("express")
const notesRouter = express.Router()

console.log("hola")

notesRouter.get("/create", (req, res) => {

  res.render('createNote');
})

notesRouter.post("/create", (req, res) => {
  
})

notesRouter.get("/favourites", (req, res) => {
  res.render('favourites');
})

notesRouter.post("/favourites", (req, res) => {

})

notesRouter.post("/favourites/:id", (req, res) => {

})

notesRouter.put("/favourites/delete/:id", (req, res) => {

})

notesRouter.get("/notes", (req, res) => {
  res.render('notes');
})


notesRouter.get("/notes/:id", (req, res) => {

})




module.exports = notesRouter