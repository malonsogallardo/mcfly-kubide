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
  req.logout();
  res.redirect("/");
});

module.exports = userRouter