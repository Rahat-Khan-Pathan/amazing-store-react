import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { get, getLocalValue, setToDB } from "../../utilities/addToLocal";
import Cart from "../Cart/Cart";
import ReviewProduct from "../ReviewProduct/ReviewProduct";

const Review = () => {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    axios
      .get(`https://frozen-sands-27089.herokuapp.com/users/${user.email}`)
      .then((res) => setData(res.data));
  }, [user]);

  const removeHandler = (key) => {
    axios
      .delete(`https://frozen-sands-27089.herokuapp.com/users/${user.email}`, {
        data: {
          key: key,
        },
      })
      .then((res) => setData(res.data));
  };

  return (
    <div>
      <div className="shop-container">
        <div className="product-container">
          <ul>
            {data.length === 0 ? (
              <button className="btn btn-primary spinner" type="button" disabled>
                Nothing here. Please add some
              </button>
            ) : (
              data.map((pd) => (
                <ReviewProduct
                  key={pd.key}
                  product={pd}
                  removeHandler={removeHandler}
                ></ReviewProduct>
              ))
            )}
          </ul>
        </div>
        <div className="cart-container">
          <Cart cart={data} check={2}>
            <Link to="/place-order">
              <button className="add-button">
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
