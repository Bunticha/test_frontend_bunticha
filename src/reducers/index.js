// This is the reducer for all of the components in the application.

import { combineReducers } from 'redux'
import { ADD_TO_CART, REMOVE_CART_ITEM, UPDATE_QUANTITY, RESET_SHOP} from './../actions'
import Harry1 from "./../assets/images/Harry Potter1.jpg";
import Harry2 from "./../assets/images/Harry Potter2.jpg";
import Harry3 from "./../assets/images/Harry Potter3.jpg";
import Harry4 from "./../assets/images/Harry Potter4.jpg";
import Harry5 from "./../assets/images/Harry Potter5.jpg";
import Harry6 from "./../assets/images/Harry Potter6.jpg";
import Harry7 from "./../assets/images/Harry Potter7.jpg";
import Percy1 from "./../assets/images/Percy Jackson1.jpg";
import Percy2 from "./../assets/images/Percy Jackson2.jpg";
import Percy3 from "./../assets/images/Percy Jackson3.jpg";
import Percy4 from "./../assets/images/Percy Jackson4.jpg";
import Percy5 from "./../assets/images/Percy Jackson5.jpg";

// This holds the inventory and the initial states of the cart and the total price. 
// In production, this would come from an AJAX call.

let initialState = { 
    inventory: [
        {
            id: 1,
            name: "Harry Potter1",
            picture: Harry1,
            price: 395
        },
        {
            id: 2,
            name: "Harry Potter2",
            picture: Harry2,
            price: 395
        },
        {
            id: 3,
            name: "Harry Potter3",
            picture: Harry3,
            price: 495
        },
        {
            id: 4,
            name: "Harry Potter4",
            picture: Harry4,
            price: 695
        },
        {
            id: 5,
            name: "Harry Potter5",
            picture: Harry5,
            price: 895
        },
        {
            id: 6,
            name: "Harry Potter6",
            picture: Harry6,
            price: 595
        },
        {
            id: 7,
            name: "Harry Potter7",
            picture: Harry7,
            price: 595
        },
        {
            id: 8,
            name: "Percy Jackson1",
            picture: Percy1,
            price: 299
        },
        {
            id: 9,
            name: "Percy Jackson2",
            picture: Percy2,
            price: 249
        },
        {
            id: 10,
            name: "Percy Jackson3",
            picture: Percy3,
            price: 259
        },
        {
            id: 11,
            name: "Percy Jackson4",
            picture: Percy4,
            price: 289
        },
        {
            id: 12,
            name: "Percy Jackson5",
            picture: Percy5,
            price: 299
        }
    ],
    cart: [],
    totalPrice: 0
}

const calculateTotalPrice = (cart) => {
    let totalPrice = 0
    totalPrice = cart.reduce((totalPrice, cartItem) => totalPrice + cartItem.price, 0)
    return totalPrice
}

// This would be called whenever delete button is clicked or when a user sets an item's quantity to none or 0.
const removeCartItem = (state, index) => {
    let cart = [
        ...state.cart.slice(0, index),
        ...state.cart.slice(index + 1)
    ]
    let totalPrice = calculateTotalPrice(cart)
    return {
        ...state,
        cart,
        totalPrice
    }
}

// This would update the quantity or call removeCartItem if quantity set is less than 1.
const updateQuantity = (state, item, quantity, index) => {
    let cart = [...state.cart]
    if (typeof quantity != 'undefined' && quantity > 0) {
        item.quantity = quantity
        item.price = item.quantity * item.unitPrice
        cart[index] = item
        let totalPrice = calculateTotalPrice(cart)
        return {
            ...state,
            cart,
            totalPrice
        }
    } else {
        return removeCartItem(state, index)
    }
}

const addToCart = (state, item) => {

    var foundItems = state.cart.filter(function (cartItem) {
        return cartItem.id === item.id;
    });

    if (foundItems.length > 0) {
        let newQuantity = Number(foundItems[0].quantity) + 1;
        return updateQuantity(state, foundItems[0], newQuantity)
    } else {
        const newItem = {
            id: item.id,
            quantity: 1,
            price: item.price,
            unitPrice: item.price,
            name: item.name
        };
    
        let cart = [...state.cart, newItem]
        let totalPrice = calculateTotalPrice(cart)
    
        return {
            ...state,
            cart,
            totalPrice
        }
    }
    
}


const shopReducer = (state=initialState, action) => {
  let cart;
  let totalPrice;  
  switch (action.type) {
    case ADD_TO_CART:
        return addToCart(state, action.item, -1)
    case REMOVE_CART_ITEM:
        return removeCartItem(state, action.index)
    case UPDATE_QUANTITY:
        cart = [...state.cart]
        return updateQuantity(state, cart[action.index], action.quantity, action.index)
    case RESET_SHOP:
        console.log("INSIDE RESET SHOP")
        return initialState
    default:
      return state    
  }  
}

const combinedReducer = combineReducers({
  shop: shopReducer
})

export default combinedReducer
