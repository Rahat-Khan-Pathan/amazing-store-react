import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Cart from '../Cart/Cart';
import {addToDB,getLocalValue} from '../../utilities/addToLocal';

const Shop = () => {
    const firs10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(firs10);
    const [searchProducts,setSearchProducts] = useState(firs10);
    const [cart,setCart] = useState(getLocalValue(fakeData));
    const handleAddProduct = (product)=> {
        addToDB(product.key);
        setCart(getLocalValue(fakeData));
    }
    const handleSearch = event=> {
        const searchText = event.target.value;
        const matched = fakeData.filter(dt=> ((dt.name).toLowerCase()).includes(searchText.toLowerCase()));
        setSearchProducts(matched);   
    }
    return (
        
        <div>
            <nav className="search">
                <input className="search-input" onChange={handleSearch} type="text" placeholder="Search product" />
                <FontAwesomeIcon icon={faShoppingCart} className="cart-icon"/>
                <p className="cart-number">{cart.length}</p>
            </nav>
            <div className="shop-container">
                <div className="product-container">
                    <ul>
                        {
                            searchProducts.map(pd => <Product key={pd.key} product={pd} handleAddProduct = {handleAddProduct}></Product> )
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