const express = require("express")
const notesRouter = express.Router()

const Note = require("../models/Note")
const User = require("../models/User")

notesRouter.get("/create", (req, res) => {

  res.render('createNote');
})

notesRouter.post("/create", async (req, res) => {
try{
    const text = req.headers.text;
    //const id = req.params.id;
    //const userId = req.user.id;

    const userId = req.headers.user;
    console.log(text)
    const newNote = await Note.create({
      text:text
    })
    const userText = await User.findByIdAndUpdate(
      {_id : userId},
      { $addToSet : {text : newNote._id}},
      { new: true }
    ).populate({path:"text"});

    console.log(userText.text[0].text)
    return res.json({status: "Add text"})

    } catch (error) {
      return res.json("text not found")  
    }

})

notesRouter.get("/favourites", async(req, res) => {
  const userId = req.headers.user;

try {
const userFav = await User.findById(userId).populate({path:"fav"})

return res.json(userFav.fav.map(element => element))
}catch (error){
return res.json("favourites not found")
}

})

notesRouter.post("/favourites", (req, res) => {

})

notesRouter.put("/favourites/:id", async (req, res) => {
try{
  const id = req.params.id;
  //const userId = req.user.id;
  const userId = req.headers.user;
  const userFav = await User.findByIdAndUpdate(
    {_id : userId},
    { $addToSet : {fav : id}},
    { new: true }
  ).populate({path:"fav"});
  console.log(userFav.fav[0].text)
  return res.json({status: "Add Fav"})
} catch (error){
  
  return res.json("Notes not found")  
}
})


notesRouter.put("/favourites/delete/:id", async (req, res) => {
  try{
    const id = req.params.id;
    //const userId = req.user.id;
    const userId = req.headers.user;
    const userFav = await User.findByIdAndUpdate(
      {_id : userId},
      { $pull : {fav : id}},
      { new: true }
    )
    return res.json({status: "Delete Fav"})
  } catch (error){
    console.log(error)
    return res.json("Notes not found")  
  }
})

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