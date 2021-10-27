import React from "react";
import "./Cart.css";

const Cart = (props) => {
  const cart = props.cart;
  let total = cart.reduce((total, pd) => total + (pd.price*pd.quantity), 0);
  let shipping = cart.reduce((shipping, pd) => shipping + pd.shipping, 0);
  total = +total.toFixed(2);
  shipping = +shipping.toFixed(2);
  const beforeTax = +(total + shipping).toFixed(2);
  const tax = +(beforeTax * 0.1).toFixed(2);
  const orderTotal = +(beforeTax + tax).toFixed(2);
  return (
    <div>
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p>Items Ordered: {cart.length || 0}</p>
      </div>
      <div className="cart-details">
        <p className="cart-price">
          <span>Items: </span> <span>${total || 0}</span>
        </p>
        <p className="cart-price">
          <span>Shipping & Handling: </span> <span>${shipping || 0}</span>
        </p>
        <p className="cart-price">
          <span>Total before tax: </span> <span>${beforeTax || 0}</span>
        </p>
        <p className="cart-price last">
          <span>Estimated Tax: </span> <span>${tax || 0}</span>
        </p>
        <p className="cart-price total">
          <span>Order Total: </span> <span>${orderTotal || 0}</span>
        </p>
        {props.children}
      </div>
    </div>
  );
};

export default Cart;
