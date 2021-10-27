import React, { useEffect, useState } from "react";
import "./Shop.css";
import "./Shop.css";
import Product from "../Product/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const Shop = () => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [cart, setCart] = useState([{}]);
  const { user } = useAuth();
  const [searchProducts, setSearchProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://frozen-sands-27089.herokuapp.com/products")
      .then((res) => {
        setData(res.data.products);
        setPages(res.data.pages);
        setSearchProducts(res.data.products.slice(0, 10));
      });
    axios
      .get(`https://frozen-sands-27089.herokuapp.com/users/${user.email}`)
      .then((res) => setCart(res.data));
  }, [user]);

  // Handle Add Product
  const handleAddProduct = (product) => {
    if (!user.email) {
      history.push("/login");
    } else {
      axios
        .post(`https://frozen-sands-27089.herokuapp.com/users/${user.email}`, {
          product: product,
        })
        .then((res) => setCart(res.data));
    }
  };
  // Handle Search
  const handleSearch = (event) => {
    const searchText = event.target.value;
    const matched = data.filter((dt) =>
      dt.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchProducts(matched);
  };

  // Handle Page
  const handlePage = (number) => {
    const newData = data.slice(10 * number, 10 * (number + 1));
    setSearchProducts(newData);
    setSelectedPage(number);
  };

  return (
    <div>
      <nav className="search">
        <input
          className="search-input"
          onChange={handleSearch}
          type="text"
          placeholder="Search product"
        />
        <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
        {/* <p className="cart-number">{cart.length}</p> */}
      </nav>

      <div className="shop-container">
        <div className="product-container">
          {searchProducts.length === 0 ? (
            <button className="btn btn-primary spinner" type="button" disabled>
              <span
                className="spinner-grow spinner-grow-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          ) : (
            searchProducts.map((pd) => (
              <Product
                key={pd.key}
                product={pd}
                handleAddProduct={() => handleAddProduct(pd)}
              ></Product>
            ))
          )}
          <div className="pagination">
            <div className="paginaiton-btn-container">
              {[...Array(pages).keys()].map((number) => (
                <button
                  key={number}
                  onClick={() => handlePage(number)}
                  className={number === selectedPage ? "selected-page" : ""}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="cart-container">
          <Cart cart={cart} check={1}>
            <Link to="/review">
              <button className="add-button">
                <FontAwesomeIcon icon={faShoppingCart} />
                Review your order
              </button>
            </Link>
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Shop;
