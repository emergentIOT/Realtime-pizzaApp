//Client code froentend
//All code written here will be transpile into public/js
import axios from 'axios';
let addToCart = document.querySelectorAll('.add-to-cart');

function updateCart(pizza) {
    //Send call to server , to mention the added or updated pizza item. 
    //Can be done using AJAX call : fetch or axios. 

    axios.post('/update-cart', pizza)
    .then((res) => {
        console.log(res);
    })

}

addToCart.forEach((eachSingleButton) => {
    eachSingleButton.addEventListener('click', (e) => {
     
        let pizza = JSON.parse(eachSingleButton.dataset.pizza);
        updateCart(pizza);
    })
})
