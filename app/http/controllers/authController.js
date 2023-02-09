const User = require('../../models/user');
const bcrypt = require('bcrypt');

function authController() {

    return {

        login(req, res) {
            res.render('auth/login');
        },
        
        register(req, res) {
            res.render('auth/register');
        }, 

        async postRegister(req, res) {
            const { name, email, password } = req.body;
            //Validate Request, if fields are empty.
            if(!name || !email || !password) {
                //Using express-flash lib
                req.flash('error', 'All feilds are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register')
            }

            //If email exist in db, then redirect.
            User.exists({ email: email }, (err, result) => {
                if(result) {
                    req.flash('error', 'Email already exist')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register');
                }
            })

            //Hash Password
            const hashedPassword = await bcrypt.hash(password, 10);
            //Create a User
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })

            //Save user
            user.save().then((user) => {
                //User added here, perform necessary action. 

                //Login User here. 

                return res.redirect('/')
            }).catch((err) => {
                req.flash('error', `We got the error: ${err}`);
                return res.redirect('/register')
            })

        }
    }
}

module.exports = authController;