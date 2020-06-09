const express = require("express")
const userRouter = express.Router()

passportRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/"
  })
);

passportRouter.post("/logout", ensureLogin.ensureLoggedIn(), (req, res) => {
  req.logout();
  res.redirect("/");
});


module.exports = userRouter