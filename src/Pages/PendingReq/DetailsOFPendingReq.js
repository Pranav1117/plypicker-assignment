import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Modal from "../../Utilities/Modal";
const DetailsOFPendingReq = () => {
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.request_id;

  const {
    state: { Product },
  } = useLocation();

  const _id = Product._id;

  const [ogProduct, setOgProduct] = useState(null);
  const [changes, setChanges] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModalWithMessage = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };
  const Modal = ({ message }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      </div>
    );
  };
  useEffect(() => {
    const fetchProductBeforechanges = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/product/${productId}`
        );
        setOgProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (!ogProduct) {
      fetchProductBeforechanges();
    }
  }, [ogProduct, productId]);

  useEffect(() => {
    if (ogProduct && Product) {
      const highlightChanges = (original, modified) => {
        const highlightedChanges = {};
        for (const key in original) {
          if (
            original.hasOwnProperty(key) &&
            modified.hasOwnProperty(key) &&
            original[key] !== modified[key]
          ) {
            highlightedChanges[key] = {
              oldValue: original[key],
              newValue: modified[key],
            };
          }
        }
        return highlightedChanges;
      };

      const changes = highlightChanges(ogProduct, Product.changes);
      setChanges(changes);
    }
  }, [ogProduct, Product]);

  const handleApprove = async () => {
    try {
      const propertiesToSend = Object.entries(changes).map(
        ([key, { newValue }]) => ({
          [key]: newValue,
        })
      );
      let resp = await axios.put("http://localhost:3001/updateRequest", {
        status: "approved",
        _id,
        productId,
        changes: propertiesToSend,
      });
      navigate("/dashboard/admin");

      showModalWithMessage("Request approved successfully.");
    } catch (error) {
      showModalWithMessage("Error approving request. Please try again later.");
    }
  };

  const handleReject = async () => {
    try {
      let resp = await axios.put("http://localhost:3001/updateRequest", {
        status: "rejected",
        _id,
        changes,
      });
      navigate("/dashboard/admin");
      showModalWithMessage("Request rejected successfully.");
    } catch (error) {
      showModalWithMessage("Error rejecting request. Please try again later.");
    }
  };

  const renderProperty = (key, value) => {
    return (
      <div className="property" key={key}>
        <strong>{key}:</strong> {value}
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Details of Pending Request</h2>
        <div className="details">
          {ogProduct && (
            <div>
              {Object.entries(ogProduct).map(([key, value]) =>
                renderProperty(key, value)
              )}
            </div>
          )}
        </div>
        <div className="changes">
          <h3>Changes</h3>
          {changes && (
            <div>
              {Object.entries(changes).map(([key, { oldValue, newValue }]) => (
                <div className="change" key={key}>
                  <strong>{key}:</strong>{" "}
                  <span className="old">{oldValue}</span>{" "}
                  <span className="arrow">-</span>{" "}
                  <span className="new">{newValue}</span>
                </div>
              ))}{" "}
              <div className="apr-rej-btn-container">
                <button onClick={handleApprove}>Approve</button>
                <button onClick={handleReject}>Reject</button>
              </div>
            </div>
          )}
        </div>
        {ogProduct && (
          <div className="image-container">
            <img
              src={ogProduct.image}
              alt="Product"
              className="product-image"
            />{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsOFPendingReq;
