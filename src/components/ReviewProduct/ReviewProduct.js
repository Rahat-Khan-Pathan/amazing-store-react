import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Rating from 'react-rating';

const ReviewProduct = (props) => {
    const {name,price,star,quantity,key} = props.product;
    return (
        <div className="single-product">
            <div className="product-details">
                <h4 className="product-name">{name}</h4>
                <p className="product-price">${price}</p>
                <p className="quantity">Quantity: {quantity}</p>
                <Rating
                readonly
                initialRating={star}
                emptySymbol="far fa-star icon-color"
                fullSymbol="fas fa-star icon-color"
                ></Rating>
                <br />
                <br />
                <button className="add-button" onClick={ ()=> props.removeHandler(key) }> <FontAwesomeIcon icon={faTrashAlt} /> Remove</button>
            </div>
        </div>
    );
};

export default ReviewProduct;