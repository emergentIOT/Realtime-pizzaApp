const Order = require('../../../models/order');

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
                // res.redirect('/customers/orders')
                res.redirect('/')
            }).catch((err) => {
                req.flash('error', `Error while placing order: ${err}`)
                return res.redirect('/cart')
            })
        }, 

        async index(req, res) {
            //Fetch orders of loggen in user from DB
            //Get orders baseed on customerId
            const orders = await Order.find({ customerId: req.user._id });
            res.render('customer/orders', orders);
        }
    }
}

module.exports = orderController