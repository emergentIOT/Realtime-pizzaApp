//Client code froentend
//All code written here will be transpile into public/js
import axios from 'axios';
import Noty from 'noty';
//QuerySelectorAll returns all elements that matches a CSS selector(s)
let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza) {
    //Send call to server , to mention the added or updated pizza item. 
    //Can be done using AJAX call : fetch or axios. 
    axios.post('/update-cart', pizza)
    .then((res) => {
        //To update the text or counter in cart
        cartCounter.innerText = res.data.totalQty
        //Success notification
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false
        }).show();
    }).catch((error) => {
        //Error Notification
        new Noty({
            type: 'error',
            timeout: 1000,
            text: `Something went wrong: ${error}`,
            progressBar: false
        }).show();
    })
}

addToCart.forEach((eachSingleButton) => {
    
    eachSingleButton.addEventListener('click', (e) => {
        console.log(eachSingleButton);
        let pizza = JSON.parse(eachSingleButton.dataset.pizza);
        updateCart(pizza);
    })
})
