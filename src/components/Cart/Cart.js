import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    let total = cart.reduce((total,pd)=> total+pd.price,0);
    let shipping = cart.reduce((shipping,pd)=> shipping+pd.shipping,0);
    total = +(total.toFixed(2));
    shipping = +(shipping.toFixed(2));
    const beforeTax = +((total + shipping).toFixed(2));
    const tax = +((beforeTax * 0.1).toFixed(2));
    const orderTotal = +((beforeTax + tax).toFixed(2));
    return (
        <div>
            <div className="cart-summary">
                <h3>Order Summary</h3>
                <p>Items Ordered: {cart.length}</p>
            </div>
            <div className="cart-details">
                <p className="cart-price"><span>Items: </span> <span>${total}</span></p>
                <p className="cart-price"><span>Shipping & Handling: </span> <span>${shipping}</span></p>
                <p className="cart-price"><span>Total before tax: </span> <span>${beforeTax}</span></p>
                <p className="cart-price last"><span>Estimated Tax: </span> <span>${tax}</span></p>
                <p className="cart-price total"><span>Order Total: </span> <span>${orderTotal}</span></p>
            </div>
            <Link to="/review">
                <button className="add-button"><FontAwesomeIcon icon={faShoppingCart} /> Review your order</button>
            </Link>
        </div>
    );
};

export default Cart;