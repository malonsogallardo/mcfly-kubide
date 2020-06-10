const express = require("express")
const userRouter = express.Router()

const passport = require("passport")

userRouter.post(
  "/login",
  passport.authenticate("local", {

    successRedirect: "/notes",
    failureRedirect: "/"
  })
);


userRouter.post("/logout" ,(req, res) => {
  console.log("eeeeeeee", req.user)
  req.logout();
  console.log("eeeeeedespuesee", req.user)
  res.redirect("/");
});



userRouter.get("/login", (req, res) => {
  res.json("SOY EL LOGIN")
})



userRouter.get("/logout", (req, res) => {
  res.json("SOY EL LOGOUT")
})
module.exports = userRouter