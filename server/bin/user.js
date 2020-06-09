const User = require("../models/User")

const {withDbConnection, dropIfExists}  = require("../lib");

withDbConnection(async () => {
  await dropIfExists(User)
  await User.create(
    {
      username:"Pedrito",
      password:"1234"
    }, 
    {
      username:"Miguel",
      password:"1234"
    }, 

  )
})