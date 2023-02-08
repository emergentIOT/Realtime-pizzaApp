const User = require('../../models/user');

function authController() {

    return {

        login(req, res) {
            res.render('auth/login');
        },
        
        register(req, res) {
            res.render('auth/register');
        }, 

        postRegister(req, res) {
            const { name, email, password } = req.body;
            //Validate Request, if fields are empty.
            if(!name || !email || !password) {
                //Using express-flash lib
                req.flash('error', 'All feilds are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register')
            }

            //if email exist in db, then redirect.
            User.exists({ email: email }, (err, result) => {
                if(result) {
                
                }
            })


        }
    }
}

module.exports = authController;