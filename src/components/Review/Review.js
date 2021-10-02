import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fakeData from "../../fakeData";
import { get, getLocalValue, setToDB } from "../../utilities/addToLocal";
import Cart from "../Cart/Cart";
import ReviewProduct from "../ReviewProduct/ReviewProduct";

const Review = () => {
  const products = fakeData;
  const [dbProduct, setDbProduct] = useState(JSON.parse(get()));
  const [reviewProducts, setReviewProducts] = useState([]);
  const [cart, setCart] = useState(getLocalValue(products));

  const removeHandler = (key) => {
    const newProduct = reviewProducts.filter((pd) => pd.key !== key);
    setReviewProducts(newProduct);
    const newDbProduct = dbProduct;
    delete newDbProduct[key];
    setToDB(newDbProduct);
    setDbProduct(newDbProduct);
    setCart(getLocalValue(products));
  };
  useEffect(() => {
    const reviewProduct = [];
    for (const key in dbProduct) {
      const newProduct = products.find((p) => p.key === key);
      newProduct["quantity"] = dbProduct[key];
      reviewProduct.push(newProduct);
    }
    setReviewProducts(reviewProduct);
  }, []);
  const orderPlaced=()=> {
      localStorage.removeItem('product');
  }
  return (
    <div>
      <div className="shop-container">
        <div className="product-container">
          <ul>
            {reviewProducts.map((pd) => (
              <ReviewProduct
                key={pd.key}
                product={pd}
                removeHandler={removeHandler}
              ></ReviewProduct>
            ))}
          </ul>
        </div>
        <div className="cart-container">
          <Cart cart={cart} check={2}>
            <Link to="/inventory">
              <button onClick={orderPlaced} className="add-button">
                <FontAwesomeIcon icon={faShoppingCart} />
                Place your order
              </button>
            </Link>
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Review;
