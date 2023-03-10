const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user');
const bcrypt = require('bcrypt');

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email'}, async (email, password, done) => {
        //Login business logic

        //Check email exist
        const user = await User.findOne({ email: email })
        if(!user) {
            return done(null, false, { message: `No user found with this email: ${email}`})
        }

        //User exist
        //Compare entereted password with db password
        // match withh reture true(if matched) || false(if not matched)
        bcrypt.compare(password, user.password).then((match) => {
            if(match) {
                return done(null, user, { message: 'Logged in successfully' })
            }

            //If passwords not match
            return done(null, false, { message: 'Wrong password' })
        }).catch((err) => {
            return done(null, false, { message: `Something went wrong: ${err}` })
        })

    }) )

    /**
     * If User login, we need to store id  or anything in session
     * through that id we can check if user is logged in or not
     */
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    /**
     * Its the opposite of serialize
     * Also provides the id or any other property saved during serialize()
     */
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}

module.exports = init