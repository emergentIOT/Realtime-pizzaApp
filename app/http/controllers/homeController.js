const Menu = require('../../models/menu');

function homeController() {
    /*
     Factory functions
        - a function that return objects

     */

    return {
        // index : function () {

        // }

        async index(req, res) {
            //Get list of pizzas from mongodb

            //ANOTHER WAY OF GETTING RESULT
            const pizzas = await Menu.find();
            return res.render('home', { pizzas: pizzas });
            
            // ONE WAY OF GETTING RESULT
            // Menu.find().then((pizzas) => {
            //     res.render('home', { pizzas: pizzas });
            // })
            
        }
    }
}

module.exports = homeController;