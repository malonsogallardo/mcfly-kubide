require("dotenv").config();
const DBURL = process.env.DBURL;
const mongoose = require("mongoose");



// -------------------------
// Woking with DB connection
// -------------------------
const withDbConnection = async (fn, disconnectEnd = true) => {
  try {
      await mongoose.connect(DBURL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
      console.log(`Connection Ready on ${DBURL}`);
      await fn();
  } catch (error) {
      console.log("ERROR");
      console.log(error);
  } finally {
      // Disconnect from database
      if (disconnectEnd) {
          await mongoose.disconnect();
          console.log("disconnected");
      }
  }
};
// -------------------------
// Drop collection if already exists
// -------------------------
const dropIfExists = async Model => {
    try {
        await Model.collection.drop();
    } catch (e) {
        if (e instanceof MongoError) {
            console.log(
                `Cannot drop collection ${Model.collection.name}, because does not exist in DB`
            );
            return;
        }
    }
};

// -------------------------
// LoggedIn or not
// -------------------------
// const isLoggedIn = (redirectRoute = "http://localhost:3000/notes") => (req, res, next) => {
//     if (req.user) {
//         return next();
//     } else {
//         return res.status(401).json({ status: 'Content is private, please login' })
//     }
// };

// const isLoggedOut = (redirectRoute = "http://localhost:3000/") => (req, res, next) => {
//     if (!req.user) {
//         return next();
//     } else {
//         return res.status(401).json({ status: 'You are already logged in' })
//     }
// };

module.exports ={
    withDbConnection, 
    dropIfExists,
  //  isLoggedIn,
  //  isLoggedOut
}