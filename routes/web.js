const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');

//MIDDLEWARE
const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');


function initRoutes(app) {

    app.get('/', homeController().index);
    app.get('/login', guest, authController().login);
    app.post('/login', authController().postLogin);
    app.post('/logout', authController().logout);
    app.get('/register', guest, authController().register);
    app.post('/register', authController().postRegister);

    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().updateCart);

    //Customer routes
    app.post('/orders', auth,  orderController().store);
    app.get('/customer/orders', auth, orderController().index);
}

module.exports = initRoutes;