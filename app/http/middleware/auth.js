function auth(req, res, next){
    //getting because of passport package.
    if(req.isAuthenticated()) {
        return next()
    }

    return res.redirect('/login');
}

module.exports = auth