import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productdetail.css";
import { useSelector, useDispatch } from "react-redux";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../features/userSlice";
import Navbar from "../../Components/Navbar/Navbar";

const ProductDetails = () => {
  const { email, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/product/${product_id}`
        );
        console.log(email, role);
        const productWithArrayImage = {
          ...response.data,
          image: [response.data.image],
        };
        setProduct(productWithArrayImage);
        setEditedProduct({ ...response.data, product_id });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [product_id, role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, email, [name]: value });
  };

  const handleEditImage = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      const updatedImages = [...product.image, ...newImages];
      const updatedProduct = { ...product, image: updatedImages };
      setProduct(updatedProduct);
      setEditedProduct(updatedProduct);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...product.image];
    updatedImages.splice(index, 1);
    const updatedProduct = { ...product, image: updatedImages };
    setProduct(updatedProduct);
    setEditedProduct(updatedProduct);
  };

  const handleSubmit = async (e) => {
    const changes = {};
    let changeMade = false;
    for (const key in editedProduct) {
      if (key !== "image" && editedProduct[key] !== product[key]) {
        changes[key] = editedProduct[key];
        if (key !== "product_id") {
          changeMade = true;
        }
      }
    }

    // Always send the entire image array
    changes.image = editedProduct.image;
    if (Object.keys(changes).length === 2) {
      if (changes.product_id == product_id || !changes.image) {
        alert("changes required to submit");
      }
    }
    e.preventDefault();
    try {
      if (role === "admin") {
        let resp = await axios.put(
          `http://localhost:3001/updateproduct`,
          editedProduct
        );
        navigate("/dashboard/admin");
      } else {
        let resp = await axios.post(`http://localhost:3001/product/review`, {
          product,
          email,
          changes,
        });
        navigate("/profile/my-submissions");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <h2 className="product-detail-title">Product Detail</h2>
      <div className="product-details-container">
        <div className="product-details">
          <form onSubmit={handleSubmit}>
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={editedProduct.productName}
              onChange={handleInputChange}
            />
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
            />
            <label htmlFor="productDescription">Description:</label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={editedProduct.productDescription}
              onChange={handleInputChange}
            />
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={editedProduct.department}
              onChange={handleInputChange}
            />
            {role === "admin" ? (
              <button className="review-req-btn" type="submit">
                Save
              </button>
            ) : (
              <button className="review-req-btn" type="submit">
                Submit for review
              </button>
            )}
          </form>
        </div>

        <div className="product-image">
          {product.image.map((img, index) => (
            <div
              key={index}
              className={`product-image-wrapper ${
                product.image.length > 1 ? "multiple-images" : ""
              }`}
            >
              <img src={img} alt={`Product Image ${index}`} />
              <button onClick={() => handleDeleteImage(index)}>Delete</button>
            </div>
          ))}
          <input
            className="choose-img-btn"
            multiple
            type="file"
            onChange={(e) => handleEditImage(e)}
            name="image"
            id="file-upload"
          />

          <p>Add more images</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
