const express = require("express")
const notesRouter = express.Router()


//MODELS
const Note = require("../models/Note")
const User = require("../models/User")


//Crea una nota si estas logueado
notesRouter.post("/create", async (req, res) => {
  try{
    const text = req.headers.text;
    const userId = req.user.id;
    const newNote = await Note.create({
      text:text
    })
    const userText = await User.findByIdAndUpdate(
      {_id : userId},
      { $addToSet : {text : newNote._id}},
      { new: true }
    ).populate({path:"text"});
    return res.json( "Note added")
  } catch (error) {
    return res.json("Error in create note")  
  }

})

//las favoritas del usuario logueado
notesRouter.get("/favourites", async(req, res) => {
  const userId = req.user.id;
  try {
    const userFav = await User.findById(userId).populate({path:"fav"})
    return res.json(userFav.fav.map(element => element))
  }catch (error){
    return res.json("favourites not found")
  }
})

//guarda una nota en favorito en el usuario logueado
notesRouter.put("/favourites/:id", async (req, res) => {
  try{
    const id = req.params.id;
    const userId = req.user.id;
    const userFav = await User.findByIdAndUpdate(
      {_id : userId},
      { $addToSet : {fav : id}},
      { new: true }
    ).populate({path:"fav"});
    return res.json("Favourite added")
  } catch (error){
    return res.json("Favourite not found")  
  }
})

//quitar un favorito del usuario
notesRouter.put("/favourites/delete/:id", async (req, res) => {
  try{
    const id = req.params.id;
    const userId = req.user.id;
    const userFav = await User.findByIdAndUpdate(
      {_id : userId},
      { $pull : {fav : id}},
      { new: true }
    )
    return res.json("Favourited deleted")
  } catch (error){
    return res.json("Favourite not found")  
  }
})

//todas las notas creadas
notesRouter.get("/notes", async (req, res) => {
  try {
    const notas = await Note.find();
    return res.json(notas)
  } catch (error){
    return res.json("Notes not found")  
  }
})

notesRouter.get("/notes/:id", async (req, res) => {
  const id = req.params.id
  try {
    const notas = await Note.findById(id);
    return res.json(notas)
  } catch (error){
    return res.json("Notes not found")  
  }
})

module.exports = notesRouter
