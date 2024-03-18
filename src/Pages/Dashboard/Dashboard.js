import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import "./dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";

const Dashboard = () => {
  const state = useSelector((state) => state.user);
  console.log(state);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const fetchAllProducts = async () => {
        const response = await axios.get("http://localhost:3001/productlist");
        setProducts(response.data);
      };
      fetchAllProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="products-container">
        <h2>All Products</h2>

        <div className="products">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-link"
            >
              <div className="product">
                <div className="product-image">
                  <img src={product.image} alt={product.productName} />
                </div>
                <div className="product-details">
                  <h3>{product.productName}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Description: {product.productDescription}</p>
                  <p>Department: {product.department}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
