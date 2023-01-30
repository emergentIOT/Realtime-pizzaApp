//Client code froentend
//All code written here will be transpile into public/js
import axios from 'axios';
let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza) {
    //Send call to server , to mention the added or updated pizza item. 
    //Can be done using AJAX call : fetch or axios. 
    console.log("pizza : ", pizza);
    axios.post('/update-cart', pizza)
    .then((res) => {
        console.log("res", res);
        cartCounter.innerText = res.data.totalQty
    })

}

addToCart.forEach((eachSingleButton) => {
    eachSingleButton.addEventListener('click', (e) => {
     
        let pizza = JSON.parse(eachSingleButton.dataset.pizza);
        updateCart(pizza);
    })
})
