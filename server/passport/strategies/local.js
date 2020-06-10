const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            if (username === "" || password === "") {
                done(null, false);
            }
            const foundUser = await User.findOne({ username });
            if (foundUser) {
                done(null, foundUser)
                
            } else {
                done(null, false);
            }
        } catch (error) {
            done(error);
        }
    })
);