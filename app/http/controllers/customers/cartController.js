function cartController() {

    return {
        //This function will render the cart page.
        index(req, res) {
            res.render('customers/cart');
        }, 
        //This function will call, every time user click add button of pizza item. 
        updateCart(req, res) {
            // let cart = {
            //     items: {
            //         pizzaId: { item: pizzaObject, qty: 0 },
            //     }, 
            //     totalQty: 0,
            //     totalPrice: 0
            // }

            //If our cart is not available in session.
            if(!req.session.cart) {
                req.session.cart = {
                    items: {

                    }, 
                    totalQty: 0,
                    totalPrice: 0
            }
            let cart = req.session.cart;
            return res.json({ data: cart });
        }
    }
}

module.exports = cartController;