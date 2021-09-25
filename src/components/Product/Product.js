import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import Rating from 'react-rating';

const Product = (props) => {
    const {img,name,seller,price,stock,star} = props.product;
    return (
        <div className="single-product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <h4 className="product-name">{name}</h4>
                <p className="product-seller">By: {seller}</p>
                <p className="product-price">${price}</p>
                <Rating 
                readonly
                initialRating={star}
                emptySymbol="far fa-star icon-color"
                fullSymbol="fas fa-star icon-color"
                ></Rating>
                <br />
                <p className="product-stock">Only {stock} left in stock - order soon</p>
                <button className="add-button" onClick={ ()=> props.handleAddProduct(props.product) }> <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>
            </div>
        </div>
    );
};

export default Product;