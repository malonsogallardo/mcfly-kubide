const express = require("express")
const userRouter = express.Router()
const passport = require("passport")

//login de usuario
userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/"
  })
);

//logout de usuario
userRouter.post("/logout" ,(req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = userRouter
