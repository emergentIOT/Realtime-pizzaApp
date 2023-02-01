//Client code froentend
//All code written here will be transpile into public/js
import axios from 'axios';
import Noty from 'noty';
let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');


function updateCart(pizza) {
    //Send call to server , to mention the added or updated pizza item. 
    //Can be done using AJAX call : fetch or axios. 
    axios.post('/update-cart', pizza)
    .then((res) => {
        //To update the text or counter in cart
        cartCounter.innerText = res.data.totalQty
        //Notification
        new Noty({
            type: 'success',
            text: 'Item added to cart'
        }).show();
    })

}

addToCart.forEach((eachSingleButton) => {
    eachSingleButton.addEventListener('click', (e) => {
     
        let pizza = JSON.parse(eachSingleButton.dataset.pizza);
        updateCart(pizza);
    })
})
