import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import "./PendingRequests.css";
import { useNavigate } from "react-router-dom";

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getPendingReq = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/getallrequests?status=pending"
        );
        console.log(data.pendingRequests);
        setPendingRequests(data.pendingRequests);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      }
    };
    getPendingReq();
  }, []);

  const handleClick = (id, product) => {
    navigate(`/pending-requests/${id}`, { state: { Product: product } });
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} 
    Time- ${formattedTime}`;
  };

  return (
    <>
      <Navbar />

      <div className="pending-requests-container">
        <h3 className="pending-requests-title">Pending Requests</h3>
        <div className="requests-list">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request, index) => (
              <div
                key={index}
                className="request-item"
                onClick={() => {
                  handleClick(request.productId, request);
                }}
              >
                
                <div className="request-info">Name: {request.productName}</div>
                <div className="request-info">
                  Product Id: {request.productId}
                </div>
                <div className="request-info">
                  Request created at: {formatDateTime(request.createdAt)}
                </div>
              </div>
            ))
          ) : (
            <div className="no-requests">No Pending Requests</div>
          )}
        </div>
      </div>
    </>
  );
};

export default PendingRequests;
