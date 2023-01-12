function initRoutes(app) {
    //Home page
    app.get("/", (req, res) => {
        //Render home page html.
        res.render('home');
    })

    //Cart page
    app.get("/cart", (req, res) => {
        res.render('customers/cart');
    })

    //Login page
    app.get("/login", (req, res) => {
        res.render('auth/login');
    })

    //Register page
    app.get("/register", (req, res) => {
        res.render('auth/register');
    })

}


module.exports = initRoutes;