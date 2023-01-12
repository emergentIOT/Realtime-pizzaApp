function homeController() {
    /*
     Factory functions
        - a function that return objects

     */

    return {
        // index : function () {

        // }

        index(req, res) {
            res.render('home')
        }
    }
}

module.exports = homeController;