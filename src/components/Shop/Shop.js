import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Cart from '../Cart/Cart';

const Shop = () => {
    const firs10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(firs10);
    const [cart,setCart] = useState([]);
    const handleAddProduct = (product)=> {
        const newCart = [...cart,product];
        setCart(newCart);
    }
    return (
        
        <div>
            
            <nav className="search">
                <input className="search-input" type="text" placeholder="Search product" />
                <FontAwesomeIcon icon={faShoppingCart} className="cart-icon"/>
                <p className="cart-number">{cart.length}</p>
            </nav>
            <div className="shop-container">
                <div className="product-container">
                    <ul>
                        {
                            products.map(pd => <Product product={pd} handleAddProduct = {handleAddProduct}></Product> )
                        }
                    </ul>
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;