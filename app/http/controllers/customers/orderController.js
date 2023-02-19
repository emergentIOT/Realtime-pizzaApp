const Order = require('../../../models/order');
//For time & date formatting
const moment = require('moment');

function orderController() {
    return {
        store(req, res) {
            const { phone, address } = req.body
            
            //Validate request
            if(!phone || !address) {
                req.flash('error', 'All feilds are required')
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })

            order.save().then((result) => {
                req.flash('success', 'Order places successfully')
                //Empty cart
                delete req.session.cart 
                res.redirect('/customer/orders')
                //res.redirect('/')
            }).catch((err) => {
                req.flash('error', `Error while placing order: ${err}`)
                return res.redirect('/cart')
            })
        }, 

        //Fetch orders of loggen in user from DB
        async index(req, res) {
            //Get orders baseed on customerId
            const orders = await Order.find({ customerId: req.user._id }, 
                null, 
                { sort: { 'createdAt': -1 }});
            res.render('customers/order', { orders: orders, moment: moment });
        }
    }
}

module.exports = orderController