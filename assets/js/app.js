'use strict'
const cart = document.querySelector('.c-menu__item-cart');
const listProducts = document.querySelector('#c-products-items');
let listCart = [];

let containerCart = document.createElement('div');
let btnCheckoutContainer = document.createElement('div');
let btnCheckout = document.createElement('a');
let btnDeleteItemsContainer= document.createElement('div');


containerCart.classList.add('c-cart-container');
btnDeleteItemsContainer.classList.add('c-cart__delete-container');


//Functions
const addCart= (e)=>{
    e.preventDefault();
    if(e.target.classList.contains('add-cart')){
        let itemSelected = e.target.parentElement.parentElement;
        getDataItem(itemSelected);
    }
    
}

registerListeners();
function registerListeners(){
    listProducts.addEventListener('click', addCart);
    cart.addEventListener('click', deleteItems);
}

function getDataItem(item){
    //Object Item
    const infoItem = {
        image : item.querySelector('img').src,
        name: item.querySelector('h3').textContent,
        price: item.querySelector('.c-product__info-price').textContent,
        id: item.querySelector('a').getAttribute('data-id'),
        qty: 1

    }
    //Check if the item is already in the cart
    const exist = listCart.some(item=>item.id === infoItem.id);
    if(exist){
        const listItem = listCart.map(singleItem =>{
            if(singleItem.id === infoItem.id){
                singleItem.qty++;
                return singleItem;
            }else{
                return singleItem;
            }
        });
        listCart =[...listItem];
    }else{
        listCart = [...listCart, infoItem];
    }
    
    addToCart(listCart);
}

//Show items in cart
function addToCart(itemsCart){
    cleanHtml();
    itemsCart.forEach (item=>{
        //Destructoring 
        const {image, name, qty, price, id}= item;
        let itemCartContainer = document.createElement('div');
        itemCartContainer.classList.add('c-cart__item-container')
        itemCartContainer.innerHTML= `
            <a href="#">
                <img class="c-cart__item-img" src=${image}>
            </a>
            <div class="c-cart__item-info">
                <a href="#">
                    <h4 class="c-cart__item-title">${name}</h4>
                    <p class="c-cart__item-details"><span class="c-cart__item-qty">${qty}</span> x <span class="c-cart__item-price">${price}</span></p>
                </a>
                <a href="#" class="c-cart__item-delete" data-id="${id}">X</a>
            </div>
        `;
        containerCart.appendChild(itemCartContainer);
    });
    btnDeleteItemsContainer.innerHTML =`
        <a class="c-cart__delete-items" href="#">Delete items</a>
    `;
    containerCart.appendChild(btnDeleteItemsContainer);
    cart.appendChild(containerCart);
    
}
//Delete Items from cart
function deleteItems(e){
    e.preventDefault();
    if(e.target.classList.contains('c-cart__item-delete')){
        const itemId = e.target.getAttribute('data-id');
        listCart = listCart.filter(item => item.id !== itemId);
        addToCart(listCart);
    }
    //Cart Delete all items
    if(e.target.classList.contains('c-cart__delete-items')){
        cleanHtml();
        if(!containerCart.firstChild){
            let itemCartContainer = document.createElement('div');
            itemCartContainer.classList.add('c-cart__item-container');
            itemCartContainer.innerHTML=`
                <p class="c-cart-container__null">No items added yet.</p>
            `;
            containerCart.appendChild(itemCartContainer);
            cart.appendChild(containerCart);
        }

    }
}


//Delete all the items before add new objects to cart
function cleanHtml(){
    
    while(containerCart.firstChild){
        containerCart.removeChild(containerCart.firstChild);
    }
    
}